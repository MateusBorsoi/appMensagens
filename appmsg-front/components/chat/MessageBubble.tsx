import { cn } from "@/lib/utils";
import { formatarDataMensagem } from "@/src/utils/utils";
import { memo } from "react";

type Props = {
  text: string;
  isMine?: boolean;
  time?: string;
};

const MessageBubble = ({ text, isMine = false, time }: Props) => {
  return (
    <div
      className={cn(
        "flex w-full mb-2",
        isMine ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "max-w-[75%] rounded-2xl px-4 py-2 shadow-md text-sm relative",
          isMine
            ? "bg-blue-600 text-white rounded-tr-none"
            : "bg-gray-200 text-gray-900 rounded-tl-none"
        )}
      >
        <p className="break-words pr-8 pb-4">{text}</p>{" "}
        {time && (
          <span
            className={cn(
              "text-[0.65rem] absolute bottom-1 right-2 opacity-70",
              isMine ? "text-blue-100" : "text-gray-600"
            )}
          >
            {formatarDataMensagem(time)}
          </span>
        )}
      </div>
    </div>
  );
};

export default memo(MessageBubble);
