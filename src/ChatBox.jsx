export default function ChatBox({ getWebSocket, user, connected }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        getWebSocket().send(
          JSON.stringify({
            type: "message",
            user: user,
            text: e.target.message.value,
          })
        );
        document.querySelector("form").reset();
      }}
    >
      <input
        disabled={connected === false}
        type="text"
        id="message"
        placeholder="Type a message..."
        className="w-full px-4 py-2 rounded-md focus:outline-none"
        autoComplete="off"
      />
      <input type="submit" hidden />
    </form>
  );
}
