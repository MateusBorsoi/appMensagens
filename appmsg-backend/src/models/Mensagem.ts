import mongoose, { Schema } from "mongoose";
import { IMensagemDocument } from "../types/IMensagem";

const mensagemSchema = new Schema<IMensagemDocument>({
  usuarioId: {
    type: String,
    required: true,
  },
  usuarioNome: {
    type: String,
    required: true,
  },
  chat: {
    type: String,
    required: true,
    index: true,
  },
  conteudo: {
    type: String,
    required: true,
    trim: true,
  },
  dataEnvio: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model<IMensagemDocument>("Mensagem", mensagemSchema);
