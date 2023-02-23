import "@styles/index.scss";
import { ReactElement } from "react";
import { AppProps } from "next/app";
import Head from "next/head";

const App = ({ Component, pageProps }: AppProps): ReactElement => {
  return (
    <div>
      <script
        dangerouslySetInnerHTML={{
          __html: `
                window.twttr = (function(d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0],
                t = window.twttr || {};
                if (d.getElementById(id)) return t;
                js = d.createElement(s);
                js.id = id;
                js.src = "https://platform.twitter.com/widgets.js";
                fjs.parentNode.insertBefore(js, fjs);

                t._e = [];
                t.ready = function(f) {
                t._e.push(f);
                 };
                return t;
                }(document, "script", "twitter-wjs"));
              `,
        }}
      />
      <Head>
        <title>Arcade Tweeter</title>
        <meta
          name="description"
          content="The simplest online RPG Dice Roller for tabletop games like Dungeons and Dragons (D&D). Roll any number or type of dice."
        />
        <link rel="canonical" href="https://rpgdiceroller.com/" />
      </Head>
      <Component {...pageProps} />
    </div>
  );
};

export default App;
