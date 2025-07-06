export function Chat() {
  return (
    <div className="col-md-9 col-12 p-0 d-flex flex-column">
      <div className="chat-messages p-3">
        <div className="message mb-3 align-self-start">
          <div className="bg-light rounded p-2">
            <strong>John Doe:</strong> Hey, how are you?
          </div>
          <small className="text-muted">3 mins ago</small>
        </div>
        <div className="message mb-3 align-self-end">
          <div className="bg-primary text-white rounded p-2">
            I'm good, thanks! How about you?
          </div>
          <small className="text-muted">2 mins ago</small>
        </div>
        {/* // Add more messages here */}
      </div>
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
