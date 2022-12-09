import { ChangeEvent, useState, MouseEvent } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase/client";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const SendMessage = () => {
  const [currMessage, setCurrMessage] = useState<string>("");
  const [user, loading, error] = useAuthState(auth);

  // get value of input tag
  const handleInputVal = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrMessage(e.target.value);
  };

  // send message
  const sendMessage = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (currMessage) {
      // date
      const d = new Date();
      let mins: number | string = String(d.getMinutes()).padStart(2, "0");
      let ms: string = String(d.getMilliseconds());
      let hour: number | string = d.getHours();
      if (hour > 12) hour = hour - 12;
      // user info
      let fullName = user?.displayName;
      const userName = fullName?.split(" ")[0];
      setCurrMessage("");

      // run function to add message to db
      addMessageToDb(
        currMessage,
        serverTimestamp(),
        userName,
        user?.photoURL,
        `${hour}:${mins}`
      );
    }
  };

  // function to write to db
  const addMessageToDb = async (
    userMessage: string,
    timeStamp: any,
    userName: string | undefined,
    userImg: string | null | undefined,
    timeSent: string | number
  ) => {
    const docRef = await addDoc(collection(db, "chats"), {
      userMessage: userMessage,
      timeStamp: timeStamp,
      userName: userName,
      userImg: userImg,
      timeSent: timeSent,
    });
  };

  return (
    <div className="bg-green-300 py-4 px-2 flex items-center">
      <input
        value={currMessage}
        onChange={handleInputVal}
        className="flex items-center p-2 rounded w-[80%] focus:outline-none"
        type="text"
        placeholder="Message..."
      />

      <button className="btn" onClick={sendMessage} type="button">
        Send
      </button>
    </div>
  );
};

export default SendMessage;
