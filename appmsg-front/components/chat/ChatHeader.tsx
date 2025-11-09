import { Dot } from "lucide-react";
import { TypographyP } from "../typography/TypographyP";
import AvatarChat from "./Avatar";

const ChatHeader = ({
  image,
  nome,
  status,
}: {
  nome: string;
  image: string;
  status: string;
}) => {
  return (
    <header className="h-[10%] bg-background flex flex-row items-center">
      <div className="py-2 px-4 flex items-center">
        <AvatarChat image="" nome="teste" />
        <div className="flex flex-col px-4">
          <TypographyP text={nome} />
          <div className="flex flex-row-reverse justify-start items-center">
            <TypographyP text={status} className="m-0 text-ring" />
            {status === "online" ? (
              <Dot className="text-green-400 -mr-5 -ml-6 -my-6" size={60} />
            ) : (
              <Dot size={60} className="m-0" />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default ChatHeader;
