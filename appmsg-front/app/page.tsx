import Chat from "@/components/chat/Chat";
import HeaderContainer from "@/components/chat/HeaderContainer";
import { Card } from "@/components/ui/card";

export default function Home() {
  return (
    <main className="w-full h-screen flex items-center justify-center">
      <Card className="relative flex flex-col w-full max-w-[90%] h-5/6 rounded-4xl bg-background shadow-xl overflow-hidden p-0 gap-0">
        <HeaderContainer />
        <div className="flex flex-1">
          <div className="w-1/4 border-r-2"></div>
          <div className="w-3/4 bg-secondary h-full">
            <Chat />
          </div>
        </div>
      </Card>
    </main>
  );
}
