// backend/src/routes/stock.routes.ts
import { Router } from "express";
import { verifyToken } from "../middlewares/authJwt";
import StockEntry from "../model/stockEntry.model";
import StockEntryItem from "../model/stockEntryItem.model";
import Product from "../model/product.model";

const router = Router();

// Danh sách phiếu nhập kho
router.get("/", verifyToken, async (req, res) => {
  try {
    const entries = await StockEntry.findAll({
      order: [["id", "DESC"]],
      include: [StockEntryItem],
    });
    res.json(entries);
  } catch (error) {
    console.error("Get stock entries error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Lấy 1 phiếu nhập
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const id = Number(req.params.id);
    const entry = await StockEntry.findByPk(id, {
      include: [StockEntryItem],
    });

    if (!entry) {
      return res.status(404).json({ message: "Stock entry not found" });
    }

    res.json(entry);
  } catch (error) {
    console.error("Get stock entry detail error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Tạo phiếu nhập kho
router.post("/", verifyToken, async (req, res) => {
  try {
    const { supplier, note, items } = req.body;
    // items: [{ productId, quantity, costPrice }]

    const entry = await StockEntry.create(
      {
        supplier,
        note,
        StockEntryItems: items,
      },
      { include: [StockEntryItem] }
    );

    // Cộng tồn kho
    if (items && Array.isArray(items)) {
      for (const it of items) {
        if (!it.productId || !it.quantity) continue;
        const product = await Product.findByPk(it.productId);
        if (product) {
          const newStock = (product.getDataValue("stock") || 0) + it.quantity;
          await product.update({ stock: newStock });
        }
      }
    }

    res.status(201).json(entry);
  } catch (error) {
    console.error("Create stock entry error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Cập nhật ghi chú / nhà cung cấp (không sửa items cho đơn giản)
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { supplier, note } = req.body;

    const entry = await StockEntry.findByPk(id);
    if (!entry) {
      return res.status(404).json({ message: "Stock entry not found" });
    }

    await entry.update({ supplier, note });
    res.json(entry);
  } catch (error) {
    console.error("Update stock entry error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Xoá phiếu nhập (không rollback tồn kho cho đơn giản)
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const id = Number(req.params.id);

    const entry = await StockEntry.findByPk(id);
    if (!entry) {
      return res.status(404).json({ message: "Stock entry not found" });
    }

    await entry.destroy();
    res.json({ message: "Deleted" });
  } catch (error) {
    console.error("Delete stock entry error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
