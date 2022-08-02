import React, { useEffect, useState } from "react";

const Timer = () => {
  const [message, setMessage] = useState("Khoi");
  useEffect(() => {
    const timer = setInterval(() => {
      console.log(message);
    }, 2000);
    // mỗi lần re-render lại thì setInterval cũng sẽ reset lại timer lên lại 2s
    return () => {
      clearInterval(timer);
    };
  }, [message]);
  return (
    <div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
    </div>
  );
};

export default Timer;
