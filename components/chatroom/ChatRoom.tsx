// components
import Messages from "./Messages";
import SendMessage from "./SendMessage";
import HamburgerMenu from "../menu/HamburgerMenu";

// react icons
import { FiMoon, FiSun } from "react-icons/fi";

// utils
import { useTheme } from "next-themes";

// hooks
import { useRef } from "react";
import useOnScreen from "../hooks/useOnScreen";

const ChatRoom = () => {
  const dummy = useRef<HTMLDivElement>(null);
  const isVisible = useOnScreen(dummy);

  // theme if darkmode or not
  const { systemTheme, theme, setTheme } = useTheme();

  // render sun or moon icon based on theme
  const themeChanger = () => {
    const currentTheme = theme === "system" ? systemTheme : theme;

    if (currentTheme === "dark") {
      return (
        <div onClick={() => setTheme("light")}>
          <FiMoon className="" size={24} />
        </div>
      );
    } else
      return (
        <div onClick={() => setTheme("dark")}>
          <FiSun className="" size={24} />
        </div>
      );
  };

  return (
    <div className="w-screen h-screen mx-auto">
      <nav className="flex w-full h-[10%] px-6 md:px-20 items-center border-b-[1px] border-[#ddd] dark:border-[#0c0f1d] dark:bg-[#1B1D2A] ">
        <h1 className="font-bold text-2xl">Welcome to Yahallo</h1>

        <div className="flex ml-auto items-center gap-2">
          <div className="cursor-pointer mr-2">{themeChanger()}</div>

          <HamburgerMenu />
        </div>
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
