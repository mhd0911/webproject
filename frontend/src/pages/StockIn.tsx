// src/pages/StockIn.tsx
import React, { useMemo, useState } from "react";

type Product = {
  id: number;
  name: string;
  sku: string;
  stock: number;
};

type StockInRecord = {
  id: number;
  productId: number;
  quantity: number;
  note?: string;
  createdAt: string;
};

// Mock sản phẩm ban đầu (demo)
const mockProducts: Product[] = [
  { id: 1, name: "Áo thun Basic", sku: "TS-BASIC-01", stock: 20 },
  { id: 2, name: "Quần jean Slimfit", sku: "JN-SLIM-01", stock: 15 },
  { id: 3, name: "Áo sơ mi Trắng", sku: "SH-WHITE-01", stock: 10 },
  { id: 4, name: "Giày Sneaker", sku: "SN-CLASSIC-01", stock: 8 },
];

const StockIn: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [records, setRecords] = useState<StockInRecord[]>([]);

  // filter / search
  const [productFilter, setProductFilter] = useState<"all" | number>("all");
  const [searchText, setSearchText] = useState("");

  // modal nhập hàng
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number | "">("");
  const [quantity, setQuantity] = useState<number>(1);
  const [note, setNote] = useState("");
  const [error, setError] = useState("");

  // lấy product theo id
  const getProduct = (id: number) => products.find((p) => p.id === id);

  // records sau khi filter + search
  const filteredRecords = useMemo(() => {
    return records.filter((r) => {
      if (productFilter !== "all" && r.productId !== productFilter) {
        return false;
      }

      if (searchText.trim()) {
        const product = getProduct(r.productId);
        const name = product?.name.toLowerCase() ?? "";
        const sku = product?.sku.toLowerCase() ?? "";
        const keyword = searchText.toLowerCase();

        if (!name.includes(keyword) && !sku.includes(keyword)) {
          return false;
        }
      }

      return true;
    });
  }, [records, productFilter, searchText, products]);

  // tổng số lượng nhập
  const totalQuantity = useMemo(
    () => filteredRecords.reduce((sum, r) => sum + r.quantity, 0),
    [filteredRecords]
  );

  const openModal = () => {
    setIsModalOpen(true);
    setSelectedProductId("");
    setQuantity(1);
    setNote("");
    setError("");
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setError("");
  };

  const handleCreateStockIn = () => {
    setError("");

    if (!selectedProductId) {
      setError("Vui lòng chọn sản phẩm");
      return;
    }

    if (quantity <= 0) {
      setError("Số lượng phải lớn hơn 0");
      return;
    }

    const product = getProduct(selectedProductId as number);
    if (!product) {
      setError("Sản phẩm không tồn tại");
      return;
    }

    const nextId = records.length + 1;

    const newRecord: StockInRecord = {
      id: nextId,
      productId: selectedProductId as number,
      quantity,
      note: note.trim() || undefined,
      createdAt: new Date().toISOString(),
    };

    // cập nhật tồn kho của sản phẩm
    const updatedProducts = products.map((p) =>
      p.id === newRecord.productId
        ? { ...p, stock: p.stock + newRecord.quantity }
        : p
    );

    setProducts(updatedProducts);
    setRecords((prev) => [newRecord, ...prev]);

    // reset form
    setSelectedProductId("");
    setQuantity(1);
    setNote("");
    setIsModalOpen(false);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* HEADER */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Nhập kho (Stock In)</h1>
          <p className="text-sm text-gray-500">
            Ghi nhận các lần nhập hàng, cập nhật số lượng tồn kho sản phẩm.
          </p>
        </div>

        <button
          onClick={openModal}
          className="mt-2 inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1"
        >
          <span className="mr-2">📦</span> Nhập hàng mới
        </button>
      </div>

      {/* FILTER & SUMMARY */}
      <div className="mb-4 grid gap-4 md:grid-cols-[2fr,1fr]">
        <div className="flex flex-col gap-3 rounded-xl bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-600">
                  Sản phẩm:
                </span>
                <select
                  value={productFilter}
                  onChange={(e) =>
                    setProductFilter(
                      e.target.value === "all"
                        ? "all"
                        : Number(e.target.value)
                    )
                  }
                  className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="all">Tất cả</option>
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex-1">
                <div className="relative">
                  <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-gray-400">
                    🔍
                  </span>
                  <input
                    type="text"
                    placeholder="Tìm theo tên / mã sản phẩm..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-9 pr-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            <div className="text-sm text-gray-500">
              Tổng phiếu nhập:{" "}
              <span className="font-semibold text-gray-800">
                {filteredRecords.length}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 text-xs sm:text-sm">
            <div className="rounded-lg bg-blue-50 px-3 py-2 text-blue-700">
              Tổng số lượng nhập:{" "}
              <span className="font-semibold">{totalQuantity}</span>
            </div>
            <div className="rounded-lg bg-gray-50 px-3 py-2 text-gray-700">
              Số sản phẩm đang quản lý:{" "}
              <span className="font-semibold">{products.length}</span>
            </div>
          </div>
        </div>

        {/* CARD TỒN KHO NHANH */}
        <div className="rounded-xl bg-white p-4 shadow-sm">
          <h2 className="mb-3 text-sm font-semibold text-gray-800">
            Tồn kho hiện tại (tóm tắt)
          </h2>
          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
            {products.map((p) => (
              <div
                key={p.id}
                className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2 text-xs sm:text-sm"
              >
                <div>
                  <div className="font-medium text-gray-900">{p.name}</div>
                  <div className="text-[11px] text-gray-500">Mã: {p.sku}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-500">Tồn</div>
                  <div className="text-sm font-semibold text-blue-600">
                    {p.stock}
                  </div>
                </div>
              </div>
            ))}

            {products.length === 0 && (
              <p className="text-xs text-gray-500">
                Chưa có sản phẩm nào. Hãy thêm sản phẩm ở màn Products.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* BẢNG LỊCH SỬ NHẬP KHO */}
      <div className="overflow-hidden rounded-xl bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Mã phiếu
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Sản phẩm
                </th>
                <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Số lượng
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Ghi chú
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Thời gian
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {filteredRecords.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-6 text-center text-gray-500"
                  >
                    Chưa có phiếu nhập kho nào. Hãy bấm{" "}
                    <span className="font-semibold">"Nhập hàng mới"</span> để
                    tạo phiếu.
                  </td>
                </tr>
              ) : (
                filteredRecords.map((r) => {
                  const product = getProduct(r.productId);
                  return (
                    <tr key={r.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-xs font-semibold text-gray-800 sm:text-sm">
                        PN{r.id.toString().padStart(4, "0")}
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-sm font-medium text-gray-900">
                          {product?.name ?? "Sản phẩm đã xoá"}
                        </div>
                        <div className="text-xs text-gray-500">
                          {product ? `Mã: ${product.sku}` : ""}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-center font-semibold text-gray-800">
                        {r.quantity}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {r.note || <span className="text-gray-400">—</span>}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-xs text-gray-600 sm:text-sm">
                        {new Date(r.createdAt).toLocaleString("vi-VN")}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL NHẬP HÀNG */}
      {isModalOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-xl">
            <div className="flex items-center justify-between border-b px-6 py-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Phiếu nhập kho mới
              </h2>
              <button
                onClick={closeModal}
                className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
              >
                ✖
              </button>
            </div>

            <div className="flex max-h-[70vh] flex-col gap-4 overflow-y-auto px-6 py-4">
              {/* Chọn sản phẩm */}
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Sản phẩm <span className="text-red-500">*</span>
                </label>
                <select
                  value={selectedProductId}
                  onChange={(e) =>
                    setSelectedProductId(
                      e.target.value ? Number(e.target.value) : ""
                    )
                  }
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">-- Chọn sản phẩm --</option>
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} (Tồn: {p.stock})
                    </option>
                  ))}
                </select>
              </div>

              {/* Số lượng */}
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Số lượng nhập <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  min={1}
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              {/* Ghi chú */}
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Ghi chú (nếu có)
                </label>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={3}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Ví dụ: nhập bổ sung, hàng từ nhà cung cấp A..."
                />
              </div>

              {error && (
                <div className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
                  {error}
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-3 border-t bg-gray-50 px-6 py-3">
              <button
                onClick={closeModal}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-white"
              >
                Hủy
              </button>
              <button
                onClick={handleCreateStockIn}
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-blue-500"
              >
                💾 Lưu phiếu nhập
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StockIn;
