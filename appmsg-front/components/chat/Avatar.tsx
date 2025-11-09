import { getInitials } from "@/src/utils/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const AvatarChat = ({ image, nome }: { nome: string; image: string }) => {
  return (
    <Avatar className="h-12 w-12">
      <AvatarImage src="https://picsum.photos/200/300" alt="userChat" />
      <AvatarFallback>{getInitials(nome)}</AvatarFallback>
    </Avatar>
  );
};

export default AvatarChat;
