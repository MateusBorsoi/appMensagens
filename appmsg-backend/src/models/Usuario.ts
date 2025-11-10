import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUsuarioDoc extends Document {
  _id: string;
  nome: string;
  email: string;
  senha: string;
  dataCriacao: Date;
}

const UsuarioSchema = new Schema<IUsuarioDoc>({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
  dataCriacao: { type: Date, default: Date.now },
});

UsuarioSchema.pre("save", async function (next) {
  if (!this.isModified("senha")) return next();
  const salt = await bcrypt.genSalt(10);
  this.senha = await bcrypt.hash(this.senha, salt);
  next();
});

export default mongoose.model<IUsuarioDoc>("Usuario", UsuarioSchema);
