import { auth } from "../firebase/client";
import { useAuthState } from "react-firebase-hooks/auth";
import Image from "next/image";

const Profile = () => {
  const [user, loading, error] = useAuthState(auth);

  console.log(user);

  return (
    <div className="bg-green-300">
      <Image
        src={user?.photoURL}
        width={100}
        height={100}
        alt={`${user?.displayName} image`}
      />
      <h1>{user?.displayName}</h1>
      <p>{user?.email}</p>
    </div>
  );
};

export default Profile;
