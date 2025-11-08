import { NextFunction, Request, Response } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import { IUsuarioDoc } from "../models/Usuario";
import { config } from "../config/env";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  passport.authenticate(
    "local",
    { session: false },
    (err: any, user: IUsuarioDoc, info?: { message?: string }) => {
      if (err || !user) {
        return res
          .status(400)
          .json({ message: info?.message || "Falha no login" });
      }

      const payload = { id: user.id, email: user.email };
      const token = jwt.sign(payload, config.jwt.secret, {
        expiresIn: "1h",
      });

      res.json({
        token,
        user: { id: user.id, nome: user.nome, email: user.email },
      });
    }
  )(req, res, next);
};
