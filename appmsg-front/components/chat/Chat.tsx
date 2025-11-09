import ChatHeader from "./ChatHeader";
import { ChatInput } from "./ChatInput";

const Chat = () => {
  return (
    <div className="flex flex-col justify-between h-full">
      <ChatHeader image="" nome="Teste" status="online"/>
      <div className="p-4">
        <ChatInput />
      </div>
    </div>
  );
};

export default Chat;
