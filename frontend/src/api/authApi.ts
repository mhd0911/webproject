// frontend/src/api/authApi.ts
import axiosClient from "./axiosClient";

export type LoginPayload = {
  username: string;
  password: string;
};

export type RegisterPayload = {
  fullName: string;
  username: string;
  password: string;
  confirmPassword: string;
  birthday?: string;
  address?: string;
};

export type UserProfile = {
  id: number;
  fullName: string;
  username: string;
  birthday?: string;
  address?: string;
  createdAt?: string;
};

const authApi = {
  login(payload: LoginPayload) {
    return axiosClient.post("/auth/login", payload);
  },

  register(payload: RegisterPayload) {
    return axiosClient.post("/auth/register", payload);
  },

  getProfile() {
    return axiosClient.get("/auth/profile");
  },
};

export default authApi;
