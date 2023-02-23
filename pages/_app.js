import "../styles/globals.css";
import Layout from "../components/layout/Layout";
import NextNProgress from "nextjs-progressbar";

// Redux Store Imports
import { wrapper } from "../redux/Store";
//Notification System
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import Authentication Session
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
    return (
        <SessionProvider session={session}>
            <Layout>
                <NextNProgress color='#9747FF' />
                <Component {...pageProps} />
                <ToastContainer
                    position='bottom-right'
                    autoClose={6000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
            </Layout>
        </SessionProvider>
    );
}

export default wrapper.withRedux(MyApp);
