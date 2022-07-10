import moment from "moment";
import { motion } from "framer-motion";

const timestamp = (time) => moment(time).fromNow();

function colour(str, s = "40", l = "50") {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  var h = hash % 360;
  return "hsl(" + h + ", " + s + "%, " + l + "%)";
}

export default function Feed({ messages }) {
  return messages.map((message, index) => {
    const msg = JSON.parse(message);
    const text = msg.text;
    const time = timestamp(new Date(msg.timestamp));
    const id = msg.type === "identify";

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        key={index}
        className={`px-4 py-2 rounded-md bg-slate-200 ${
          id && "!bg-slate-700 !text-white"
        }`}
      >
        <span className="my-auto text-xs font-medium opacity-50">{time}</span>
        <p>
          <b
            style={
              id
                ? {
                    color: colour("Server"),
                  }
                : {
                    color: colour(msg.user),
                  }
            }
          >
            {id ? "Server" : msg.user}
          </b>{" "}
          {text}
        </p>
      </motion.div>
    );
  });
}
