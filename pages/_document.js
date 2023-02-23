import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {


    return (
        <Html lang={'en'}>
            <Head>
                <meta charSet="utf-8" />
                <meta name="description" content="AMB Portfolio" />
                <meta name="author" content="Ahmed Badawi" />
                <link rel="icon" type="image/x-icon"  href="/Images/amb.svg"/>
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}