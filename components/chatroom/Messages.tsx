import { collection, DocumentData, orderBy, query } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../../firebase/client";
import Image from "next/image";

const Messages = () => {
  const [value, loading, error] = useCollection(
    query(collection(db, "chats"), orderBy("timeStamp"))
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
          <div key={chat.id} className="border-b-2">
            <div className="flex">
              <Image src={chat.data.userImg} width={50} height={50} alt="nig" />
              <h1>
                {chat.data.userName} {chat.data.timeSent}
              </h1>
            </div>

            <h1>{chat.data.userMessage}</h1>
          </div>
        ))}
      </>
    );
  };

  return (
    <div className="h-[75vh] overflow-auto">
      <Chat />
    </div>
  );
};

export default Messages;
