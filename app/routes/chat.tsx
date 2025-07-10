import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { Route } from "./+types/chat";
import { SidebarComponent } from "../sidebar/sidebar";
import { ChatComponent } from "../chat/chat";

const queryClient = new QueryClient();

export default function ChatPage({ params }: Route.ComponentProps) {
  let chat_id: string | undefined = params.chatID;

  return (
    <div className="container-fluid chat-container">
      <div className="row h-100">
        <QueryClientProvider client={queryClient}>
          <SidebarComponent />
          <ChatComponent chatID={chat_id} />
        </QueryClientProvider>
      </div>
    </div>
  );
}
