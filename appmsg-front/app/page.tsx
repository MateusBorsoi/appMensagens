import ChatHeader from "@/components/chat/ChatHeader";
import { Card } from "@/components/ui/card";

export default function Home() {
  return (
    <main className="w-full h-screen flex items-center justify-center">
      <Card className="flex flex-col w-full max-w-10/12 h-5/6 rounded-4xl bg-background overflow-hidden shadow-xl p-0">
        <ChatHeader />
      </Card>
    </main>
  );
}
