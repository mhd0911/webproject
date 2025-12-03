import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

// Để parse JSON body
app.use(express.json());

// Route test đơn giản
app.get("/", (req, res) => {
  res.json({ message: "API is running 🚀" });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
