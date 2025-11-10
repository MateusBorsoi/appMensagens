"use client";

import Chat from "@/components/chat/Chat";
import HeaderContainer from "@/components/chat/HeaderContainer";
import UsuarioChatItem from "@/components/chat/UsuarioChatItem";
import { Card } from "@/components/ui/card";
import useAuth from "@/src/hooks/useAuth";
import useChat from "@/src/hooks/useChat";
import useSession from "@/src/hooks/useSession";

export default function Home() {
  const { session } = useSession();
  const { logoutUser } = useAuth();
  const {
    usuariosChat,
    isloading,
    inciarConversa,
    chatAtual,
    isLoadingChat,
    isLoadingMensagens,
    onEnviarMsg,
  } = useChat();

  return (
    <main className="w-full h-screen flex items-center justify-center">
      <Card className="relative flex flex-col w-full max-w-[90%] h-5/6 rounded-4xl bg-background shadow-xl overflow-hidden p-0 gap-0">
        <HeaderContainer logoutUser={logoutUser} user={session.user} />

        <div className="flex flex-1 min-h-0">
          <div className="w-1/4 border-r-2 p-4 overflow-y-auto">
            {!isloading &&
              usuariosChat.map((uc) => (
                <UsuarioChatItem
                  usuarioChat={uc}
                  isMine={uc.ultimaMensagem?.usuarioId === session.user.id}
                  key={uc.id}
                  isChatAtual={chatAtual.usuarioDestino.id === uc.id}
                  inciarConversa={inciarConversa}
                />
              ))}
          </div>
          <div className="w-3/4 flex flex-col bg-secondary h-full">
            {chatAtual.chat ? (
              <Chat
                isLoadingMensagens={isLoadingMensagens}
                chatAtual={chatAtual}
                onSend={onEnviarMsg}
                usuarioLogadoId={session.user.id}
              />
            ) : (
              <div className="flex-1 flex items-center justify-center text-typography">
                Selecione uma conversa
              </div>
            )}
          </div>
        </div>
      </Card>
    </main>
  );
}
