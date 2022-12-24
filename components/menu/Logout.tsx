import { useSignOut } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/client";

const Logout = () => {
  const [signOut, loading, error] = useSignOut(auth);

  if (loading) return <h1>Logging Out</h1>;

  return (
    <button
      className="menu-link font-semibold dark:bg-[#1B1D2A] dark:hover:text-[#4C73F8] dark:hover:bg-[#343746]"
      onClick={() => signOut()}>
      Logout
    </button>
  );
};

export default Logout;
