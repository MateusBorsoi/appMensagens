import { getInitials } from "@/src/utils/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getRandomHexColor } from "@/lib/utils";
import { memo } from "react";

const AvatarChat = ({ image, nome }: { nome: string; image: string }) => {
  const cor = getRandomHexColor();
  return (
    <Avatar className="h-12 w-12">
      <AvatarImage
        src={`https://ui-avatars.com/api/?background=${cor.replace(
          "#",
          ""
        )}&color=fff&name=${nome}`}
        alt="userChat"
      />
      <AvatarFallback>{getInitials(nome)}</AvatarFallback>
    </Avatar>
  );
};

export default memo(AvatarChat);
