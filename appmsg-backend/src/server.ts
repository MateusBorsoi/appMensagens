import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import usuarioRoutes from "./routes/usuarioRoutes";
import authRoutes from "./routes/authRoutes";
import { config } from "./config/env";
import passport from "./config/passport";
import { createServer } from "http";
import { Server } from "socket.io";
import { configurarChat } from "./socket/chatSocket";
import { socketAuthMiddleware } from "./middlewares/authMiddleware";

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.use(socketAuthMiddleware);

app.use(cors());
app.use(express.json());
app.use(passport.initialize());

mongoose
  .connect(config.database.url)
  .then(() => console.log("Conectado ao MongoDB"))
  .catch((err) => console.error("Erro ao conectar:", err));

app.use("/auth", authRoutes);
app.use("/usuarios", usuarioRoutes);
configurarChat(io);

const PORT = config.port;
httpServer.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Socket rodando na porta ${PORT}`);
});
