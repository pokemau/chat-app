interface Props {
  userName: string;
  userImage?: string;
}

const ChatHeader: React.FC<Props> = ({ userName, userImage }) => {
  return (
    <div className="w-full bg-orange-300 p-2">
      <h1 className="text-xl font-bold">{userName}</h1>
    </div>
  );
};

export default ChatHeader;
