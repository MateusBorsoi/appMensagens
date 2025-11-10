import { Server } from "socket.io";
import Mensagem from "../models/Mensagem";
import { UsuarioConectado } from "../types/IMensagem";
import { SocketComUsuario } from "../types/ISocket";
import Usuario from "../models/Usuario";
import Chat from "../models/Chat";

const usuariosConectados = new Map<string, UsuarioConectado>();

const verificarUsuarioOnline = (usuarioId: string): boolean => {
  return Array.from(usuariosConectados.values()).some(
    (u) => u.id === usuarioId
  );
};

export const configurarChat = (io: Server) => {
  io.on("connection", (socket: SocketComUsuario) => {
    const usuarioAutenticado = socket.usuario;

    if (!usuarioAutenticado) {
      socket.disconnect();
      return;
    }

    socket.on("iniciar_conversa", async (dados: { usuarioDestino: string }) => {
      try {
        const { usuarioDestino } = dados;
        const meuId = usuarioAutenticado.id;

        const complementoUsuario = await Usuario.findById(meuId).select(
          "-senha"
        );
        if (!complementoUsuario) {
          socket.emit("erro", { mensagem: "Usuário não encontrado" });
          return;
        }

        let chat = await Chat.findOne({
          tipo: "individual",
          participantes: { $all: [meuId, usuarioDestino], $size: 2 },
        });

        if (!chat) {
          chat = new Chat({
            participantes: [meuId, usuarioDestino],
            tipo: "individual",
          });
          await chat.save();
        }

        const chatId = chat._id.toString();

        usuariosConectados.set(socket.id, {
          id: meuId,
          nome: complementoUsuario.nome,
          chat: chatId,
          socketId: socket.id,
        });

        socket.join(chatId);

        const historico = await Mensagem.find({ chat: chatId })
          .sort({ dataEnvio: -1 })
          .limit(50);

        socket.emit("historico_mensagens", historico.reverse());

        const usuarioDestinoData = await Usuario.findById(
          usuarioDestino
        ).select("-senha");

        const destinatarioOnline = verificarUsuarioOnline(usuarioDestino);

        socket.emit("conversa_iniciada", {
          chatId: chatId,
          chat: {
            id: chat._id,
            participantes: chat.participantes,
            tipo: chat.tipo,
            dataCriacao: chat.dataCriacao,
          },
          meusDados: {
            id: complementoUsuario._id,
            nome: complementoUsuario.nome,
            email: complementoUsuario.email,
          },
          usuarioDestino: usuarioDestinoData
            ? {
                id: usuarioDestinoData._id,
                nome: usuarioDestinoData.nome,
                email: usuarioDestinoData.email,
                status: destinatarioOnline ? "online" : "offiline",
              }
            : null,
        });
      } catch (erro) {
        console.error("Erro ao iniciar conversa:", erro);
        socket.emit("erro", { mensagem: "Erro ao iniciar conversa" });
      }
    });

    socket.on("enviar_mensagem", async (mensagem: { conteudo: string }) => {
      const usuario = usuariosConectados.get(socket.id);

      if (!usuario) {
        socket.emit("erro", {
          mensagem: "Usuário não identificado. Inicie a conversa primeiro.",
        });
        return;
      }
      try {
        const usuario = usuariosConectados.get(socket.id);

        if (!usuario) {
          socket.emit("erro", {
            mensagem: "Usuário não identificado. Inicie a conversa primeiro.",
          });
          return;
        }

        const novaMensagem = new Mensagem({
          chat: usuario.chat,
          usuarioId: usuario.id,
          usuarioNome: usuario.nome,
          conteudo: mensagem.conteudo,
        });

        await novaMensagem.save();

        const usuarioDestinoId = await Chat.findByIdAndUpdate(usuario.chat, {
          ultimaMensagem: {
            conteudo: mensagem.conteudo,
            dataEnvio: novaMensagem.dataEnvio,
            usuarioId: usuario.id,
          },
        });

        io.to(usuario.chat).emit("nova_mensagem", {
          _id: novaMensagem._id,
          chat: usuario.chat,
          usuarioId: usuario.id,
          usuarioNome: usuario.nome,
          conteudo: mensagem.conteudo,
          dataEnvio: novaMensagem.dataEnvio,
          participantes: usuarioDestinoId?.participantes,
        });
      } catch (erro) {
        console.error("Erro ao enviar mensagem:", erro);
        socket.emit("erro", { mensagem: "Erro ao enviar mensagem" });
      }
    });

    socket.on("digitando", () => {
      const usuario = usuariosConectados.get(socket.id);
      if (usuario) {
        socket.to(usuario.chat).emit("usuario_digitando", {
          usuarioNome: usuario.nome,
        });
      }
    });

    socket.on("parou_digitar", () => {
      const usuario = usuariosConectados.get(socket.id);
      if (usuario) {
        socket.to(usuario.chat).emit("usuario_parou_digitar", {
          usuarioNome: usuario.nome,
        });
      }
    });

    socket.on("disconnect", () => {
      const usuario = usuariosConectados.get(socket.id);

      if (usuario) {
        socket.to(usuario.chat).emit("usuario_saiu", {
          usuarioNome: usuario.nome,
          mensagem: `${usuario.nome} saiu do chat`,
        });

        usuariosConectados.delete(socket.id);
        const usuariosChat = Array.from(usuariosConectados.values()).filter(
          (u) => u.chat === usuario.chat
        );
        io.to(usuario.chat).emit("usuarios_online", usuariosChat);
      }
    });
  });
};
