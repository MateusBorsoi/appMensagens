import { api } from "@/src/axios/config";
import { getOptions } from "@/src/axios/util";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

export const getUsuariosChat = createAsyncThunk(
  "auth/usuarioChats",
  async ({}: {}, { rejectWithValue }) => {
    const options = getOptions({
      url: "/usuarios/chats",
      method: "GET",
    });
    try {
      const response = await api.request(options);

      if (response.status !== 200) {
        return rejectWithValue(
          response.data.erro || "Erro ao obter usuario chats"
        );
      }
      const data = response.data;
      return data;
    } catch (error: unknown | AxiosError) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data.erro || "Erro ao obter usuario chats"
        );
      }
      return rejectWithValue("Erro ao obter usuario chats");
    }
  }
);
