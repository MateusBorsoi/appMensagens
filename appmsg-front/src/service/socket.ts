import { io, Socket } from "socket.io-client";
import { getCookie } from "../server/actions";
import { sessionExpired } from "../utils/utils";
import { ChatAtual } from "../types/IChat";
import { store } from "../store/store";
import {
  addMensagem,
  addUltimaMensagem,
  setChatAtual,
  setLoadingChatAtual,
  setLoadingMensagens,
  setMensagens,
} from "../store/slices/chatSlice";
import { IMensagem } from "../types/IMessage";
import { toast, Zoom } from "react-toastify";

let socket: Socket | null = null;

async function registraSocket() {
  const token = await getCookie("access_token");
  socket = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
    auth: {
      token: token?.value,
    },
  });

  if (token?.value) {
    if (socket?.connected) {
      socket.disconnect();
    }

    socket.on("connect_error", async (error) => {
      if (error.message === "Token inválido ou expirado") {
        await sessionExpired();
      }
    });
    socket.on("connect", () => {
      console.log("Conectado ao chat!");
    });

    socket.on("historico_mensagens", (mensagens: IMensagem[]) => {
      store.dispatch(setMensagens(mensagens));
      store.dispatch(setLoadingMensagens(false));
    });

    socket.on("nova_mensagem", (mensagem: IMensagem) => {
      store.dispatch(addUltimaMensagem(mensagem));
      const chatAtual = store.getState().chat.chatAtual;
      if (chatAtual.chat.id === mensagem.chat) {
        store.dispatch(addMensagem(mensagem));
        return;
      }
      toast.info(`💬 ${mensagem.usuarioNome}: ${mensagem.conteudo}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        icon: false,
        transition: Zoom,
      });
    });

    socket.on("conversa_iniciada", (dados: ChatAtual) => {
      store.dispatch(setChatAtual(dados));
      store.dispatch(setLoadingChatAtual(false));
    });

    socket.on("usuario_saiu", (dados) => {
      console.log("Saiu", dados.mensagem);
    });

    socket.on("usuarios_online", (usuarios) => {
      console.log("Online:", usuarios);
    });

    return socket;
  }
}

const enviarMensagem = (conteudo: string) => {
  if (socket?.connected) {
    socket.emit("enviar_mensagem", { conteudo });
  } else {
    console.error("Socket não está conectado!");
  }
};

const desconectarSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export const getSocket = () => socket;

export { registraSocket, enviarMensagem, desconectarSocket };
