// firebase imports
import { auth } from "../firebase/client";
import { useAuthState } from "react-firebase-hooks/auth";

// components
import Login from "../components/Menu/Login";
import PageLoad from "../components/Loading/PageLoad";
import ChatRoom from "../components/Chatroom/ChatRoom";

const Home = () => {
  const [user, loading, error] = useAuthState(auth);

  if (loading) return <PageLoad />;

  return (
    <>
      <div className={!user ? "blur-sm pointer-events-none select-none" : ""}>
        <ChatRoom />
      </div>

      {!user && (
        <div className="fixed inset-0 bg-black bg-opacity-50 pb-60 z-50 flex items-center justify-center">
          <div className="bg-white dark:bg-[#1B1D2A] rounded-lg p-8 shadow-xl">
            <Login />
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
