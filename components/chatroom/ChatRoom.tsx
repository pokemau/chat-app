// components
import Messages from "./Messages";
import Logout from "../loginlogout/Logout";
import SendMessage from "./SendMessage";
import { useRef } from "react";

const ChatRoom = () => {
  return (
    <div className="w-[80vw] h-screen mx-auto ">
      <nav className="flex h-[10%] px-4 items-center border-b-[1px] border-[#a7a7a7]">
        <h1 className="font-bold text-2xl">Welcome to Yahallo</h1>

        <Logout />
      </nav>

      <Messages />

      <SendMessage />
    </div>
  );
};

export default ChatRoom;
