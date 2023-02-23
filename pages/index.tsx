import { ReactElement, useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

const Index = (): ReactElement => {
  const CHAR_CODE_A = 65;
  const CHAR_CODE_SPACE = 32;
  const CHAR_CODE_MAX = 95;
  const CHAR_CODE_MIN = 32;

  const BASE_URL="https://arcade-tweet.netlify.app"
  const NUM_CHARS_IN_BOILERPLATE = `${BASE_URL} #ArcadeTweet`.length;

  const FORWARD = 1;
  const BACKWARD = -1;

  const [tweet, setTweet] = useState(Array(280 - NUM_CHARS_IN_BOILERPLATE).fill(CHAR_CODE_A));
  const [charIndex, updateCharIndex] = useState(0);

  const cycle = (direction: number) => {
    const currentCharCode = tweet[charIndex];
    const newTweet = [...tweet];

    if (currentCharCode + direction > CHAR_CODE_MAX) {
      newTweet[charIndex] = CHAR_CODE_MIN;
    } else if (currentCharCode + direction < CHAR_CODE_MIN) {
      newTweet[charIndex] = CHAR_CODE_MAX;
    } else {
      newTweet[charIndex] = currentCharCode + direction;
    }

    setTweet(newTweet);
  };

  const next = () => {
    updateCharIndex(charIndex + 1);
  };

  const getUrl = () => {
    const message = tweet
      .slice(0, charIndex)
      .map((it) => String.fromCharCode(it))
      .join("");
    return (
      "https://twitter.com/intent/tweet?" +
      "hashtags=ArcadeTweet&" +
      `original_referer=${encodeURI(BASE_URL)}` +
      "ref_src=twsrc%5Etfw&" +
      `text=${encodeURI(message)}&` +
      "tw_p=tweetbutton&" +
      `url=${encodeURI(BASE_URL)}`
    );
  };

  const ifEnter = (func: () => void) => {
    return (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "Enter") {
        func();
      }
    };
  };

  return (
    <div className="content">
      <div>
        <div
          role="button"
          tabIndex={0}
          className="button-flat red no-select"
          style={{ fontSize: "48px" }}
          onClick={() => cycle(BACKWARD)}
          onKeyUp={ifEnter(() => cycle(BACKWARD))}
        >
          <ArrowDropUpIcon title="cycle backward" fontSize="inherit" sx={{ marginTop: "25%" }} />
        </div>
        <div
          role="button"
          tabIndex={0}
          className="button-flat green no-select"
          onClick={next}
          onKeyUp={ifEnter(next)}
        >
          <CheckIcon title="next character" fontSize="inherit" sx={{ marginTop: "25%" }} />
        </div>
      </div>
      <div>
        <div
          role="button"
          tabIndex={0}
          className="button-flat red no-select"
          onClick={() => cycle(FORWARD)}
          onKeyUp={ifEnter(() => cycle(FORWARD))}
        >
          <ArrowDropDownIcon title="cycle forward" fontSize="inherit" sx={{ marginTop: "25%" }} />
        </div>
        <a tabIndex={0} href={getUrl()} title="tweet it">
          <div className="button-flat blue no-select">
            <img alt="twitter" className="twitter-logo" src="/img/twitter.svg" />
          </div>
        </a>
      </div>

      <div className="tweet-characters">
        {tweet.map((charCode: number, i: number): ReactElement => {
          const activeClass = i === charIndex ? "active" : "";
          let characterToDisplay = <>{String.fromCharCode(charCode)}</>;
          if (charCode === CHAR_CODE_SPACE) {
            characterToDisplay = <>&nbsp;</>;
          }
          return (
            <div key={i} className={`character ${activeClass}`}>
              {characterToDisplay}
            </div>
          );
        })}
      </div>

      <div className="footer">
        <div>
          © 2020 <a href="http://anneloverso.com/">Anne LoVerso</a>
        </div>
        <div>
          <a href="https://twitter.com/AnneLoVerso">
            <img alt="twitter" src="/img/twitter.svg" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Index;
