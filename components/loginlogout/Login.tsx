import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/client";

const Login = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

  return (
    <div>
      <h1>LogIn</h1>
      <button onClick={() => signInWithGoogle()}>LogIn User</button>
    </div>
  );
};

export default Login;
