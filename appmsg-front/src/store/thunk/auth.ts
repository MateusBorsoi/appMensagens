import { getOptions } from "@/src/axios/util";
import { deleteCookie, setCookie } from "@/src/server/actions";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

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

      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("lembrar", lembrar.toString());
        await setCookie({ name: "access_token", value: data.token });
      }
      onSuccess && onSuccess();
      return data;
    } catch (error: unknown | AxiosError) {
      if (axios.isAxiosError(error)) {
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
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      await deleteCookie("access_token");
      onLogout();
    }
  }
);
