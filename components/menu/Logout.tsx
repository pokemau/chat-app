import { useSignOut } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/client";

const Logout = () => {
  const [signOut, loading, error] = useSignOut(auth);

  if (loading) return <h1>Logging Out</h1>;

  return (
    <button
      className="menu-link rounded-tr-none rounded-tl-none"
      onClick={() => signOut()}>
      Logout
    </button>
  );
};

export default Logout;
