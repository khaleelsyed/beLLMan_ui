const apiURL = "http://localhost:3000";

export function Sidebar() {
  var chats = fetch(apiURL + "/chats")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });

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
        <div className="list-group">
          <a href="#" className="list-group-item list-group-item-action active">
            <div className="d-flex w-100 justify-content-between">
              <h5 className="mb-1">John Doe</h5>
              <small>3 mins ago</small>
            </div>
            <p className="mb-1">Hey, how are you?</p>
          </a>
          <a href="#" className="list-group-item list-group-item-action">
            <div className="d-flex w-100 justify-content-between">
              <h5 className="mb-1">Jane Smith</h5>
              <small>1 hour ago</small>
            </div>
            <p className="mb-1">Are we still on for lunch?</p>
          </a>
          {/* Add more contacts here */}
        </div>
      </div>
    </div>
  );
}
