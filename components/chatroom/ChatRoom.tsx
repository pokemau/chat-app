// components
import Messages from "./Messages";
import SendMessage from "./SendMessage";
import HamburgerMenu from "../menu/HamburgerMenu";

const ChatRoom = () => {
  return (
    <div className="w-screen h-screen mx-auto ">
      <nav className="flex w-full h-[10%] px-6 md:px-20 items-center border-b-[1px] border-[#0c0f1d] bg-[#1B1D2A] ">
        <h1 className="font-bold text-2xl">Welcome to Yahallo</h1>

        <HamburgerMenu />
      </nav>

      <Messages />

      <SendMessage />
    </div>
  );
};

export default ChatRoom;
