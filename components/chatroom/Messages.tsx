import {
  collection,
  DocumentData,
  limit,
  orderBy,
  query,
} from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../../firebase/client";
import Image from "next/image";

const Messages = () => {
  const [value, loading, error] = useCollection(
    query(collection(db, "chats"), orderBy("timeStamp"), limit(1))
  );

  const chats = value?.docs.map((doc) => ({ id: doc.id, data: doc.data() }));

  // userMessage
  // userName
  // userImg
  // timeSent
  const Chat = () => {
    return (
      <>
        {chats?.map((chat) => (
          <div key={chat.id} className="relative px-2 mb-2 break-all">
            <Image
              className="rounded-full mr-2 absolute left-0 top-1"
              src={chat.data.userImg}
              width={40}
              height={40}
              alt="nig"
            />

            <div className="ml-10">
              <div className="flex">
                <h1 className="font-bold">{chat.data.userName}</h1>
                <span className="ml-2 text-[#adadad]">
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
      <Chat />
    </div>
  );
};

export default Messages;
