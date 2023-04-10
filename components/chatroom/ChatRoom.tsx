// components
import Messages from "./Messages";
import SendMessage from "./SendMessage";

// hooks
import { useRef } from "react";
import useOnScreen from "../Hooks/useOnScreen";

const ChatRoom = () => {
  const dummy = useRef<HTMLDivElement>(null);
  const isVisible = useOnScreen(dummy);

  return (
    <div className="h-[90vh] mx-auto">
      <div className="py-2 sidebar h-[80%] overflow-auto w-[90%] md:px-0 md:w-[70%] m-auto">
        <Messages dummy={dummy} isVisible={isVisible} />

        <div ref={dummy}></div>
      </div>

      <SendMessage dummy={dummy} isVisible={isVisible} />
    </div>
  );
};

export default ChatRoom;
