// frontend/src/redux/authSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import authApi from "../api/authApi";
import type {
  LoginPayload,
  RegisterPayload,
  UserProfile,
} from "../api/authApi";

interface AuthState {
  user: UserProfile | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

// Lấy sẵn từ localStorage (nếu có)
const initialToken = localStorage.getItem("token");
const initialUser = localStorage.getItem("user");

const initialState: AuthState = {
  user: initialUser ? (JSON.parse(initialUser) as UserProfile) : null,
  token: initialToken,
  loading: false,
  error: null,
};

// ============ THUNKS ============

export const loginThunk = createAsyncThunk(
  "auth/login",
  async (payload: LoginPayload, { rejectWithValue }) => {
    try {
      const res = await authApi.login(payload);
      return res.data;
    } catch (err: any) {
      const message =
        err?.response?.data?.message || "Đăng nhập thất bại. Vui lòng thử lại.";
      return rejectWithValue(message);
    }
  }
);

export const registerThunk = createAsyncThunk(
  "auth/register",
  async (payload: RegisterPayload, { rejectWithValue }) => {
    try {
      const res = await authApi.register(payload);
      return res.data;
    } catch (err: any) {
      const message =
        err?.response?.data?.message || "Đăng ký thất bại. Vui lòng thử lại.";
      return rejectWithValue(message);
    }
  }
);

export const fetchProfileThunk = createAsyncThunk(
  "auth/profile",
  async (_, { rejectWithValue }) => {
    try {
      const res = await authApi.getProfile();
      return res.data;
    } catch (err: any) {
      const message =
        err?.response?.data?.message || "Lấy thông tin người dùng thất bại.";
      return rejectWithValue(message);
    }
  }
);

// ============ SLICE ============

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.error = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    // LOGIN
    builder
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loginThunk.fulfilled,
        (
          state,
          action: PayloadAction<{ token: string; user: UserProfile }>
        ) => {
          state.loading = false;
          state.token = action.payload.token;
          state.user = action.payload.user;

          localStorage.setItem("token", action.payload.token);
          localStorage.setItem("user", JSON.stringify(action.payload.user));
        }
      )
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Đăng nhập thất bại.";
      });

    // REGISTER
    builder
      .addCase(registerThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        registerThunk.fulfilled,
        (
          state,
          action: PayloadAction<{ token: string; user: UserProfile }>
        ) => {
          state.loading = false;
          state.token = action.payload.token;
          state.user = action.payload.user;

          localStorage.setItem("token", action.payload.token);
          localStorage.setItem("user", JSON.stringify(action.payload.user));
        }
      )
      .addCase(registerThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Đăng ký thất bại.";
      });

    // PROFILE
    builder
      .addCase(fetchProfileThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchProfileThunk.fulfilled,
        (state, action: PayloadAction<UserProfile>) => {
          state.loading = false;
          state.user = action.payload;
          if (state.token) {
            localStorage.setItem("user", JSON.stringify(action.payload));
          }
        }
      )
      .addCase(fetchProfileThunk.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) || "Không lấy được thông tin người dùng.";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
