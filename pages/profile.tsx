import PageLoad from "../components/loading/PageLoad";
import { auth } from "../firebase/client";
import { useAuthState } from "react-firebase-hooks/auth";

const Profile = () => {
  const [user, loading, error] = useAuthState(auth);

  if (user) {
    return (
      <div>
        <h1>{user.displayName}</h1>
      </div>
    );
  } else {
    return <PageLoad />;
  }
};

const UserData = () => {};

export default Profile;
