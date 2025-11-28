import axiosClient from "./axiosClient";

const customerApi = {
  getAll() {
    return axiosClient.get("/customers");
  },
  getById(id: number) {
    return axiosClient.get(`/customers/${id}`);
  },
  create(data: any) {
    return axiosClient.post("/customers", data);
  },
  update(id: number, data: any) {
    return axiosClient.put(`/customers/${id}`, data);
  },
  delete(id: number) {
    return axiosClient.delete(`/customers/${id}`);
  },
};

export default customerApi;
