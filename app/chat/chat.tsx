import { useQuery } from "@tanstack/react-query";
import { getTimeAgo } from "../common/timeAgo";
import { apiURL } from "../common/consts";

type Message = {
  id: number;
  role: number;
  content: string;
  sent: string;
};

type ChatElement = {
  id: number;
  title: string;
  updated_at: string;
  messages: Message[];
};

type ChatComponentProps = {
  chatID: string | undefined;
};

function getRoleName(role: number): string {
  switch (role) {
    case 0:
      return "System";
    case 1:
      return "Assistant";
    case 2:
      return "User";
    default:
      return "Unknown";
  }
}

function Messages({ resolvedChat }: { resolvedChat: ChatElement }) {
  if (!resolvedChat) {
    return <b>No messages have been sent yet</b>;
  }

  console.log("Resolved chat:", resolvedChat);

  // Assuming you want to show messages from the first chat element
  const messages: Message[] = resolvedChat.messages || [];

  return (
    <div className="chat-messages p-3">
      {messages.map((message) => (
        <div
          key={"message_" + message.id}
          className={`message mb-3 ${
            message.role === 2 ? "align-self-end" : "align-self-start"
          }`}
        >
          <div
            className={`bg-${
              message.role === 2 ? "primary text-white" : "light"
            } rounded p-2`}
          >
            <strong>{getRoleName(message.role)}:</strong>
            {" " + message.content}
          </div>
          <small className="text-muted">{getTimeAgo(message.sent)}</small>
        </div>
      ))}
    </div>
  );
}

// TODO: Consider moving this to a separate component
function RenderError({ fetchError }: { fetchError: any }) {
  console.log("Error fetching chats:", fetchError.message);
  return <div className="alert alert-danger">Error: {fetchError.message}</div>;
}

export function ChatComponent({ chatID: chatID }: ChatComponentProps) {
  const { status, data, error, isFetching } = useQuery({
    queryKey: ["chat"],
    queryFn: async (): Promise<ChatElement[]> => {
      const response = await fetch(apiURL + "/chat/" + chatID);
      return await response.json();
    },
  });


  return (
    <div className="col-md-9 col-12 p-0 d-flex flex-column">
      {isFetching ? (
        "Loading..."
      ) : error ? (
        <RenderError fetchError={error} />
      ) : data ? (
        <Messages resolvedChat={data} />
      ) : (
        <b>No chats found</b>
      )}
      <div className="message-input p-3">
        <form>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Type a message..."
            />
            <button className="btn btn-primary" type="submit">
              <i className="bi bi-send"></i> Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
