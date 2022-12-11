import { ChangeEvent, useState, MouseEvent, KeyboardEvent } from "react";
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

  const sendHolder = () => {
    if (currMessage && currMessage.length <= 200) {
      // console.log(currMessage.length);
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

  // send message with btn
  const sendMessage = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    sendHolder();
  };
  // send message with enter key
  const sendOnEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    // console.log(e);
    if (e.code === "Enter") sendHolder();
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
    <div className="flex items-center justify-center md:px-10 h-[15%] border-t-[1px] border-[#a7a7a7]">
      <input
        value={currMessage}
        onChange={handleInputVal}
        onKeyDown={sendOnEnter}
        className="flex px-2 py-[.8em] items-center rounded w-[80%] focus:outline-none bg-[#ddd]"
        type="text"
        placeholder="Message..."
      />

      <button
        className="btn ml-2 py-[.8em] px-4 md:w-[15%]"
        onClick={sendMessage}
        type="button">
        Send
      </button>
    </div>
  );
};

export default SendMessage;
