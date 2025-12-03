import { useMemo, useState } from "react";

type Customer = {
  id: number;
  name: string;
  phone: string;
  email: string;
  address: string;
  type: string; // Khách lẻ / Khách sỉ / VIP
  totalOrders: number;
  totalSpent: number;
  createdAt: string;
  lastOrder: string;
};

const customerTypes = ["Tất cả", "Khách lẻ", "Khách sỉ", "VIP"];

const initialCustomers: Customer[] = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    phone: "0901234567",
    email: "a.nguyen@example.com",
    address: "Q.1, TP.HCM",
    type: "Khách lẻ",
    totalOrders: 5,
    totalSpent: 3500000,
    createdAt: "2025-10-10",
    lastOrder: "2025-11-20",
  },
  {
    id: 2,
    name: "Cửa hàng Bách Hoá B",
    phone: "0912345678",
    email: "contact@bachhoa-b.vn",
    address: "Q. Bình Thạnh, TP.HCM",
    type: "Khách sỉ",
    totalOrders: 12,
    totalSpent: 15800000,
    createdAt: "2025-09-05",
    lastOrder: "2025-11-25",
  },
  {
    id: 3,
    name: "Trần Thị C",
    phone: "0987654321",
    email: "tran.c@example.com",
    address: "Đà Nẵng",
    type: "VIP",
    totalOrders: 20,
    totalSpent: 42000000,
    createdAt: "2025-08-15",
    lastOrder: "2025-11-28",
  },
];

const Customers = () => {
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("Tất cả");

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    type: "Khách lẻ",
    totalOrders: "",
    totalSpent: "",
  });

  const resetForm = () => {
    setFormData({
      name: "",
      phone: "",
      email: "",
      address: "",
      type: "Khách lẻ",
      totalOrders: "",
      totalSpent: "",
    });
    setEditingCustomer(null);
  };

  const openAddModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const openEditModal = (customer: Customer) => {
    setEditingCustomer(customer);
    setFormData({
      name: customer.name,
      phone: customer.phone,
      email: customer.email,
      address: customer.address,
      type: customer.type,
      totalOrders: customer.totalOrders.toString(),
      totalSpent: customer.totalSpent.toString(),
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

    const totalOrdersNumber = Number(formData.totalOrders || 0);
    const totalSpentNumber = Number(formData.totalSpent || 0);

    if (!formData.name.trim() || !formData.phone.trim()) return;
    if (Number.isNaN(totalOrdersNumber) || Number.isNaN(totalSpentNumber)) return;

    if (editingCustomer) {
      // Cập nhật khách hàng
      setCustomers((prev) =>
        prev.map((c) =>
          c.id === editingCustomer.id
            ? {
                ...c,
                name: formData.name.trim(),
                phone: formData.phone.trim(),
                email: formData.email.trim(),
                address: formData.address.trim(),
                type: formData.type,
                totalOrders: totalOrdersNumber,
                totalSpent: totalSpentNumber,
              }
            : c
        )
      );
    } else {
      // Thêm khách hàng mới
      const nowDate = new Date().toISOString().slice(0, 10);
      const newCustomer: Customer = {
        id: Date.now(),
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        address: formData.address.trim(),
        type: formData.type,
        totalOrders: totalOrdersNumber,
        totalSpent: totalSpentNumber,
        createdAt: nowDate,
        lastOrder: nowDate,
      };
      setCustomers((prev) => [newCustomer, ...prev]);
    }

    closeModal();
  };

  const handleDelete = (id: number) => {
    const ok = window.confirm("Bạn có chắc muốn xoá khách hàng này?");
    if (!ok) return;
    setCustomers((prev) => prev.filter((c) => c.id !== id));
  };

  // Lọc + tìm
  const filteredCustomers = useMemo(() => {
    let data = [...customers];

    if (search.trim()) {
      const keyword = search.trim().toLowerCase();
      data = data.filter(
        (c) =>
          c.name.toLowerCase().includes(keyword) ||
          c.phone.toLowerCase().includes(keyword) ||
          c.email.toLowerCase().includes(keyword)
      );
    }

    if (typeFilter !== "Tất cả") {
      data = data.filter((c) => c.type === typeFilter);
    }

    return data;
  }, [customers, search, typeFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredCustomers.length / pageSize));

  const currentPageData = filteredCustomers.slice(
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
            Khách hàng
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Quản lý thông tin khách hàng, lịch sử mua hàng và phân loại nhóm khách.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-blue-500 active:scale-[0.98] transition"
        >
          + Thêm khách hàng
        </button>
      </div>

      {/* Thanh filter / search */}
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900/60">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-1 flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Tìm theo tên, SĐT hoặc email..."
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
              value={typeFilter}
              onChange={(e) => {
                setTypeFilter(e.target.value);
                setCurrentPage(1);
              }}
            >
              {customerTypes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div className="text-xs text-slate-500 dark:text-slate-400">
            Tổng:{" "}
            <span className="font-semibold text-slate-700 dark:text-slate-200">
              {filteredCustomers.length}
            </span>{" "}
            khách hàng
          </div>
        </div>
      </div>

      {/* Bảng khách hàng */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900/60">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500 dark:bg-slate-800 dark:text-slate-400">
              <tr>
                <th className="px-4 py-3">Khách hàng</th>
                <th className="px-4 py-3">Liên hệ</th>
                <th className="px-4 py-3">Địa chỉ</th>
                <th className="px-4 py-3">Nhóm</th>
                <th className="px-4 py-3 text-right">Số đơn</th>
                <th className="px-4 py-3 text-right">Tổng chi tiêu</th>
                <th className="px-4 py-3">Đơn gần nhất</th>
                <th className="px-4 py-3 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {currentPageData.length === 0 ? (
                <tr>
                  <td
                    colSpan={8}
                    className="px-4 py-6 text-center text-sm text-slate-500 dark:text-slate-400"
                  >
                    Không có khách hàng nào phù hợp.
                  </td>
                </tr>
              ) : (
                currentPageData.map((customer) => (
                  <tr
                    key={customer.id}
                    className="hover:bg-slate-50/70 dark:hover:bg-slate-800/60"
                  >
                    <td className="px-4 py-3 text-slate-900 dark:text-slate-50">
                      <div className="font-medium">{customer.name}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        Tạo ngày {customer.createdAt}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                      <div className="text-sm">{customer.phone}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        {customer.email}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                      {customer.address}
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                        {customer.type}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right text-slate-700 dark:text-slate-200">
                      {customer.totalOrders}
                    </td>
                    <td className="px-4 py-3 text-right text-slate-900 dark:text-slate-50">
                      {customer.totalSpent.toLocaleString("vi-VN")}₫
                    </td>
                    <td className="px-4 py-3 text-slate-500 dark:text-slate-400">
                      {customer.lastOrder}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="inline-flex gap-2">
                        <button
                          onClick={() => openEditModal(customer)}
                          className="rounded-md border border-slate-200 px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-100 dark:border-slate-600 dark:text-slate-100 dark:hover:bg-slate-800"
                        >
                          Sửa
                        </button>
                        <button
                          onClick={() => handleDelete(customer.id)}
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
              {editingCustomer ? "Sửa khách hàng" : "Thêm khách hàng mới"}
            </h2>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-300">
                  Tên khách hàng
                </label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none ring-blue-500/0 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
                  required
                />
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-300">
                    Số điện thoại
                  </label>
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none ring-blue-500/0 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
                    required
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-300">
                    Email
                  </label>
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none ring-blue-500/0 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
                    type="email"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-300">
                  Địa chỉ
                </label>
                <input
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none ring-blue-500/0 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
                />
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-300">
                    Nhóm khách
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none ring-blue-500/0 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
                  >
                    {customerTypes
                      .filter((t) => t !== "Tất cả")
                      .map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-300">
                      Số đơn
                    </label>
                    <input
                      type="number"
                      min={0}
                      name="totalOrders"
                      value={formData.totalOrders}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none ring-blue-500/0 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-300">
                      Tổng chi tiêu (₫)
                    </label>
                    <input
                      type="number"
                      min={0}
                      name="totalSpent"
                      value={formData.totalSpent}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none ring-blue-500/0 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
                    />
                  </div>
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
                  {editingCustomer ? "Lưu thay đổi" : "Thêm mới"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Customers;
