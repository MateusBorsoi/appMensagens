import { Socket } from "socket.io";

export interface JwtPayload {
  id: string;
  email: string;
}

export interface SocketComUsuario extends Socket {
  usuario?: JwtPayload;
}
