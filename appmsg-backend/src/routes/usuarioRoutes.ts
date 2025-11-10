import { Router } from "express";
import * as usuarioController from "../controllers/usuarioController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";

const userRouter = Router();

userRouter.post("/", usuarioController.cadastrar);
userRouter.get("/", authenticateToken, usuarioController.listar);
userRouter.get("/buscar/:id", authenticateToken, usuarioController.buscarPorId);
userRouter.put("/editar/:id", authenticateToken, usuarioController.atualizar);
userRouter.delete("/remover/:id", authenticateToken, usuarioController.deletar);
userRouter.get("/chats", authenticateToken, usuarioController.listarChats);

export default userRouter;
