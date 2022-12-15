import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/client";
import Image from "next/image";

const Login = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

  return (
    <div className="flex items-center flex-col h-screen mt-2">
      <h1 className="font-bold text-3xl text-center">Yahallo</h1>
      <Image
        className="mt-2"
        src="/assets/yuigahama-yahallo.gif"
        width={300}
        height={100}
        alt="yui waving"
      />
      <button
        className="btn mt-4 px-4 transition-all"
        onClick={() => signInWithGoogle()}>
        Login
      </button>
    </div>
  );
};

export default Login;
