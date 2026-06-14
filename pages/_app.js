import "../styles/globals.scss";
import Meta from "../components/meta";
import { Provider } from "next-auth/client";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Meta>
        <Provider session={pageProps.session}>
          <Component {...pageProps} />
        </Provider>
      </Meta>
    </>
  );
}

export default MyApp;
