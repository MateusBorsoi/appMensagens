import { Request, Response } from "express";
import Usuario, { IUsuarioDoc } from "../models/Usuario.js";
import mongoose from "mongoose";
import { JwtPayload } from "jsonwebtoken";
import Chat from "../models/Chat.js";
import { IUsuarioDocument } from "../types/IUsuario.js";

export const cadastrar = async (req: Request, res: Response) => {
  try {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).json({
        erro: "Nome, email e senha são obrigatórios",
      });
    }

    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({
        erro: "Email já cadastrado",
      });
    }

    const usuario = new Usuario({ nome, email, senha });
    await usuario.save();

    return res.status(201).json({
      mensagem: "Usuário cadastrado com sucesso",
      usuario: {
        id: usuario._id,
        nome: usuario.nome,
        email: usuario.email,
        dataCriacao: usuario.dataCriacao,
      },
    });
  } catch (erro) {
    if (!req.body) {
      return res.status(500).json({
        erro: "Erro ao cadastrar usuário",
        detalhes: "É necessário informar os dados de cadastro",
      });
    }
    return res.status(500).json({
      erro: "Erro ao cadastrar usuário",
      detalhes: erro instanceof Error ? erro.message : "Erro desconhecido",
    });
  }
};

export const listar = async (req: Request, res: Response) => {
  try {
    const usuarios = await Usuario.find().select("-senha");
    return res.json(usuarios);
  } catch (erro) {
    return res.status(500).json({
      erro: "Erro ao listar usuários",
      detalhes: erro instanceof Error ? erro.message : "Erro desconhecido",
    });
  }
};

export const buscarPorId = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ erro: "Usuário não encontrado" });
  }
  try {
    const usuario = await Usuario.findById(req.params.id).select("-senha");

    if (!usuario) {
      return res.status(404).json({ erro: "Usuário não encontrado" });
    }
    return res.json(usuario);
  } catch (erro) {
    return res.status(500).json({
      erro: "Erro ao buscar usuário",
      detalhes: erro instanceof Error ? erro.message : "Erro desconhecido",
    });
  }
};

export const atualizar = async (req: Request, res: Response): Promise<void> => {
  try {
    const { nome, email } = req.body;
    const atualizacoes: Partial<{ nome: string; email: string }> = {};

    if (nome) atualizacoes.nome = nome;
    if (email) atualizacoes.email = email;

    const usuario = await Usuario.findByIdAndUpdate(
      req.params.id,
      atualizacoes,
      { new: true, runValidators: true }
    ).select("-senha");

    if (!usuario) {
      res.status(404).json({ erro: "Usuário não encontrado" });
      return;
    }

    res.json({
      mensagem: "Usuário atualizado com sucesso",
      usuario,
    });
  } catch (erro) {
    res.status(500).json({
      erro: "Erro ao atualizar usuário",
      detalhes: erro instanceof Error ? erro.message : "Erro desconhecido",
    });
  }
};

export const deletar = async (req: Request, res: Response): Promise<void> => {
  try {
    const usuario = await Usuario.findByIdAndDelete(req.params.id);

    if (!usuario) {
      res.status(404).json({ erro: "Usuário não encontrado" });
      return;
    }

    res.json({ mensagem: "Usuário deletado com sucesso" });
  } catch (erro) {
    res.status(500).json({
      erro: "Erro ao deletar usuário",
      detalhes: erro instanceof Error ? erro.message : "Erro desconhecido",
    });
  }
};

export const listarChats = async (req: Request, res: Response) => {
  try {
    const { id } = req.user as JwtPayload;

    if (!id) {
      return res.status(401).json({ erro: "Usuário não autenticado" });
    }

    // ✅ Buscar todos os usuários (exceto o logado)
    const todosUsuarios = await Usuario.find({
      _id: { $ne: id },
    }).select("_id nome email dataCriacao");

    const chats = await Chat.find({
      participantes: id,
    });

    const chatsPorUsuario = new Map();
    chats.forEach((chat) => {
      const outroParticipante = chat.participantes.find((p) => p !== id);
      if (outroParticipante) {
        chatsPorUsuario.set(outroParticipante, chat);
      }
    });

    const listaCompleta = todosUsuarios.map((usuario) => {
      const chat = chatsPorUsuario.get(usuario._id.toString());

      return {
        chatId: chat?._id || null,
        id: usuario._id,
        nome: usuario.nome,
        email: usuario.email,
        dataCriacao: usuario.dataCriacao,
        tipo: chat?.tipo || null,
        ultimaMensagem: chat?.ultimaMensagem || null,
        temConversa: !!chat,
        _dataOrdenacao: chat?.ultimaMensagem?.dataEnvio || new Date(0),
      };
    });

    listaCompleta.sort((a, b) => {
      if (a.ultimaMensagem && !b.ultimaMensagem) return -1;
      if (!a.ultimaMensagem && b.ultimaMensagem) return 1;

      return b._dataOrdenacao.getTime() - a._dataOrdenacao.getTime();
    });

    const resultado = listaCompleta.map(({ _dataOrdenacao, ...item }) => item);

    return res.json({ chats: resultado });
  } catch (erro) {
    return res.status(500).json({
      erro: "Erro ao listar chats",
      detalhes: erro instanceof Error ? erro.message : "Erro desconhecido",
    });
  }
};
