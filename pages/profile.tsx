// components
import PageLoad from "../components/loading/PageLoad";
import Login from "../components/menu/Login";

// firebase imports
import { auth } from "../firebase/client";
import { useAuthState } from "react-firebase-hooks/auth";

import Image from "next/image";

const Profile = () => {
  const [user, loading, error] = useAuthState(auth);

  //user data
  const userImgURL = user?.photoURL;
  const userDisplayName = user?.displayName;
  const userEmail = user?.email;

  if (user) {
    return (
      <div className="flex items-center justify-center mt-4">
        <Image
          className="mr-2"
          src={userImgURL ? userImgURL : "/assets/yui_loading.jpg"}
          alt={`${userDisplayName} profile pic`}
          width={80}
          height={80}></Image>

        <div>
          <h1 className="text-3xl font-bold">{userDisplayName}</h1>
          <h1>{userEmail}</h1>
        </div>
      </div>
    );
  }
  if (loading) {
    return <PageLoad />;
  } else return <Login />;
};

export default Profile;
