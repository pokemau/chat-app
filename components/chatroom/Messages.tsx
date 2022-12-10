import {
  collection,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  startAfter,
  startAt,
} from "firebase/firestore";
import { MouseEvent, useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../../firebase/client";
import Image from "next/image";

const Messages = () => {
  const [latestDoc, setLatestDoc] = useState<null | any>(null);
  const [chatsData, setChatsData] = useState<any[]>([]);

  // const [value, loading, error] = useCollection(
  //   query(collection(db, "chats"), orderBy("timeStamp", "desc"), limit(10))
  // );

  // const chats = value?.docs.map((doc) => ({ id: doc.id, data: doc.data() }));
  // chats?.reverse();

  // get latest 10 messages on page load
  useEffect(() => {
    console.log("ran");
    getMessages();
  }, []);

  const getMessages = async () => {
    const q = query(
      collection(db, "chats"),
      orderBy("timeStamp", "desc"),
      startAfter(latestDoc || ""),
      limit(10)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // console.log(doc);
      const data = doc.data();
      setChatsData((prevData) => [...prevData, { id: doc.id, data }]);
    });

    setLatestDoc(querySnapshot.docs[querySnapshot.docs.length - 1]);
  };

  const getNextMessages = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    getMessages();

    // console.log(chatsData);
  };

  // userMessage
  // userName
  // userImg
  // timeSent
  const Chat = () => {
    return (
      <>
        {chatsData?.reverse().map((chat) => (
          <div key={chat.id} className="relative px-2 mb-2 break-words ">
            <Image
              className="rounded-full mr-2 absolute left-0 top-1"
              src={chat.data.userImg}
              width={40}
              height={40}
              alt="nig"
            />

            <div className="ml-10">
              <div className="flex items-center">
                <h1 className="font-bold">{chat.data.userName}</h1>
                <span className=" ml-2 text-[#adadad] text-xs font-bold">
                  {chat.data.timeSent}
                </span>
              </div>

              <h1>{chat.data.userMessage}</h1>
            </div>
          </div>
        ))}
      </>
    );
  };

  return (
    <div className="py-2 sidebar h-[75%] overflow-auto border-b-[1px]">
      <button
        className="underline mb-2 hover:text-[#165ac2]"
        onClick={getNextMessages}>
        Show More Messages
      </button>

      <Chat />
    </div>
  );
};

export default Messages;
