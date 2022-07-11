import * as React from 'react';
import {useWebSocket} from 'react-use-websocket/dist/lib/use-websocket';
import ChatBox from './ChatBox';
import Feed from './Feed';
import Layout from './Layout';

const FEED_URL = 'ws://192.168.0.109:8080';

function App() {
  const [messages, setMessages] = React.useState([]);
  const [peers, setPeers] = React.useState([]);
  const [connected, setConnected] = React.useState(false);
  const [user, setUser] = React.useState('');

  // Set / get user
  React.useEffect(() => {
    const u = localStorage.getItem('user');
    if (u) {
      setUser(u);
    } else {
      if (!user) {
        setUser(prompt('Enter your name'));
        localStorage.setItem('user', user);
      }
    }
  }, [user]);

  // Websockets Setup

  const handleConnected = () => {
    setConnected(true);
    getWebSocket().send(JSON.stringify({type: 'identify', user: user}));
  };

  const handleMessage = data => {
    const message = JSON.parse(data);
    console.log(message);
    if (JSON.parse(data).type === 'history') {
      message.chatHistory &&
        setMessages(messages => [...messages, message.chatHistory]);
      message.users && setPeers(peers => [...peers, message.users]);
    } else {
      setMessages(messages => [...messages, message]);
    }
  };

  const {getWebSocket} = useWebSocket(FEED_URL, {
    // Connect to Server
    onOpen: () => handleConnected(),
    // Disconnect From Server
    onClose: () => {
      messages.push({
        type: 'message',
        user: 'Server',
        message: 'Disconnected from server',
        timestamp: new Date().Now(),
      });
      setConnected(false);
    },
    onMessage: ({data}) => handleMessage(data),
    reconnect: true,
  });

  return (
    <Layout
      chat={<ChatBox {...{getWebSocket, user, connected}} />}
      feed={<Feed setUserList={setPeers} username={user} messages={messages} />}
      connected={connected}
      users={peers}
    />
  );
}

export default App;
