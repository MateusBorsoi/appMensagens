import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config/env";
import { JwtPayload, SocketComUsuario } from "../types/ISocket";

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Token não informado" });

  try {
    const decoded = jwt.verify(token, config.jwt.secret!) as {
      id: string;
      email: string;
    };

    (req as any).user = decoded;
    next();
  } catch {
    return res.status(403).json({ message: "Token inválido ou expirado" });
  }
};

export const socketAuthMiddleware = (
  socket: SocketComUsuario,
  next: (err?: Error) => void
) => {
  try {
    const token =
      socket.handshake.auth.token ||
      socket.handshake.headers.authorization?.split(" ")[1];

    if (!token) {
      return next(new Error("Token não fornecido"));
    }
    const decoded = jwt.verify(token, config.jwt.secret) as JwtPayload;
    socket.usuario = decoded;
    next();
  } catch (error) {
    next(new Error("Token inválido ou expirado"));
  }
};
