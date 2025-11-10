import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { User } from "@/src/types/ISession";
import { deleteCookie, setCookie } from "@/src/server/actions";
import axios, { AxiosError } from "axios";
import { getOptions } from "@/src/axios/util";
import { toast } from "react-toastify";

type AuthState = {
  user: User;
  isAuthenticated: boolean;
  loading: boolean;
  lembrar: boolean;
  error: string | null;
};

const initialState: AuthState = {
  user: { id: "", nome: "", email: "", status: "" },
  lembrar: false,
  isAuthenticated: false,
  loading: true,
  error: null,
};

export const login = createAsyncThunk(
  "auth/login",
  async (
    {
      email,
      senha,
      lembrar,
      onSuccess,
    }: {
      email: string;
      senha: string;
      lembrar: boolean;
      onSuccess?: () => void;
    },
    { rejectWithValue }
  ) => {
    const options = getOptions({
      url: "/auth/efetuarLogin",
      method: "POST",
      data: { email, senha },
    });
    try {
      const response = await axios.request(options);

      if (response.status !== 200) {
        return rejectWithValue(response.data.erro || "Erro ao fazer login");
      }

      const data = response.data;

      await setCookie({ name: "access_token", value: data.token });

      onSuccess && onSuccess();
      return {
        user: data.user,
        lembrar: lembrar,
      };
    } catch (error: unknown | AxiosError) {
      if (axios.isAxiosError(error)) {
        if (error?.response?.status === 400) {
          toast.error(error.response?.data.message);
        }
        return rejectWithValue(
          error.response?.data.erro || "Erro ao fazer login"
        );
      }
      return rejectWithValue("Erro ao fazer login");
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (onLogout: () => void) => {
    if (typeof window !== "undefined") {
      await deleteCookie("access_token");
      onLogout();
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: User; token: string }>
    ) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
    builder.addCase(logout.fulfilled, (state) => {
      state.user = { email: "", id: "", nome: "", status: "" };
      state.isAuthenticated = false;
      state.error = null;
    });
  },
});

export const { setCredentials, clearError } = authSlice.actions;
export default authSlice.reducer;
