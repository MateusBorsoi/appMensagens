import { ChatAtual } from "@/src/types/IChat";
import ChatHeader from "./ChatHeader";
import { ChatInput } from "./ChatInput";
import MessageBubble from "./MessageBubble";
import { useEffect, useRef } from "react";
import { TypographyH1 } from "../typography/TypographyH1";
import { Spinner } from "../ui/spinner";

type Props = {
  chatAtual: ChatAtual;
  onSend: (mensagem: string) => void;
  usuarioLogadoId: string;
  isLoadingMensagens: boolean;
};

const Chat = ({
  chatAtual,
  onSend,
  usuarioLogadoId,
  isLoadingMensagens,
}: Props) => {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatAtual?.mensagens?.length]);

  return (
    <div className="flex flex-col h-full min-h-0 bg-muted">
      {chatAtual.chat.id ? (
        <>
          <ChatHeader
            image=""
            nome={chatAtual.usuarioDestino.nome}
            status={chatAtual.usuarioDestino.status}
          />

          <div className="flex-1 min-h-0 overflow-y-auto px-4 py-3 space-y-2">
            {isLoadingMensagens ? (
              <div className="h-full w-full flex items-center justify-center">
                <Spinner className="size-20 text-typography/50" />
              </div>
            ) : (
              <>
                {chatAtual.mensagens?.map((msg) => (
                  <MessageBubble
                    key={msg._id}
                    text={msg.conteudo}
                    isMine={usuarioLogadoId === msg.usuarioId}
                    time={msg.dataEnvio}
                  />
                ))}
                <div ref={bottomRef} />
              </>
            )}
          </div>

          <div className="p-4 border-t bg-background">
            <ChatInput onSend={onSend} chat={chatAtual.chat.id} />
          </div>
        </>
      ) : (
        <div className="h-full w-full flex justify-center items-center">
          <TypographyH1
            text="Selecione uma conversa"
            className="text-[25px] font-semibold text-typography"
          />
        </div>
      )}
    </div>
  );
};

export default Chat;
