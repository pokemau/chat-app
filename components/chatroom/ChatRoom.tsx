// components
import Messages from "./Messages";
import Logout from "../loginlogout/Logout";
import SendMessage from "./SendMessage";

const ChatRoom = () => {
  return (
    <div className="w-[80vw] mx-auto bg-orange-300">
      <nav className="flex px-4 py-3 items-center border-b-[1px] border-black">
        <h1 className="font-bold text-2xl">Welcome to Yahallo</h1>

        <Logout />
      </nav>

      <Messages />

      <SendMessage />
    </div>
  );
};

export default ChatRoom;
