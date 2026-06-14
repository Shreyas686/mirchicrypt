import "../styles/globals.scss";
import Meta from "../components/meta";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Meta>
        <SessionProvider session={pageProps.session}>
          <Component {...pageProps} />
        </SessionProvider>
      </Meta>
    </>
  );
}

export default MyApp;
