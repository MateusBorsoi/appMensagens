import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { User } from "@/src/types/ISession";
import { getInitials } from "@/src/utils/utils";

const UserAvatar = ({ user }: { user: User }) => {
  if (!user) {
    return (
      <Avatar className="h-10 w-10">
        <AvatarFallback>?</AvatarFallback>
      </Avatar>
    );
  }

  return (
    <Avatar className="h-10 w-10">
      <AvatarImage src={"https://picsum.photos/200/300"} alt={user.nome} />
      <AvatarFallback>{getInitials(user.nome)}</AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
