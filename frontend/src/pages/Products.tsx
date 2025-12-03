import { useMemo, useState } from "react";

type Product = {
  id: number;
  name: string;
  sku: string;
  category: string;
  price: number;
  stock: number;
  createdAt: string;
};

const initialProducts: Product[] = [
  {
    id: 1,
    name: "Áo thun basic",
    sku: "TSHIRT-001",
    category: "Thời trang",
    price: 199000,
    stock: 50,
    createdAt: "2025-11-20",
  },
  {
    id: 2,
    name: "Giày sneaker trắng",
    sku: "SNK-101",
    category: "Giày dép",
    price: 790000,
    stock: 20,
    createdAt: "2025-11-22",
  },
  {
    id: 3,
    name: "Tai nghe Bluetooth",
    sku: "EAR-501",
    category: "Phụ kiện",
    price: 350000,
    stock: 35,
    createdAt: "2025-11-25",
  },
];

const categories = ["Tất cả", "Thời trang", "Giày dép", "Phụ kiện"];

const Products = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("Tất cả");

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    category: "Thời trang",
    price: "",
    stock: "",
  });

  const resetForm = () => {
    setFormData({
      name: "",
      sku: "",
      category: "Thời trang",
      price: "",
      stock: "",
    });
    setEditingProduct(null);
  };

  const openAddModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      sku: product.sku,
      category: product.category,
      price: product.price.toString(),
      stock: product.stock.toString(),
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const priceNumber = Number(formData.price);
    const stockNumber = Number(formData.stock);

    if (!formData.name.trim() || !formData.sku.trim()) return;
    if (Number.isNaN(priceNumber) || Number.isNaN(stockNumber)) return;

    if (editingProduct) {
      // Cập nhật sản phẩm
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editingProduct.id
            ? {
                ...p,
                name: formData.name.trim(),
                sku: formData.sku.trim(),
                category: formData.category,
                price: priceNumber,
                stock: stockNumber,
              }
            : p
        )
      );
    } else {
      // Thêm sản phẩm mới
      const newProduct: Product = {
        id: Date.now(),
        name: formData.name.trim(),
        sku: formData.sku.trim(),
        category: formData.category,
        price: priceNumber,
        stock: stockNumber,
        createdAt: new Date().toISOString().slice(0, 10),
      };
      setProducts((prev) => [newProduct, ...prev]);
    }

    closeModal();
  };

  const handleDelete = (id: number) => {
    const ok = window.confirm("Bạn có chắc muốn xoá sản phẩm này?");
    if (!ok) return;
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  // Lọc + tìm kiếm
  const filteredProducts = useMemo(() => {
    let data = [...products];

    if (search.trim()) {
      const keyword = search.trim().toLowerCase();
      data = data.filter(
        (p) =>
          p.name.toLowerCase().includes(keyword) ||
          p.sku.toLowerCase().includes(keyword)
      );
    }

    if (categoryFilter !== "Tất cả") {
      data = data.filter((p) => p.category === categoryFilter);
    }

    return data;
  }, [products, search, categoryFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / pageSize));

  const currentPageData = filteredProducts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-50">
            Sản phẩm
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Quản lý danh mục sản phẩm, tồn kho và giá bán.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-blue-500 active:scale-[0.98] transition"
        >
          + Thêm sản phẩm
        </button>
      </div>

      {/* Thanh filter / search */}
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900/60">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-1 flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Tìm theo tên hoặc mã SKU..."
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none ring-blue-500/0 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>

            <select
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none ring-blue-500/0 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 sm:w-48"
              value={categoryFilter}
              onChange={(e) => {
                setCategoryFilter(e.target.value);
                setCurrentPage(1);
              }}
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className="text-xs text-slate-500 dark:text-slate-400">
            Tổng:{" "}
            <span className="font-semibold text-slate-700 dark:text-slate-200">
              {filteredProducts.length}
            </span>{" "}
            sản phẩm
          </div>
        </div>
      </div>

      {/* Bảng sản phẩm */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900/60">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500 dark:bg-slate-800 dark:text-slate-400">
              <tr>
                <th className="px-4 py-3">Tên sản phẩm</th>
                <th className="px-4 py-3">Mã SKU</th>
                <th className="px-4 py-3">Danh mục</th>
                <th className="px-4 py-3 text-right">Giá</th>
                <th className="px-4 py-3 text-right">Tồn kho</th>
                <th className="px-4 py-3">Ngày tạo</th>
                <th className="px-4 py-3 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {currentPageData.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-6 text-center text-sm text-slate-500 dark:text-slate-400"
                  >
                    Không có sản phẩm nào phù hợp.
                  </td>
                </tr>
              ) : (
                currentPageData.map((product) => (
                  <tr
                    key={product.id}
                    className="hover:bg-slate-50/70 dark:hover:bg-slate-800/60"
                  >
                    <td className="px-4 py-3 text-slate-900 dark:text-slate-50">
                      <div className="font-medium">{product.name}</div>
                    </td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                      {product.sku}
                    </td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                      {product.category}
                    </td>
                    <td className="px-4 py-3 text-right text-slate-900 dark:text-slate-50">
                      {product.price.toLocaleString("vi-VN")}₫
                    </td>
                    <td className="px-4 py-3 text-right text-slate-700 dark:text-slate-200">
                      {product.stock}
                    </td>
                    <td className="px-4 py-3 text-slate-500 dark:text-slate-400">
                      {product.createdAt}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="inline-flex gap-2">
                        <button
                          onClick={() => openEditModal(product)}
                          className="rounded-md border border-slate-200 px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-100 dark:border-slate-600 dark:text-slate-100 dark:hover:bg-slate-800"
                        >
                          Sửa
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="rounded-md bg-red-500 px-3 py-1 text-xs font-medium text-white hover:bg-red-600"
                        >
                          Xoá
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Phân trang */}
        <div className="flex items-center justify-between border-t border-slate-100 px-4 py-3 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
          <div>
            Trang{" "}
            <span className="font-semibold text-slate-700 dark:text-slate-100">
              {currentPage}
            </span>{" "}
            / {totalPages}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="rounded-md border border-slate-200 px-3 py-1 text-xs font-medium text-slate-700 disabled:cursor-not-allowed disabled:opacity-40 hover:bg-slate-100 dark:border-slate-600 dark:text-slate-100 dark:hover:bg-slate-800"
            >
              Trước
            </button>
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="rounded-md border border-slate-200 px-3 py-1 text-xs font-medium text-slate-700 disabled:cursor-not-allowed disabled:opacity-40 hover:bg-slate-100 dark:border-slate-600 dark:text-slate-100 dark:hover:bg-slate-800"
            >
              Sau
            </button>
          </div>
        </div>
      </div>

      {/* Modal thêm / sửa */}
      {isModalOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/40 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl dark:bg-slate-900">
            <h2 className="mb-4 text-lg font-semibold text-slate-900 dark:text-slate-50">
              {editingProduct ? "Sửa sản phẩm" : "Thêm sản phẩm mới"}
            </h2>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-300">
                  Tên sản phẩm
                </label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none ring-blue-500/0 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
                  required
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-300">
                  Mã SKU
                </label>
                <input
                  name="sku"
                  value={formData.sku}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none ring-blue-500/0 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
                  required
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-300">
                  Danh mục
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none ring-blue-500/0 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
                >
                  {categories
                    .filter((c) => c !== "Tất cả")
                    .map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-300">
                    Giá (₫)
                  </label>
                  <input
                    type="number"
                    min={0}
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none ring-blue-500/0 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
                    required
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-300">
                    Tồn kho
                  </label>
                  <input
                    type="number"
                    min={0}
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none ring-blue-500/0 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
                    required
                  />
                </div>
              </div>

              <div className="mt-2 flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:border-slate-600 dark:text-slate-100 dark:hover:bg-slate-800"
                >
                  Huỷ
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500"
                >
                  {editingProduct ? "Lưu thay đổi" : "Thêm mới"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
