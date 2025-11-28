import axiosClient from "./axiosClient";

const orderApi = {
  getAll() {
    return axiosClient.get("/orders");
  },
  getById(id: number) {
    return axiosClient.get(`/orders/${id}`);
  },
  create(data: any) {
    return axiosClient.post("/orders", data);
  },
  update(id: number, data: any) {
    return axiosClient.put(`/orders/${id}`, data);
  },
  delete(id: number) {
    return axiosClient.delete(`/orders/${id}`);
  },
};

export default orderApi;
