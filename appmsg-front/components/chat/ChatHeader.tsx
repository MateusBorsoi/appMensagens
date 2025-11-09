"use client";

import useSession from "@/src/hooks/useSession";
import DropDownUser from "../DropDownUser";
import useAuth from "@/src/hooks/useAuth";
import { TypographyP } from "../typography/TypographyP";
import { TypographySmall } from "../typography/TypographySmall";
import { TypographyH1 } from "../typography/TypographyH1";

const ChatHeader = () => {
  const { session } = useSession();
  const { logoutUser } = useAuth();

  return (
    <header className="h-[10%] border-b-2">
      <div className="flex flex-row-reverse w-full h-full items-center justify-between pr-4">
        <div className="flex items-center justify-center h-full">
          <div className="flex flex-col justify-center mr-2 leading-tight text-right">
            <TypographyP text={session.user.nome} className="text-typography font-semibold" />
            <TypographySmall text={session.user.email} className="text-ring" />
          </div>
          <DropDownUser user={session.user} onLogout={logoutUser} />
        </div>
        <div className="flex items-start ml-4">
          <TypographyH1 text="Mensagens" className="text-[20px] font-bold text-typography"/>
        </div>
      </div>
    </header>
  );
};

export default ChatHeader;
