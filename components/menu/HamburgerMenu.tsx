import { HiMenu } from "react-icons/hi";
import { useEffect, useRef, useState } from "react";

import Logout from "./Logout";
import Profile from "./Profile";

const styles = {
  active: `scale-100`,
  inactive: `scale-0`,
};

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      if (!menuRef.current?.contains(e.target as HTMLDivElement)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handler);

    return () => document.removeEventListener("mousedown", handler);
  });

  return (
    <div className="ml-auto relative" ref={menuRef}>
      <div>
        <HiMenu
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          id="hambMenu"
          className="text-3xl cursor-pointer"
        />
      </div>

      <div
        className={`z-10 absolute dark:bg-[#1B1D2A] border-[1px] shadow-md border-[#dbdbdb] dark:border-[#242424] drop-shadow-[0_0_10px_rgb(177, 177, 177)] top-10 -left-10 transition-all duration-100 origin-top rounded flex flex-col justify-center items-center noselect ${
          isOpen ? styles.active : styles.inactive
        }`}>
        <div className="text-center">
          <Logout />

          <Profile />
        </div>
      </div>
    </div>
  );
};

export default HamburgerMenu;
