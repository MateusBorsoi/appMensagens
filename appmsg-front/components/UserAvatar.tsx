import { memo } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { getInitials } from "@/src/utils/utils";

const UserAvatar = ({ user }: { user: User }) => {
  return (
    <Avatar className="h-15 w-15">
      <AvatarImage src="https://picsum.photos/200/300" alt="@shadcn" />
      <AvatarFallback>{getInitials(user.nome)}</AvatarFallback>
    </Avatar>
  );
};
export default memo(UserAvatar);
