import {motion} from 'framer-motion';
import moment from 'moment';
import {useEffect, useState} from 'react';

export default function Message({server=false, time, user, text, hsl}) {
  const [msgTime, setMsgTime] = useState(null);

  const handleTime = () => {
    setMsgTime(moment(time).fromNow());
  };

  useEffect(() => {
    setInterval(() => {
      handleTime();
    }, 5000);
  }, []);

  return (
    <motion.div
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      transition={{duration: 0.5}}
      className={`px-4 py-2 text-slate-900 shadow rounded-md bg-slate-200 ${
        server && '!bg-indigo-700 !text-white'
      }`}
    >
      <span className="my-auto text-xs font-medium opacity-50">
        {msgTime ?? 'now'}
      </span>
      <p>
        <b style={{color: hsl}}>{server ? "Server":user}</b> {text}
      </p>
    </motion.div>
  );
}
