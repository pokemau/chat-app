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
  const [limitCount, setLimitCount] = useState(30);
  const dummy = useRef<HTMLInputElement>(null);

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

  useEffect(() => {
    scrolla();
  }, [chatsData]);

  const scrolla = () => {
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
    <div className="py-2 sidebar h-[75%] overflow-auto w-[90%] md:px-0 md:w-[80%] m-auto">
      <button
        className="underline mb-2 hover:text-[#165ac2]"
        onClick={getMoreMessages}>
        Show More Messages
      </button>

      <Chat chatsData={chatsData} />

      <div ref={dummy}></div>
    </div>
  );
};

interface chatsProps {
  chatsData: any[];
}

const Chat: React.FC<chatsProps> = ({ chatsData }) => {
  const reversed = [...chatsData].reverse();
  return (
    <>
      {reversed?.map((chat) => (
        <div
          key={chat.id}
          className="relative px-2 mb-2 break-words min-h-[10%] hover:bg-[#1B1D2A]">
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
