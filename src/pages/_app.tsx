import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { ThemeProvider } from "next-themes";
import Navbar from "../components/Navbar/Navbar";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/client";

export default function App({ Component, pageProps }: AppProps) {
  const [user, loading, error] = useAuthState(auth);

  return (
    <>
      <ThemeProvider enableSystem={true} attribute="class">
        <Head>
          <title>Yahallo | Chat</title>
        </Head>

        {user ? <Navbar /> : null}
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
