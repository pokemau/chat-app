import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/client";

const Login = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

  return (
    <div className="flex items-center flex-col h-screen mt-10">
      <h1 className="font-bold text-3xl text-center">Yahallo</h1>
      <button
        className="bg-[#fca5a5] mt-8 px-4 py-2 rounded hover:bg-[#ff8b8b] transition-all"
        onClick={() => signInWithGoogle()}>
        LogIn User
      </button>
    </div>
  );
};

export default Login;
