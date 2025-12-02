// src/pages/Orders.tsx
import React, { useMemo, useState } from "react";

type Customer = {
  id: number;
  name: string;
  phone: string;
};

type Product = {
  id: number;
  name: string;
  price: number;
  stock: number;
};

type OrderItem = {
  productId: number;
  quantity: number;
};

type OrderStatus = "new" | "processing" | "completed" | "canceled";

type Order = {
  id: number;
  code: string;
  customerId: number;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  createdAt: string;
};

// Mock khách hàng (demo)
const mockCustomers: Customer[] = [
  { id: 1, name: "Nguyễn Văn A", phone: "0901 111 111" },
  { id: 2, name: "Trần Thị B", phone: "0902 222 222" },
  { id: 3, name: "Lê Văn C", phone: "0903 333 333" },
];

// Mock sản phẩm (demo)
const mockProducts: Product[] = [
  { id: 1, name: "Áo thun Basic", price: 150000, stock: 20 },
  { id: 2, name: "Quần jean Slimfit", price: 350000, stock: 15 },
  { id: 3, name: "Áo sơ mi Trắng", price: 250000, stock: 10 },
  { id: 4, name: "Giày Sneaker", price: 550000, stock: 8 },
];

// Helper format tiền
const formatCurrency = (value: number) =>
  value.toLocaleString("vi-VN", { style: "currency", currency: "VND" });

// Helper label trạng thái
const getStatusLabel = (status: OrderStatus) => {
  switch (status) {
    case "new":
      return "Mới tạo";
    case "processing":
      return "Đang xử lý";
    case "completed":
      return "Hoàn tất";
    case "canceled":
      return "Đã huỷ";
    default:
      return status;
  }
};

const getStatusClass = (status: OrderStatus) => {
  switch (status) {
    case "new":
      return "bg-blue-100 text-blue-700";
    case "processing":
      return "bg-yellow-100 text-yellow-700";
    case "completed":
      return "bg-green-100 text-green-700";
    case "canceled":
      return "bg-red-100 text-red-700";
    default:
      return "";
  }
};

const Orders: React.FC = () => {
  // STATE CHÍNH
  const [customers] = useState<Customer[]>(mockCustomers);
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [orders, setOrders] = useState<Order[]>([]);

  // Filter / search
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "all">("all");
  const [searchText, setSearchText] = useState("");

  // Modal tạo đơn
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState<number | "">("");
  const [selectedProductId, setSelectedProductId] = useState<number | "">("");
  const [selectedQuantity, setSelectedQuantity] = useState<number>(1);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [createError, setCreateError] = useState("");

  // Modal chi tiết
  const [viewOrder, setViewOrder] = useState<Order | null>(null);

  // Tính tổng tiền đơn đang tạo
  const draftTotal = useMemo(() => {
    return orderItems.reduce((sum, item) => {
      const product = products.find((p) => p.id === item.productId);
      if (!product) return sum;
      return sum + product.price * item.quantity;
    }, 0);
  }, [orderItems, products]);

  // Lọc đơn hàng theo search + status
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      // Theo trạng thái
      if (statusFilter !== "all" && order.status !== statusFilter) {
        return false;
      }

      // Theo khách hàng
      if (searchText.trim()) {
        const customer = customers.find((c) => c.id === order.customerId);
        const customerName = customer?.name.toLowerCase() ?? "";
        const code = order.code.toLowerCase();
        const keyword = searchText.toLowerCase();
        if (!customerName.includes(keyword) && !code.includes(keyword)) {
          return false;
        }
      }

      return true;
    });
  }, [orders, statusFilter, searchText, customers]);

  // Lấy chi tiết khách
  const getCustomerName = (id: number) =>
    customers.find((c) => c.id === id)?.name ?? "Không rõ";

  // Lấy chi tiết sản phẩm
  const getProduct = (id: number) => products.find((p) => p.id === id);

  // Tính tổng số lượng SP trong đơn
  const getTotalItems = (items: OrderItem[]) =>
    items.reduce((sum, item) => sum + item.quantity, 0);

  // ============= XỬ LÝ TẠO ĐƠN =============

  // Số lượng đã chọn cho 1 sản phẩm trong đơn hiện tại
  const getQuantityInDraft = (productId: number) => {
    const found = orderItems.find((i) => i.productId === productId);
    return found ? found.quantity : 0;
  };

  // Thêm sản phẩm vào đơn
  const handleAddItem = () => {
    setCreateError("");

    if (!selectedProductId) {
      setCreateError("Vui lòng chọn sản phẩm");
      return;
    }

    const product = products.find((p) => p.id === selectedProductId);
    if (!product) {
      setCreateError("Sản phẩm không tồn tại");
      return;
    }

    if (selectedQuantity <= 0) {
      setCreateError("Số lượng phải lớn hơn 0");
      return;
    }

    const existedQty = getQuantityInDraft(selectedProductId);
    if (selectedQuantity + existedQty > product.stock) {
      setCreateError("Số lượng vượt quá tồn kho");
      return;
    }

    setOrderItems((prev) => {
      const existed = prev.find((i) => i.productId === selectedProductId);
      if (existed) {
        return prev.map((i) =>
          i.productId === selectedProductId
            ? { ...i, quantity: i.quantity + selectedQuantity }
            : i
        );
      }
      return [...prev, { productId: selectedProductId, quantity: selectedQuantity }];
    });

    // Reset chọn sản phẩm
    setSelectedProductId("");
    setSelectedQuantity(1);
  };

  // Đổi số lượng trong danh sách item
  const handleChangeItemQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      // Xoá luôn nếu <=0
      setOrderItems((prev) => prev.filter((i) => i.productId !== productId));
      return;
    }

    const product = products.find((p) => p.id === productId);
    if (!product) return;

    if (quantity > product.stock) {
      alert("Số lượng vượt quá tồn kho!");
      return;
    }

    setOrderItems((prev) =>
      prev.map((i) =>
        i.productId === productId ? { ...i, quantity } : i
      )
    );
  };

  // Xoá sản phẩm khỏi đơn
  const handleRemoveItem = (productId: number) => {
    setOrderItems((prev) => prev.filter((i) => i.productId !== productId));
  };

  // Submit tạo đơn
  const handleCreateOrder = () => {
    setCreateError("");

    if (!selectedCustomerId) {
      setCreateError("Vui lòng chọn khách hàng");
      return;
    }

    if (orderItems.length === 0) {
      setCreateError("Đơn hàng chưa có sản phẩm");
      return;
    }

    // Tính tổng
    const total = draftTotal;

    // Tạo mã đơn đơn giản
    const nextId = orders.length + 1;
    const code = `OD${nextId.toString().padStart(4, "0")}`;

    const newOrder: Order = {
      id: nextId,
      code,
      customerId: selectedCustomerId as number,
      items: orderItems,
      total,
      status: "new",
      createdAt: new Date().toISOString(),
    };

    // Trừ tồn kho
    const updatedProducts = products.map((p) => {
      const item = orderItems.find((i) => i.productId === p.id);
      if (!item) return p;
      return { ...p, stock: p.stock - item.quantity };
    });
    setProducts(updatedProducts);

    // Thêm đơn vào danh sách
    setOrders((prev) => [newOrder, ...prev]);

    // Reset form + đóng modal
    setSelectedCustomerId("");
    setSelectedProductId("");
    setSelectedQuantity(1);
    setOrderItems([]);
    setIsCreateOpen(false);
  };

  // Đổi trạng thái đơn
  const handleChangeStatus = (orderId: number, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
  };

  // Xoá đơn (demo, không trả lại tồn kho cho đơn đã xoá)
  const handleDeleteOrder = (orderId: number) => {
    if (!window.confirm("Bạn có chắc muốn xoá đơn này?")) return;
    setOrders((prev) => prev.filter((o) => o.id !== orderId));
  };

  // Đóng modal tạo đơn
  const closeCreateModal = () => {
    setIsCreateOpen(false);
    setCreateError("");
    setSelectedCustomerId("");
    setSelectedProductId("");
    setSelectedQuantity(1);
    setOrderItems([]);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* HEADER */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý đơn hàng</h1>
          <p className="text-sm text-gray-500">
            Tạo đơn mới, theo dõi trạng thái và quản lý lịch sử bán hàng.
          </p>
        </div>

        <button
          onClick={() => setIsCreateOpen(true)}
          className="mt-2 inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1"
        >
          <span className="mr-2">➕</span> Tạo đơn hàng
        </button>
      </div>

      {/* FILTER & SEARCH */}
      <div className="mb-4 flex flex-col gap-3 rounded-xl bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-600">Trạng thái:</span>
            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value as OrderStatus | "all")
              }
              className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="all">Tất cả</option>
              <option value="new">Mới tạo</option>
              <option value="processing">Đang xử lý</option>
              <option value="completed">Hoàn tất</option>
              <option value="canceled">Đã huỷ</option>
            </select>
          </div>

          <div className="flex-1">
            <div className="relative">
              <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-gray-400">
                🔍
              </span>
              <input
                type="text"
                placeholder="Tìm theo mã đơn / tên khách hàng..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-9 pr-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="text-sm text-gray-500">
          Tổng:{" "}
          <span className="font-semibold text-gray-800">{filteredOrders.length}</span>{" "}
          đơn
        </div>
      </div>

      {/* BẢNG ĐƠN HÀNG */}
      <div className="overflow-hidden rounded-xl bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Mã đơn
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Khách hàng
                </th>
                <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-500">
                  SL SP
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Tổng tiền
                </th>
                <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Trạng thái
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Ngày tạo
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-6 text-center text-gray-500">
                    Chưa có đơn hàng nào. Hãy bấm{" "}
                    <span className="font-semibold">"Tạo đơn hàng"</span> để thêm.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="whitespace-nowrap px-4 py-3 font-semibold text-gray-800">
                      {order.code}
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-sm font-medium text-gray-900">
                        {getCustomerName(order.customerId)}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center text-gray-700">
                      {getTotalItems(order.items)}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-right font-semibold text-gray-900">
                      {formatCurrency(order.total)}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusClass(
                          order.status
                        )}`}
                      >
                        {getStatusLabel(order.status)}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-gray-600">
                      {new Date(order.createdAt).toLocaleString("vi-VN")}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-right text-xs">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setViewOrder(order)}
                          className="rounded-lg border border-gray-300 px-2.5 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50"
                        >
                          👁 Xem
                        </button>

                        <select
                          value={order.status}
                          onChange={(e) =>
                            handleChangeStatus(
                              order.id,
                              e.target.value as OrderStatus
                            )
                          }
                          className="rounded-lg border border-gray-300 bg-white px-2 py-1.5 text-xs focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        >
                          <option value="new">Mới</option>
                          <option value="processing">Xử lý</option>
                          <option value="completed">Hoàn tất</option>
                          <option value="canceled">Huỷ</option>
                        </select>

                        <button
                          onClick={() => handleDeleteOrder(order.id)}
                          className="rounded-lg border border-red-200 px-2.5 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50"
                        >
                          🗑 Xoá
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL TẠO ĐƠN HÀNG */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 px-4">
          <div className="max-h-[90vh] w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-xl">
            <div className="flex items-center justify-between border-b px-6 py-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Tạo đơn hàng mới
              </h2>
              <button
                onClick={closeCreateModal}
                className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
              >
                ✖
              </button>
            </div>

            <div className="flex max-h-[70vh] flex-col gap-4 overflow-y-auto px-6 py-4">
              {/* Khách hàng */}
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Khách hàng
                </label>
                <select
                  value={selectedCustomerId}
                  onChange={(e) =>
                    setSelectedCustomerId(
                      e.target.value ? Number(e.target.value) : ""
                    )
                  }
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">-- Chọn khách hàng --</option>
                  {customers.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.phone})
                    </option>
                  ))}
                </select>
              </div>

              {/* Chọn sản phẩm + thêm */}
              <div className="grid gap-4 md:grid-cols-[2fr,1fr,auto] md:items-end">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Sản phẩm
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
                        {p.name} - {formatCurrency(p.price)} (Tồn: {p.stock})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Số lượng
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={selectedQuantity}
                    onChange={(e) => setSelectedQuantity(Number(e.target.value))}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <button
                  onClick={handleAddItem}
                  className="mt-2 inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1 md:mt-0"
                >
                  ➕ Thêm
                </button>
              </div>

              {/* Danh sách sản phẩm trong đơn */}
              <div className="mt-2">
                <h3 className="mb-2 text-sm font-semibold text-gray-800">
                  Sản phẩm trong đơn
                </h3>

                {orderItems.length === 0 ? (
                  <p className="rounded-lg bg-gray-50 px-3 py-2 text-sm text-gray-500">
                    Chưa có sản phẩm nào. Hãy chọn sản phẩm và bấm{" "}
                    <span className="font-semibold">"Thêm"</span>.
                  </p>
                ) : (
                  <div className="overflow-hidden rounded-lg border border-gray-200">
                    <div className="max-h-64 overflow-y-auto">
                      <table className="min-w-full divide-y divide-gray-200 text-sm">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                              Sản phẩm
                            </th>
                            <th className="px-3 py-2 text-center text-xs font-semibold uppercase tracking-wider text-gray-500">
                              Đơn giá
                            </th>
                            <th className="px-3 py-2 text-center text-xs font-semibold uppercase tracking-wider text-gray-500">
                              SL
                            </th>
                            <th className="px-3 py-2 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                              Thành tiền
                            </th>
                            <th className="px-3 py-2"></th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 bg-white">
                          {orderItems.map((item) => {
                            const product = getProduct(item.productId);
                            if (!product) return null;
                            const lineTotal = product.price * item.quantity;
                            return (
                              <tr key={item.productId}>
                                <td className="px-3 py-2">
                                  <div className="text-sm font-medium text-gray-900">
                                    {product.name}
                                  </div>
                                  <div className="text-xs text-gray-500">
                                    Tồn: {product.stock}
                                  </div>
                                </td>
                                <td className="px-3 py-2 text-center text-gray-700">
                                  {formatCurrency(product.price)}
                                </td>
                                <td className="px-3 py-2 text-center">
                                  <input
                                    type="number"
                                    min={1}
                                    value={item.quantity}
                                    onChange={(e) =>
                                      handleChangeItemQuantity(
                                        item.productId,
                                        Number(e.target.value)
                                      )
                                    }
                                    className="w-20 rounded border border-gray-300 px-2 py-1 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                  />
                                </td>
                                <td className="px-3 py-2 text-right font-medium text-gray-800">
                                  {formatCurrency(lineTotal)}
                                </td>
                                <td className="px-3 py-2 text-right">
                                  <button
                                    onClick={() =>
                                      handleRemoveItem(item.productId)
                                    }
                                    className="rounded-lg border border-red-200 px-2 py-1 text-xs font-medium text-red-600 hover:bg-red-50"
                                  >
                                    Xoá
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>

                    <div className="flex items-center justify-between bg-gray-50 px-4 py-3 text-sm">
                      <span className="text-gray-600">
                        Tổng số lượng:{" "}
                        <span className="font-semibold">
                          {getTotalItems(orderItems)}
                        </span>
                      </span>
                      <span className="text-gray-700">
                        Tổng tiền:{" "}
                        <span className="text-base font-semibold text-blue-600">
                          {formatCurrency(draftTotal)}
                        </span>
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {createError && (
                <div className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
                  {createError}
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-3 border-t bg-gray-50 px-6 py-3">
              <button
                onClick={closeCreateModal}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-white"
              >
                Hủy
              </button>
              <button
                onClick={handleCreateOrder}
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-blue-500"
              >
                💾 Lưu đơn hàng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL XEM CHI TIẾT ĐƠN */}
      {viewOrder && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-xl">
            <div className="flex items-center justify-between border-b px-6 py-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Chi tiết đơn {viewOrder.code}
                </h2>
                <p className="text-xs text-gray-500">
                  Khách: {getCustomerName(viewOrder.customerId)} •{" "}
                  {new Date(viewOrder.createdAt).toLocaleString("vi-VN")}
                </p>
              </div>
              <button
                onClick={() => setViewOrder(null)}
                className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
              >
                ✖
              </button>
            </div>

            <div className="max-h-[70vh] overflow-y-auto px-6 py-4">
              <div className="mb-3">
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
                    viewOrder.status
                  )}`}
                >
                  {getStatusLabel(viewOrder.status)}
                </span>
              </div>

              <div className="overflow-hidden rounded-lg border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                        Sản phẩm
                      </th>
                      <th className="px-3 py-2 text-center text-xs font-semibold uppercase tracking-wider text-gray-500">
                        Đơn giá
                      </th>
                      <th className="px-3 py-2 text-center text-xs font-semibold uppercase tracking-wider text-gray-500">
                        SL
                      </th>
                      <th className="px-3 py-2 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                        Thành tiền
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 bg-white">
                    {viewOrder.items.map((item, idx) => {
                      const product = getProduct(item.productId);
                      if (!product) return null;
                      const lineTotal = product.price * item.quantity;
                      return (
                        <tr key={idx}>
                          <td className="px-3 py-2">
                            <div className="text-sm font-medium text-gray-900">
                              {product.name}
                            </div>
                          </td>
                          <td className="px-3 py-2 text-center text-gray-700">
                            {formatCurrency(product.price)}
                          </td>
                          <td className="px-3 py-2 text-center text-gray-700">
                            {item.quantity}
                          </td>
                          <td className="px-3 py-2 text-right font-medium text-gray-800">
                            {formatCurrency(lineTotal)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                <div className="flex items-center justify-between bg-gray-50 px-4 py-3 text-sm">
                  <span className="text-gray-600">
                    Tổng số lượng:{" "}
                    <span className="font-semibold">
                      {getTotalItems(viewOrder.items)}
                    </span>
                  </span>
                  <span className="text-gray-700">
                    Tổng tiền:{" "}
                    <span className="text-base font-semibold text-blue-600">
                      {formatCurrency(viewOrder.total)}
                    </span>
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end border-t bg-gray-50 px-6 py-3">
              <button
                onClick={() => setViewOrder(null)}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-white"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
