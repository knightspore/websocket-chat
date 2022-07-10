import * as React from "react";
import { useWebSocket } from "react-use-websocket/dist/lib/use-websocket";
import ChatBox from "./ChatBox";
import Feed from "./Feed";
import Layout from "./Layout";

const FEED_URL = "ws://192.168.0.104:8080";

function App() {
  const [messages, setMessages] = React.useState([]);
  const [connected, setConnected] = React.useState(false);
  const [user, setUser] = React.useState("");

  const handleConnected = () => {
    setConnected(true);
    getWebSocket().send(JSON.stringify({ type: "identify", user: user }));
  };

  const handleMessage = (data) => {
    setMessages((messages) => [...messages, data]);
  };

  const { _, getWebSocket } = useWebSocket(FEED_URL, {
    onOpen: () => handleConnected(),
    onClose: () => setConnected(false),
    onMessage: ({ data }) => handleMessage(data),
  });

  React.useEffect(() => {
    const input = prompt("What is your name?");
    setUser(input);
  }, []);

  return (
    <Layout
      chat={<ChatBox {...{ getWebSocket, user, connected }} />}
      feed={<Feed messages={messages} />}
      connected={connected}
    />
  );
}

export default App;
