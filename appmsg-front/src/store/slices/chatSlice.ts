import { ChatAtual, UltimaMensagem, UsuariosChat } from "@/src/types/IChat";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getUsuariosChat } from "../thunk/chat";
import { IMensagem } from "@/src/types/IMessage";

interface ChatState {
  isloading: boolean;
  usuariosChat: UsuariosChat[];
  chatAtual: ChatAtual;
  isLoadingChat: boolean;
  isLoadingMensagens: boolean;
}

const initialState: ChatState = {
  isloading: false,
  usuariosChat: [],
  chatAtual: {
    chat: { dataCriacao: "", id: "", participantes: [], tipo: "individual" },
    usuario: { email: "", id: "", nome: "", status: "" },
    usuarioDestino: { email: "", id: "", nome: "", status: "" },
    mensagens: [],
  },
  isLoadingChat: false,
  isLoadingMensagens: true,
};
const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    updateUltimaMensagem: (
      state,
      action: PayloadAction<{ userId: string; mensagem: UltimaMensagem }>
    ) => {
      const { userId, mensagem } = action.payload;

      const user = state.usuariosChat.find((u) => u.id === userId);
      if (!user) return;

      user.ultimaMensagem = {
        ...mensagem,
        dataEnvio: mensagem.dataEnvio ?? new Date().toISOString(),
      };
    },
    setChatAtual: (state, action: PayloadAction<ChatAtual>) => {
      state.chatAtual = {
        ...action.payload,
        mensagens: state.chatAtual.mensagens,
      };
    },
    setLoadingChatAtual: (state, action: PayloadAction<boolean>) => {
      state.isLoadingChat = action.payload;
    },
    setMensagens: (state, action: PayloadAction<IMensagem[]>) => {
      state.chatAtual.mensagens = action.payload;
    },
    addMensagem: (state, action: PayloadAction<IMensagem>) => {
      state.chatAtual.mensagens.push(action.payload);
    },
    setLoadingMensagens: (state, action: PayloadAction<boolean>) => {
      state.isLoadingMensagens = action.payload;
    },
    addUltimaMensagem: (state, action: PayloadAction<IMensagem>) => {
      console.log(action.payload)
      const chatIndex = state.usuariosChat.findIndex((c) =>
        action.payload.participantes.includes(c.id)
      );

      if (chatIndex !== -1) {
        state.usuariosChat[chatIndex].ultimaMensagem = {
          conteudo: action.payload.conteudo,
          dataEnvio: Date.now().toString(),
          usuarioId: action.payload.usuarioId,
        };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsuariosChat.pending, (state) => {
        state.isloading = true;
      })
      .addCase(getUsuariosChat.fulfilled, (state, action) => {
        state.isloading = false;
        state.usuariosChat = action.payload.chats;
      })
      .addCase(getUsuariosChat.rejected, (state) => {
        state.isloading = false;
      });
  },
});

export const {
  setLoadingMensagens,
  updateUltimaMensagem,
  setChatAtual,
  setLoadingChatAtual,
  setMensagens,
  addMensagem,
  addUltimaMensagem
} = chatSlice.actions;
export default chatSlice.reducer;
