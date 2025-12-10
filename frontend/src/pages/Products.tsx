// src/pages/Products.tsx
import React, { useMemo, useState } from "react";

type ProductStatus = "active" | "low" | "out" | "hidden";

interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  stock: number;
  status: ProductStatus;
  image: string;
  soldToday: number;
  rating: number;
}

const mockProducts: Product[] = [
  {
    id: "SP001",
    name: "Áo thun basic trắng",
    sku: "AT001",
    category: "Áo thun",
    price: 159000,
    stock: 12,
    status: "active",
    image:
      "https://cdn.hstatic.net/products/200000887901/img_2391_c24bab89ad6849268efad22e35292e94.jpg",
    soldToday: 5,
    rating: 4.7,
  },
  {
    id: "SP002",
    name: "Quần jean xanh slim fit",
    sku: "QJ023",
    category: "Quần jean",
    price: 399000,
    stock: 3,
    status: "low",
    image:
      "https://4men.com.vn/images/thumbs/2019/08/quan-jean-slimfit-xanh-bien-qj1653-14633-slide-products-5d64ff79d9e5f.JPG",
    soldToday: 2,
    rating: 4.5,
  },
  {
    id: "SP003",
    name: "Áo khoác hoodie đen",
    sku: "AK012",
    category: "Áo khoác",
    price: 459000,
    stock: 0,
    status: "out",
    image:
      "https://saigonsneaker.com/wp-content/uploads/2021/03/Ao-khoac-hoodie-flexible-toi-gian-mau-den.jpg",
    soldToday: 0,
    rating: 4.2,
  },
  {
    id: "SP004",
    name: "Sơ mi kẻ caro",
    sku: "SM034",
    category: "Sơ mi",
    price: 289000,
    stock: 28,
    status: "active",
    image:
      "https://cdn0199.cdn4s.com/media/z4849942261122_f6abef1678890de77b5af17e0542ae0d.jpg",
    soldToday: 7,
    rating: 4.9,
  },
  {
    id: "SP005",
    name: "Quần short kaki",
    sku: "QS019",
    category: "Quần short",
    price: 219000,
    stock: 6,
    status: "low",
    image:
      "https://vn-test-11.slatic.net/shop/c04ff374a04ed35e106aedaa31f94d69.png",
    soldToday: 1,
    rating: 4.3,
  },
  {
    id: "SP006",
    name: "Áo polo nam",
    sku: "PL015",
    category: "Áo polo",
    price: 249000,
    stock: 40,
    status: "hidden",
    image:
      "https://lapier.vn/wp-content/uploads/2023/04/web-616-scaled.jpg",
    soldToday: 0,
    rating: 4.1,
  },
];

const formatCurrency = (value: number) =>
  value.toLocaleString("vi-VN", { style: "currency", currency: "VND" });

const statusLabel: Record<ProductStatus, string> = {
  active: "Đang bán",
  low: "Sắp hết hàng",
  out: "Hết hàng",
  hidden: "Đang ẩn",
};

const statusColorClass: Record<ProductStatus, string> = {
  active: "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-200",
  low: "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-200",
  out: "bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-200",
  hidden: "bg-slate-100 text-slate-600 dark:bg-slate-700/60 dark:text-slate-200",
};

const Products = () => {
  const [statusFilter, setStatusFilter] = useState<"all" | ProductStatus>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [search, setSearch] = useState<string>("");
  const [sortBy, setSortBy] = useState<"new" | "priceAsc" | "priceDesc" | "stock">(
    "new"
  );

  const categories = useMemo(
    () => Array.from(new Set(mockProducts.map((p) => p.category))),
    []
  );

  const filtered = useMemo(() => {
    let list = [...mockProducts];

    if (statusFilter !== "all") {
      list = list.filter((p) => p.status === statusFilter);
    }
    if (categoryFilter !== "all") {
      list = list.filter((p) => p.category === categoryFilter);
    }
    if (search.trim()) {
      const keyword = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(keyword) ||
          p.sku.toLowerCase().includes(keyword) ||
          p.id.toLowerCase().includes(keyword)
      );
    }

    switch (sortBy) {
      case "priceAsc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "priceDesc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "stock":
        list.sort((a, b) => a.stock - b.stock);
        break;
      default:
        // "new" – giả sử theo id (đảo ngược)
        list.sort((a, b) => (a.id < b.id ? 1 : -1));
    }

    return list;
  }, [statusFilter, categoryFilter, search, sortBy]);

  const stats = useMemo(() => {
    const total = mockProducts.length;
    const low = mockProducts.filter((p) => p.status === "low").length;
    const out = mockProducts.filter((p) => p.status === "out").length;
    const hidden = mockProducts.filter((p) => p.status === "hidden").length;
    return { total, low, out, hidden };
  }, []);

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold text-slate-900 dark:text-slate-50 flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-violet-100 text-violet-700 dark:bg-violet-500/20 dark:text-violet-100">
              📦
            </span>
            Quản lý sản phẩm
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Xem nhanh tồn kho, trạng thái và hiệu quả bán hàng của từng sản phẩm.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs sm:text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
          >
            ⬇️ Xuất danh sách
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-violet-500"
          >
            ➕ Thêm sản phẩm
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400 dark:text-slate-500">
                Tổng sản phẩm
              </p>
              <p className="text-xl font-semibold text-slate-900 dark:text-slate-50">
                {stats.total}
              </p>
            </div>
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-violet-100 text-violet-700 dark:bg-violet-500/20 dark:text-violet-100">
              🛒
            </span>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400 dark:text-slate-500">
                Sắp hết hàng
              </p>
              <p className="text-xl font-semibold text-amber-600 dark:text-amber-300">
                {stats.low}
              </p>
            </div>
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-100">
              ⚠️
            </span>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400 dark:text-slate-500">
                Hết hàng
              </p>
              <p className="text-xl font-semibold text-rose-600 dark:text-rose-300">
                {stats.out}
              </p>
            </div>
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-100">
              ⛔
            </span>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400 dark:text-slate-500">
                Đang ẩn
              </p>
              <p className="text-xl font-semibold text-slate-900 dark:text-slate-50">
                {stats.hidden}
              </p>
            </div>
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-100">
              🙈
            </span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2">
            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value as "all" | ProductStatus)
              }
              className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs sm:text-sm text-slate-700 shadow-sm focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            >
              <option value="all">Trạng thái: Tất cả</option>
              <option value="active">Đang bán</option>
              <option value="low">Sắp hết hàng</option>
              <option value="out">Hết hàng</option>
              <option value="hidden">Đang ẩn</option>
            </select>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs sm:text-sm text-slate-700 shadow-sm focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            >
              <option value="all">Danh mục: Tất cả</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-1 flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
            <div className="relative w-full sm:max-w-xs">
              <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-400">
                🔍
              </span>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white pl-9 pr-3 py-2 text-xs sm:text-sm text-slate-700 shadow-sm placeholder:text-slate-400 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                placeholder="Tìm theo tên, mã SP, SKU..."
              />
            </div>

            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(
                  e.target.value as "new" | "priceAsc" | "priceDesc" | "stock"
                )
              }
              className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs sm:text-sm text-slate-700 shadow-sm focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            >
              <option value="new">Mới nhất</option>
              <option value="priceAsc">Giá tăng dần</option>
              <option value="priceDesc">Giá giảm dần</option>
              <option value="stock">Tồn kho ít → nhiều</option>
            </select>
          </div>
        </div>
      </div>

      {/* Product grid */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {filtered.map((p) => (
          <article
            key={p.id}
            className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-violet-200 hover:shadow-lg dark:border-slate-700 dark:bg-slate-900 dark:hover:border-violet-500/40"
          >
            <div className="relative overflow-hidden">
              <div className="aspect-[4/3] w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                <img
                  src={p.image}
                  alt={p.name}
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                />
              </div>
              {p.status === "low" && (
                <span className="absolute left-3 top-3 rounded-full bg-amber-500 px-2 py-0.5 text-[11px] font-semibold text-white shadow-sm">
                  Sắp hết
                </span>
              )}
              {p.status === "out" && (
                <span className="absolute left-3 top-3 rounded-full bg-rose-500 px-2 py-0.5 text-[11px] font-semibold text-white shadow-sm">
                  Hết hàng
                </span>
              )}
            </div>

            <div className="flex flex-1 flex-col p-4">
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-1">
                  <h3 className="line-clamp-2 text-sm font-semibold text-slate-900 dark:text-slate-50">
                    {p.name}
                  </h3>
                  <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400">
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 dark:bg-slate-800">
                      Mã: {p.id}
                    </span>
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 dark:bg-slate-800">
                      SKU: {p.sku}
                    </span>
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 dark:bg-slate-800">
                      {p.category}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-sm font-semibold text-violet-600 dark:text-violet-300">
                    {formatCurrency(p.price)}
                  </p>
                  <p className="mt-0.5 text-[11px] text-slate-400 dark:text-slate-500">
                    Đã bán hôm nay:{" "}
                    <span className="font-medium text-emerald-600 dark:text-emerald-300">
                      {p.soldToday}
                    </span>
                  </p>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between text-xs">
                <div className="flex flex-col gap-1">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium ${statusColorClass[p.status]}`}
                  >
                    <span className="text-[10px]">
                      {p.status === "active"
                        ? "🟢"
                        : p.status === "low"
                        ? "🟠"
                        : p.status === "out"
                        ? "🔴"
                        : "⚪"}
                    </span>
                    {statusLabel[p.status]}
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">
                    Tồn kho:{" "}
                    <span
                      className={
                        p.stock === 0
                          ? "font-semibold text-rose-500 dark:text-rose-300"
                          : p.stock <= 5
                          ? "font-semibold text-amber-500 dark:text-amber-300"
                          : "font-semibold text-emerald-600 dark:text-emerald-300"
                      }
                    >
                      {p.stock}
                    </span>
                  </span>
                </div>

                <div className="flex flex-col items-end gap-1">
                  <span className="text-[11px] text-amber-500 dark:text-amber-300">
                    ⭐ {p.rating.toFixed(1)}
                  </span>
                  <div className="flex gap-1.5">
                    <button
                      type="button"
                      className="rounded-lg border border-slate-200 px-2 py-1 text-[11px] font-medium text-slate-600 hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
                    >
                      Sửa
                    </button>
                    <button
                      type="button"
                      className="rounded-lg border border-rose-100 bg-rose-50 px-2 py-1 text-[11px] font-medium text-rose-600 hover:bg-rose-100 dark:border-rose-500/40 dark:bg-rose-500/10 dark:text-rose-200"
                    >
                      Ẩn / Xóa
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}

        {filtered.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 py-12 text-center dark:border-slate-600 dark:bg-slate-900/40">
            <div className="mb-3 text-4xl">🔎</div>
            <p className="text-sm font-medium text-slate-700 dark:text-slate-100">
              Không tìm thấy sản phẩm phù hợp
            </p>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Hãy thử đổi bộ lọc hoặc từ khoá tìm kiếm.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
