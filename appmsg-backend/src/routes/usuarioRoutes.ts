import { Router } from "express";
import * as usuarioController from "../controllers/usuarioController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";

const userRouter = Router();

userRouter.post("/", usuarioController.cadastrar);
userRouter.get("/", authenticateToken, usuarioController.listar);
userRouter.get("/:id", authenticateToken, usuarioController.buscarPorId);
userRouter.put("/:id", authenticateToken, usuarioController.atualizar);
userRouter.delete("/:id", authenticateToken, usuarioController.deletar);

export default userRouter;
