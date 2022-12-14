import { HiMenu } from "react-icons/hi";
import { MouseEvent, useEffect, useRef, useState } from "react";
import Link from "next/link";

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
        className={`z-10 absolute bg-[#e0e0e0] top-10 -left-10 ${
          isOpen ? styles.active : styles.inactive
        } transition-all duration-100 origin-top rounded flex flex-col items-center noselect`}>
        <div className="w-full text-center">
          <Link
            className="flex justify-center menu-link w-full rounded-br-none rounded-bl-none"
            href="/profile">
            Profile
          </Link>
        </div>

        <div className="w-full">
          <Logout />
        </div>
      </div>
    </div>
  );
};

export default HamburgerMenu;
