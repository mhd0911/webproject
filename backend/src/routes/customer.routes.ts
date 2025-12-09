// backend/src/routes/customer.routes.ts
import { Router } from "express";
import { verifyToken } from "../middlewares/authJwt";
import Customer from "../model/customer.model";

const router = Router();

// Lấy danh sách khách hàng
router.get("/", verifyToken, async (req, res) => {
  try {
    const customers = await Customer.findAll({ order: [["id", "DESC"]] });
    res.json(customers);
  } catch (error) {
    console.error("Get customers error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Tạo mới khách hàng
router.post("/", verifyToken, async (req, res) => {
  try {
    const { name, phone, email, address } = req.body;
    const customer = await Customer.create({ name, phone, email, address });
    res.status(201).json(customer);
  } catch (error) {
    console.error("Create customer error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Cập nhật khách hàng
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { name, phone, email, address } = req.body;

    const customer = await Customer.findByPk(id);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    await customer.update({ name, phone, email, address });
    res.json(customer);
  } catch (error) {
    console.error("Update customer error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Xoá khách hàng
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const id = Number(req.params.id);

    const customer = await Customer.findByPk(id);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    await customer.destroy();
    res.json({ message: "Deleted" });
  } catch (error) {
    console.error("Delete customer error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
