import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  startAfter,
} from "firebase/firestore";
import { MouseEvent, useEffect, useRef, useState } from "react";
import { db } from "../../firebase/client";
import Image from "next/image";

const Messages = () => {
  const [chatsData, setChatsData] = useState<any[]>([]);
  const dummy = useRef<HTMLInputElement>(null);

  // get latest messages on page load
  useEffect(() => {
    const q = query(
      collection(db, "chats"),
      orderBy("timeStamp", "desc"),
      limit(30)
    );
    const unsub = onSnapshot(q, (snapShot) => {
      setChatsData(snapShot.docs.map((doc) => doc));
    });

    // scrolla();

    return () => unsub();
  }, []);

  useEffect(() => {
    scrolla();
  }, [chatsData]);

  const scrolla = () => {
    if (chatsData) dummy.current?.scrollIntoView({ behavior: "smooth" });
  };

  // userMessage
  // userName
  // userImg
  // timeSent

  return (
    <div className="py-2 sidebar h-[75%] overflow-auto border-b-[1px]">
      {/* <button
        className="underline mb-2 hover:text-[#165ac2]"
        onClick={getNextMessages}>
        Show More Messages
      </button> */}

      <Chat chatsData={chatsData} />

      <div ref={dummy}></div>
    </div>
  );
};

const Chat = ({ chatsData }) => {
  const reversed = [...chatsData].reverse();
  return (
    <>
      {reversed?.map((chat) => (
        <div
          key={chat.id}
          className="relative px-2 mb-2 break-words min-h-[10%] hover:bg-[#ebebeb]">
          <Image
            className="z-0 absolute rounded-full left-2 top-1"
            src={chat.data().userImg}
            width={40}
            height={40}
            alt="nig"
          />

          <div className="ml-12">
            <div className="flex items-center">
              <h1 className="font-bold">{chat.data().userName}</h1>
              <span className=" ml-2 text-[#adadad] text-xs font-bold">
                {chat.data().timeSent}
              </span>
            </div>

            <h1>{chat.data().userMessage}</h1>
          </div>
        </div>
      ))}
    </>
  );
};

export default Messages;
