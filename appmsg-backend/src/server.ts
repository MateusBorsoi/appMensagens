import express from "express";
import mongoose from "mongoose";

import usuarioRoutes from "./routes/usuarioRoutes";
import authRoutes from "./routes/authRoutes";
import { config } from "./config/env";
import passport from "./config/passport";

const app = express();
app.use(express.json());
app.use(passport.initialize());

mongoose
  .connect(config.database.url)
  .then(() => console.log("Conectado ao MongoDB"))
  .catch((err) => console.error("Erro ao conectar:", err));

app.use("/auth", authRoutes);
app.use("/usuarios", usuarioRoutes);

const PORT = config.port;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
