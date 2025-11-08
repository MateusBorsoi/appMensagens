import { Request, Response } from "express";
import Usuario from "../models/Usuario.js";
import mongoose from "mongoose";

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
