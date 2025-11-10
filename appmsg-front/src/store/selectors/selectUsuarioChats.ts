import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

const getChatsUsuarios = (state: RootState) => state.chat;

const getUsuarioChats = createSelector([getChatsUsuarios], (uc) => ({
  isloading: uc.isloading,
  usuariosChat: uc.usuariosChat,
  chatAtual: uc.chatAtual,
  isLoadingChat: uc.isLoadingChat,
  isLoadingMensagens: uc.isLoadingMensagens,
}));

export { getUsuarioChats };
