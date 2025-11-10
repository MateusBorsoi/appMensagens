export interface IChat {
  participantes: string[];
  tipo: "individual" | "grupo";
  nome?: string;
  dataCriacao: Date;
  ultimaMensagem?: {
    conteudo: string;
    dataEnvio: Date;
    usuarioId: string;
  };
}
export interface IChatDocument extends IChat, Document {
  _id: string;
}
