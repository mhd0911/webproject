import axiosClient from "./axiosClient";

const productApi = {
  getAll() {
    return axiosClient.get("/products");
  },
  getById(id: number) {
    return axiosClient.get(`/products/${id}`);
  },
  create(data: any) {
    return axiosClient.post("/products", data);
  },
  update(id: number, data: any) {
    return axiosClient.put(`/products/${id}`, data);
  },
  delete(id: number) {
    return axiosClient.delete(`/products/${id}`);
  },
};

export default productApi;
