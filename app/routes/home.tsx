import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Chat } from "../chat/chat";
import { SidebarComponent } from "../sidebar/sidebar";

const queryClient = new QueryClient();

export function meta() {
  return [
    { title: "beLLMan" },
    { name: "description", content: "Welcome to beLLMan" },
  ];
}

export default function Home() {
  return (
    <div className="container-fluid chat-container">
      <div className="row h-100">
        <QueryClientProvider client={queryClient}>
          <SidebarComponent />
          <Chat />
        </QueryClientProvider>
      </div>
    </div>
  );
}
