import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { login, logout } from "../thunk/auth";

type AuthState = {
  user: User;
  isAuthenticated: boolean;
  loading: boolean;
  lembrar: boolean;
  error: string | null;
};

const initialState: AuthState = {
  user: {} as User,
  lembrar: false,
  isAuthenticated: false,
  loading: false,
  error: null,
};

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
    restoreSession: (state) => {
      if (typeof window !== "undefined") {
        const userStr = localStorage.getItem("user");
        const lembrar = localStorage.getItem("lembrar");

        if (userStr) {
          state.user = JSON.parse(userStr);
          state.isAuthenticated = true;
          state.lembrar = lembrar === "true";
        }
      }
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
      state.user = { email: "", id: "", nome: "" };
      state.isAuthenticated = false;
      state.error = null;
    });
  },
});

export const { setCredentials, clearError, restoreSession } = authSlice.actions;
export default authSlice.reducer;
