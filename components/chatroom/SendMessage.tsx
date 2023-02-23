import {
  useState,
  ChangeEvent,
  MouseEvent,
  KeyboardEvent,
  RefObject,
} from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase/client";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export interface SendMessageProps {
  dummy: RefObject<HTMLDivElement>;
  isVisible: boolean;
}

const cdNum = 5;

const SendMessage: React.FC<SendMessageProps> = ({ dummy, isVisible }) => {
  const [currMessage, setCurrMessage] = useState<string>("");
  const [user, loading, error] = useAuthState(auth);
  const [senderCd, setSenderCd] = useState(true);
  const [cd, setCd] = useState(cdNum);

  // test
  const [messageLimit, setMessageLimit] = useState("");

  // 5 sec cooldown after sending a message
  const sendCooldown = () => {
    setSenderCd(false);

    const intervalId = setInterval(() => {
      setCd((cd) => cd - 1);
    }, 1000);

    const timeout = setTimeout(() => {
      setSenderCd(true);
      clearInterval(intervalId);
      clearTimeout(timeout);
      setCd(cdNum);
    }, 5000);
  };

  // get value of input tag
  const handleInputVal = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrMessage(e.target.value);
  };

  // send holder
  const sendHolder = () => {
    if (currMessage.trim() && currMessage.trim().length <= 200) {
      sendCooldown();

      setMessageLimit("");

      if (!isVisible) dummy.current?.scrollIntoView();

      // date
      const d = new Date();
      let mins: number | string = String(d.getMinutes()).padStart(2, "0");
      let hour: number | string = d.getHours();
      let amOrPm: string = "AM";
      if (hour < 1) hour = 12;
      if (hour > 12) {
        amOrPm = "PM";
        hour = hour - 12;
      }
      // user info
      const userName = user?.displayName;

      setCurrMessage("");
      // run function to add message to db
      addMessageToDb(
        currMessage,
        serverTimestamp(),
        userName,
        user?.photoURL,
        `${hour}:${mins} ${amOrPm}`
      );
    } else {
      setMessageLimit("Max 200 words only!");
    }
  };

  // send message with btn
  const sendMessage = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    sendHolder();
  };
  // send message with enter key
  const sendOnEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter") sendHolder();
  };

  // function to write to db
  const addMessageToDb = async (
    userMessage: string,
    timeStamp: any,
    userName: string | null | undefined,
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
    <div className="flex flex-col m-auto justify-center px-2 md:w-[80%] md:px-10 h-[20%] border-t-[1px] border-[#a7a7a7]">
      <div className="flex">
        <input
          value={currMessage}
          onChange={handleInputVal}
          onKeyDown={(e) => (senderCd ? sendOnEnter(e) : null)}
          className={`flex px-2 py-[.8em] items-center rounded w-[80%] focus:outline-none dark:bg-[#343746] border-[1px] border-[#bdbdbd] dark:border-[#333] ${
            senderCd ? null : "hover:cursor-not-allowed"
          }`}
          type="text"
          placeholder="Message..."
          disabled={senderCd ? false : true}
        />

        <button
          className={`btn ml-2 py-[.8em] px-2 w-[25%] md:w-[15%] ${
            senderCd ? null : "inactive"
          }`}
          onClick={sendMessage}
          type="button"
          disabled={senderCd ? false : true}>
          Send {senderCd ? null : cd}
        </button>
      </div>

      <h1 className="text-xs text-[#e71515] font-bold">{messageLimit}</h1>
    </div>
  );
};

export default SendMessage;
