import mongoose, { Schema } from "mongoose";
import { IChatDocument } from "../types/IChat";

const chatSchema = new Schema<IChatDocument>({
  participantes: [
    {
      type: String,
      required: true,
    },
  ],
  tipo: {
    type: String,
    enum: ["individual", "grupo"],
    default: "individual",
  },
  nome: {
    type: String,
    required: false,
  },
  dataCriacao: {
    type: Date,
    default: Date.now,
  },
  ultimaMensagem: {
    conteudo: String,
    dataEnvio: Date,
    usuarioId: String,
  },
});

chatSchema.index({ participantes: 1 });

export default mongoose.model<IChatDocument>("Chat", chatSchema);
