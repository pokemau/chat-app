import { auth } from "../firebase/client";
import ChatRoom from "../components/chatroom/ChatRoom";
import { useAuthState } from "react-firebase-hooks/auth";

// components
import Login from "../components/loginlogout/Login";

const Home = () => {
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }
  if (!user) {
    return <Login />;
  } else return <ChatRoom />;
};

export default Home;
