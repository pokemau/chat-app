import { HiMenu } from "react-icons/hi";
import { MouseEvent, useEffect, useRef, useState } from "react";

// components
import Logout from "./Logout";

const styles = {
  active: `scale-100`,
  inactive: `scale-0`,
};

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: any) => {
      if (!menuRef.current?.contains(e.target)) {
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
        className={`z-10 absolute bg-[#1B1D2A] border-[1px] border-[#242424] drop-shadow-[0_0_10px_rgb(177, 177, 177)] top-10 -left-10 ${
          isOpen ? styles.active : styles.inactive
        } transition-all duration-100 origin-top rounded flex flex-col items-center noselect`}>
        <div className="w-full">
          <Logout />
        </div>
      </div>
    </div>
  );
};

export default HamburgerMenu;
