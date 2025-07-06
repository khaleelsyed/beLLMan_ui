import { Chat } from "../chat/chat";
import { Sidebar } from "../sidebar/sidebar";

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
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
}
