import "../styles/globals.css";
import Layout from "../components/layout";
import type { AppProps } from "next/app";

function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default App;
