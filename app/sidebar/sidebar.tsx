import {
  useQuery,
  QueryClient,
  QueryClientProvider,
  useQueryClient,
} from "@tanstack/react-query";
import { getTimeAgo } from "../common/timeAgo";
import { apiURL } from "../common/consts";

type ChatListElement = {
  id: number;
  title: string;
  updated_at: string;
  message_ids: number[];
};

function Chats(resolvedChats: any) {
  if (resolvedChats == null && resolvedChats.resolvedChats.length === 0) {
    return <b>No chats available</b>;
  }

  let chats: ChatListElement[] = resolvedChats.resolvedChats;

  return (
    <div className="list-group">
      {chats.map((chat) => (
        <a
          key={"chat_label_" + chat.id}
          href={`/chat/${chat.id}`}
          className="list-group-item list-group-item-action"
        >
          <div className="d-flex w-100 justify-content-between">
            <h6 className="mb-1">{chat.title}</h6>
            <small>{getTimeAgo(chat.updated_at)}</small>
          </div>
        </a>
      ))}
    </div>
  );
}

// TODO: Consider moving this to a separate component
function RenderError({ fetchError }: { fetchError: any }) {
  console.log("Error fetching chats:", fetchError.message);
  return <div className="alert alert-danger">Error: {fetchError.message}</div>;
}

export function SidebarComponent() {
  const { status, data, error, isFetching } = useQuery({
    queryKey: ["chats"],
    queryFn: async (): Promise<Array<ChatListElement>> => {
      const response = await fetch(apiURL + "/chats");
      return await response.json();
    },
  });

  return (
    <div className="col-md-3 col-12 border-end p-0">
      <div className="contacts-list p-3">
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search chats"
          />
        </div>

        {isFetching ? (
          "Loading..."
        ) : error ? (
          <RenderError fetchError={error} />
        ) : data ? (
          <Chats resolvedChats={data} />
        ) : (
          <b>No chats found</b>
        )}
      </div>
    </div>
  );
}
