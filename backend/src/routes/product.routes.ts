// backend/src/routes/product.routes.ts
import { Router } from "express";
import { verifyToken } from "../middlewares/authJwt";
import Product from "../model/product.model";

const router = Router();

// Lấy danh sách sản phẩm
router.get("/", verifyToken, async (req, res) => {
  try {
    const products = await Product.findAll({ order: [["id", "DESC"]] });
    res.json(products);
  } catch (error) {
    console.error("Get products error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Lấy 1 sản phẩm theo id
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const id = Number(req.params.id);
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    console.error("Get product error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Tạo mới sản phẩm
router.post("/", verifyToken, async (req, res) => {
  try {
    const { name, sku, price, stock, description } = req.body;

    const created = await Product.create({
      name,
      sku,
      price,
      stock,
      description,
    });

    res.status(201).json(created);
  } catch (error) {
    console.error("Create product error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Cập nhật sản phẩm
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { name, sku, price, stock, description } = req.body;

    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await product.update({ name, sku, price, stock, description });
    res.json(product);
  } catch (error) {
    console.error("Update product error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Xoá sản phẩm
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const id = Number(req.params.id);

    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await product.destroy();
    res.json({ message: "Deleted" });
  } catch (error) {
    console.error("Delete product error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
