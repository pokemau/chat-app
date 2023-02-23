// firebase imports
import { auth } from "../firebase/client";
import { useAuthState } from "react-firebase-hooks/auth";

// components
import Login from "../components/menu/Login";
import PageLoad from "../components/loading/PageLoad";
import ChatRoom from "../components/chatroom/ChatRoom";

const Home = () => {
  const [user, loading, error] = useAuthState(auth);

  if (loading) return <PageLoad />;
  if (user) return <ChatRoom />;
  else return <Login />;
};

export default Home;
