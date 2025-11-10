import { useEffect } from "react";
import useSession from "./useSession";
import { getSocket, registraSocket } from "../service/socket";
import { useAppDispatch } from "../store/hooks";
import { getUsuariosChat } from "../store/thunk/chat";
import { useDispatch, useSelector } from "react-redux";
import { getUsuarioChats } from "../store/selectors/selectUsuarioChats";
import { toast } from "react-toastify";
import { setLoadingChatAtual, setLoadingMensagens } from "../store/slices/chatSlice";

const useChat = () => {
  const { session } = useSession();

  const {
    usuariosChat,
    isloading,
    chatAtual,
    isLoadingChat,
    isLoadingMensagens,
  } = useSelector(getUsuarioChats);
  const dispatch = useDispatch();
  const appDispatch = useAppDispatch();

  useEffect(() => {
    async function onInit() {
      await appDispatch(getUsuariosChat({}));
    }
    onInit();
  }, []);

  useEffect(() => {
    async function onInit() {
      await registraSocket();
    }
    if (session) {
      onInit();
    }
  }, [session]);

  async function inciarConversa(usuarioDestino: string) {
    const socket = getSocket();

    try {
      if (socket) {
        dispatch(setLoadingChatAtual(true));
        dispatch(setLoadingMensagens(true))
        socket.emit("iniciar_conversa", {
          usuarioDestino: usuarioDestino,
        });
      }
    } catch (err) {
      dispatch(setLoadingChatAtual(false));
      toast.error(`Falha ao iniciar conversa`);
    }
  }

  async function onEnviarMsg(mensagem: string) {
    const socket = getSocket();
    try {
      if (socket) {
        socket.emit("enviar_mensagem", { conteudo: mensagem });
      }
    } catch (err) {
      toast.error(`Falha ao iniciar conversa`);
    }
  }

  return {
    usuariosChat,
    isloading,
    inciarConversa,
    chatAtual,
    isLoadingChat,
    onEnviarMsg,
    isLoadingMensagens,
  };
};

export default useChat;
