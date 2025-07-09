import {
  useQuery,
  QueryClient,
  QueryClientProvider,
  useQueryClient,
} from "@tanstack/react-query";

let queryClient = new QueryClient();

type ChatListElement = {
  id: number;
  title: string;
  updated_at: string;
  message_ids: number[];
};

function Chats(resolvedChats: ChatListElement[]) {
  if (resolvedChats == null) {
    return <b>No chats available</b>;
  }

  console.log("Resolved Chats: ", resolvedChats);

  return (
    <div className="list-group">
      {resolvedChats.map((chat) => (
        <a
          key={"chat_label_" + chat.id}
          href={`/chat/${chat.id}`}
          className="list-group-item list-group-item-action"
        >
          <div className="d-flex w-100 justify-content-between">
            <h5 className="mb-1">
              {queryClient.getQueryData(["chat", chat.title])}
            </h5>
            <small>{chat.updated_at}</small>
          </div>
        </a>
      ))}
    </div>
  );
}

function getChats() {
  const apiURL = "http://localhost:3000";

  return useQuery({
    queryKey: ["chats"],
    queryFn: async (): Promise<Array<ChatListElement>> => {
      const response = await fetch(apiURL + "/chats");
      return await response.json();
    },
  });
}

// DEV
export function RenderError(fetchError: any) {
  console.log("Error fetching chats:", fetchError.message);
  return <div className="alert alert-danger">Error: {fetchError.message}</div>;
}

export function SidebarComponent() {
  const { status, data, error, isFetching } = getChats();

  if (error != null) {
    console.log("Error fetching chats:", error);
  }

  return (
    <div className="col-md-3 col-12 border-end p-0">
      <div className="contacts-list p-3">
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search contacts..."
          />
        </div>

        <QueryClientProvider client={queryClient}>
          {isFetching ? (
            "Loading..."
          ) : error ? (
            <RenderError fetchError={error} />
          ) : (
            <Chats resolvedChats={data} />
          )}
        </QueryClientProvider>
      </div>
    </div>
  );
}
