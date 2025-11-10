import { Socket } from "socket.io";

export interface IUsuario {
  nome: string;
  email: string;
  senha: string;
  dataCriacao: Date;
}

export interface IUsuarioDocument extends IUsuario, Document {
  _id: string;
}

export enum StatusUsuario {
  ONLINE = "ONLINE",
  OFFILINE = "OFFILINE",
  AUSENTE = "AUSENTE",
}
