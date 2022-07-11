export default function Layout({chat, users, feed, connected}) {
  return (
    <div className="flex flex-col w-screen h-screen overflow-y-hidden">
      {/* Chat Box */}
      <Section styles="bg-indigo-200">
        <h2 className="text-lg">Chat</h2>
        {chat}
        {users && users.map(user => <p>{user}</p>)}
      </Section>
      {/* Feed */}
      <Section styles="bg-gradient-to-b from-slate-700 to-slate-900 overflow-y-scroll grow">
        <h2 className="relative text-lg">
          Feed
          <span
            className={`absolute translate-x-1 -translate-y-1px h-2 w-2 ${
              connected ? 'bg-green-500' : 'bg-slate-700'
            } rounded-md transition-color duration-250`}
          />
        </h2>
        {!connected && <p className="opacity-50">Connecting to server...</p>}
        {feed}
      </Section>
    </div>
  );
}

function Section({styles, ...props}) {
  return (
    <section className={'space-y-4 p-8 ' + styles}>{props.children}</section>
  );
}
