import { memo } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import UserAvatar from "./UserAvatar";
import { LogOut, User as UserIcon } from "lucide-react";
import { User } from "@/src/types/ISession";

type Props = {
  onLogout: () => void;
  user: User;
};

const DropDownUser = ({ user, onLogout }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="hover:cursor-pointer">
        <UserAvatar user={user} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {/* <DropdownMenuItem className="hover:cursor-pointer flex justify-between">
          Minha conta <UserIcon />
        </DropdownMenuItem>
        <DropdownMenuSeparator /> */}
        <DropdownMenuItem
          onClick={onLogout}
          variant="destructive"
          className="hover:cursor-pointer flex justify-between"
        >
          Sair <LogOut />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default memo(DropDownUser);
