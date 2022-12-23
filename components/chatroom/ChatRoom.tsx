// components
import Messages from "./Messages";
import SendMessage from "./SendMessage";
import HamburgerMenu from "../menu/HamburgerMenu";

import { useRef } from "react";
import useOnScreen from "../hooks/useOnScreen";

const ChatRoom = () => {
  const dummy = useRef<HTMLDivElement>(null);
  const isVisible = useOnScreen(dummy);

  return (
    <div className="w-screen h-screen mx-auto ">
      <nav className="flex w-full h-[10%] px-6 md:px-20 items-center border-b-[1px] border-[#0c0f1d] bg-[#1B1D2A] ">
        <h1 className="font-bold text-2xl">Welcome to Yahallo</h1>

        <HamburgerMenu />
      </nav>

      <div className="py-2 sidebar h-[75%] overflow-auto w-[90%] md:px-0 md:w-[80%] m-auto">
        <Messages dummy={dummy} isVisible={isVisible} />

        <div ref={dummy}></div>
      </div>

      <SendMessage dummy={dummy} isVisible={isVisible} />
    </div>
  );
};

export default ChatRoom;
