import Message from './Message';

function colour(str, s = '40', l = '50') {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  var h = hash % 360;
  return 'hsl(' + h + ', ' + s + '%, ' + l + '%)';
}

export default function Feed({messages, setUserList}) {
  return messages.map((msg) => {
    const text = msg.text;
    setUserList(msg.userList)

    if (msg.type === 'message') {
      return (
        // Chat Message
        <Message
          key={msg.uuid }
          time={msg.timestamp}
          user={msg.user}
          text={text}
          hsl={colour(msg.user)}
        />
      );
    } else if (msg.type === 'identify' && msg.text) {
      return (
        <Message
          server={true}
          key={msg.uuid}
          time={msg.timestamp}
          text={text}
          hsl={colour('Server')}
        />
      );
    }
  });
}
