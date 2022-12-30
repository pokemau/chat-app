import HamburgerMenu from "../menu/HamburgerMenu";

import Link from "next/link";

// utils
import { useTheme } from "next-themes";
// react icons
import { FiMoon, FiSun } from "react-icons/fi";

const Navbar = () => {
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
    <nav className="flex w-full h-[10vh] px-6 md:px-20 items-center border-b-[1px] border-[#ddd] dark:border-[#0c0f1d] dark:bg-[#1B1D2A] ">
      <Link className="font-bold text-2xl" href="/">
        Yahallo
      </Link>
      {/* <h1 className="font-bold text-2xl">Yahallo</h1> */}

      <div className="flex ml-auto items-center gap-2">
        <div className="cursor-pointer mr-2">{themeChanger()}</div>

        <HamburgerMenu />
      </div>
    </nav>
  );
};

export default Navbar;
