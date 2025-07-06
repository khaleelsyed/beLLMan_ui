import React from "react";
import { Await, useAsyncValue, useLoaderData } from "react-router";
import * as Spinners from "react-spinners";

const apiURL = "http://localhost:3000";

type ChatListElement = {
  id: number;
  title: string;
  updated_at: string;
  message_ids: number[];
};

export async function loader() {
  const chats = await fetch(apiURL + "/chats", { method: "get" }).then(
    (response) => response.json(),
  );
  return chats;
}

export function Chats() {
  const resolvedChats: ChatListElement[] = useAsyncValue();

  return (
    <div className="list-group">
      {resolvedChats.map((chat) => (
        <a
          key={"chat_label_" + chat.id}
          href={`/chat/${chat.id}`}
          className="list-group-item list-group-item-action"
        >
          <div className="d-flex w-100 justify-content-between">
            <h5 className="mb-1">{chat.title}</h5>
            <small>{chat.updated_at}</small>
          </div>
        </a>
      ))}
    </div>
  );
}

export function Sidebar() {
  const chatsPromise = useLoaderData();

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

        <React.Suspense fallback={<Spinners.BeatLoader />}>
          <Await
            resolve={chatsPromise}
            errorElement={<div>Could not load chats 😬</div>}
          >
            <Chats />
          </Await>
        </React.Suspense>
      </div>
    </div>
  );
}
