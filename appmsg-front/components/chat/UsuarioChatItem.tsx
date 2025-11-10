import { UsuariosChat } from "@/src/types/IChat";
import AvatarChat from "./Avatar";
import { TypographyP } from "../typography/TypographyP";
import { TypographySmall } from "../typography/TypographySmall";
import { capitalize } from "lodash";

interface Props {
  usuarioChat: UsuariosChat;
  inciarConversa: (usuarioDestino: string) => void;
  isChatAtual: boolean;
  isMine: boolean;
}

const UsuarioChatItem = ({
  usuarioChat,
  inciarConversa,
  isChatAtual,
  isMine,
}: Props) => {
  return (
    <div
      className={`flex w-full rounded-xl p-2 ${
        !isChatAtual ? "hover:cursor-pointer bg-ring/10" : "bg-chart-3/30"
      } mb-3`}
      onClick={() => !isChatAtual && inciarConversa(usuarioChat.id)}
    >
      <AvatarChat image="" nome={usuarioChat.nome} />
      <div className="flex flex-col ml-2 my-1">
        <TypographyP
          text={capitalize(usuarioChat.nome)}
          className="text-typography font-semibold"
        />
        {usuarioChat.ultimaMensagem?.conteudo && (
          <TypographySmall
            text={
              isMine
                ? `Você enviou: ${usuarioChat.ultimaMensagem?.conteudo}`
                : usuarioChat.ultimaMensagem?.conteudo
            }
            className="text-ring"
          />
        )}
      </div>
    </div>
  );
};

export default UsuarioChatItem;
