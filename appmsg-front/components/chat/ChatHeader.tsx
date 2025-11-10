import { TypographyP } from "../typography/TypographyP";
import AvatarChat from "./Avatar";
import { capitalize } from "lodash";

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
    <header className="flex items-center gap-3 px-4 py-3 border-b border-gray-200 bg-background">
      <AvatarChat image={image} nome={nome} />
      <div>
        <TypographyP text={nome} />
        <div className="flex items-center ">
          <div
            className={`h-2 w-2 ml-0.5 mr-1 rounded-full
              ${status === "online" ? "bg-green-500 gap-0" : "bg-gray-400"}`}
          />
          <TypographyP
            text={capitalize(status)}
            className="text-xs text-ring leading-none"
          />
        </div>
      </div>
    </header>
  );
};

export default ChatHeader;
