import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { ThemeProvider } from "next-themes";
import Navbar from "../components/Navbar/Navbar";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider enableSystem={true} attribute="class">
        <Head>
          <title>Yahallo | Chat</title>
        </Head>

        <Navbar />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
