import {
  useQuery,
  QueryClient,
  QueryClientProvider,
  useQueryClient,
} from "@tanstack/react-query";
import { getTimeAgo } from "../common/timeAgo";
import { apiURL } from "../common/consts";

type Message = {
  id: number;
  role: string;
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

function Messages(resolvedMessages: any) {
  if (
    resolvedMessages == null &&
    resolvedMessages.resolvedMessages.length === 0
  ) {
    return <b>No messages have been sent yet</b>;
  }

  let messages: Message[] = resolvedMessages.resolvedMessages;

  console.error(messages);

  return (
    <div className="chat-messages p-3">
      {messages.map((message) => (
        <div
          key={"message_" + message.id}
          className={`message mb-3 ${
            message.role === "user" ? "align-self-end" : "align-self-start"
          }`}
        >
          <div
            className={`bg-${
              message.role === "user" ? "primary text-white" : "light"
            } rounded p-2`}
          >
            <strong>{message.role === "user" ? "You" : "Assistant"}:</strong>{" "}
            {message.content}
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
    queryKey: ["chats"],
    queryFn: async (): Promise<Array<ChatElement>> => {
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
        <Messages resolvedMessages={data} />
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
