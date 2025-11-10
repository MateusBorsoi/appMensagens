"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SendHorizonal } from "lucide-react";
import { useState } from "react";

export function ChatInput({
  onSend,
  chat,
}: {
  onSend: (msg: string) => void;
  chat: string;
}) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) return;
    onSend(message.trim());
    setMessage("");
  };

  return (
    <div className="flex items-center border rounded-full bg-background px-3 py-2 shadow-sm">
      <Input
        type="text"
        placeholder="Digite sua mensagem..."
        className="flex-1 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-sm"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
      />
      <Button
        size="icon"
        className="rounded-full ml-2 disabled:cursor-none hover:cursor-pointer"
        onClick={handleSend}
        disabled={!message.trim()}
      >
        <SendHorizonal className="h-4 w-4" />
      </Button>
    </div>
  );
}
