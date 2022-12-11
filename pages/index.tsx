import { auth } from "../firebase/client";
import ChatRoom from "../components/chatroom/ChatRoom";
import { useAuthState } from "react-firebase-hooks/auth";

// components
import Login from "../components/loginlogout/Login";
import PageLoad from "../components/loading/PageLoad";

const Home = () => {
  const [user, loading, error] = useAuthState(auth);

  // return <PageLoad />;

  if (loading) {
    return <PageLoad />;
  }
  if (!user) {
    return <Login />;
  } else return <ChatRoom />;
};

export default Home;
