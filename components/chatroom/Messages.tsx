// firebase imports
import {
  DocumentData,
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../../firebase/client";

// components
import { SendMessageProps } from "./SendMessage";

import { MouseEvent, useEffect, useState } from "react";
import Image from "next/image";

const Messages: React.FC<SendMessageProps> = ({ dummy, isVisible }) => {
  const [chatsData, setChatsData] = useState<DocumentData[]>([]);
  const [limitCount, setLimitCount] = useState(30);

  // get latest messages on page load
  useEffect(() => {
    const q = query(
      collection(db, "chats"),
      orderBy("timeStamp", "desc"),
      limit(limitCount)
    );
    const unsub = onSnapshot(q, (snapShot) => {
      setChatsData(snapShot.docs.map((doc) => doc));
    });

    return () => unsub();
  }, [limitCount]);

  // run when chatsData is increased
  useEffect(() => {
    if (isVisible) scrollToBottom();
  }, [chatsData]);

  const scrollToBottom = () => {
    if (chatsData) dummy.current?.scrollIntoView({ behavior: "smooth" });
  };

  const getMoreMessages = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLimitCount(limitCount + 5);
  };

  // userMessage
  // userName
  // userImg
  // timeSent

  return (
    <div>
      <button
        className="noselect underline mb-2 hover:text-[#165ac2]"
        onClick={getMoreMessages}>
        Show More Messages
      </button>

      <Chat chatsData={chatsData} />

      <div ref={dummy}></div>
    </div>
  );
};

interface chatsProps {
  chatsData: DocumentData[];
}

const Chat: React.FC<chatsProps> = ({ chatsData }) => {
  const reversed = [...chatsData].reverse();
  return (
    <>
      {reversed?.map((chat) => (
        <div
          key={chat.id}
          className="relative px-2 mb-2 break-words min-h-[10%] hover:bg-[#e0e0e0] dark:hover:bg-[#1B1D2A]">
          <Image
            className="z-0 absolute rounded-full left-2 top-1"
            src={chat.data().userImg}
            width={40}
            height={40}
            alt="user image"
          />

          <div className="ml-12">
            <div className="flex items-center">
              <h1 className="font-bold">
                {chat.data().userName.split(" ")[0]}
              </h1>
              <p className=" ml-2 text-[#575757] text-xs font-bold">
                {chat.data().timeSent}
              </p>
            </div>

            <h1>{chat.data().userMessage}</h1>
          </div>
        </div>
      ))}
    </>
  );
};

export default Messages;
