import React, {ReactElement} from 'react';
import './App.scss';
import twitter from './img/twitter.svg'

const App: React.FC = () => {

  const CHAR_CODE_A = 65;
  const CHAR_CODE_SPACE = 32;
  const CHAR_CODE_MAX = 95;
  const CHAR_CODE_MIN = 32;

  const NUM_CHARS_IN_BOILERPLATE = "https://arcade-tweet.herokuapp.com/ #ArcadeTweet".length;

  const FORWARD = 1;
  const BACKWARD = -1;

  const [tweet, setTweet] = React.useState(Array(280 - NUM_CHARS_IN_BOILERPLATE).fill(CHAR_CODE_A));
  const [charIndex, updateCharIndex] = React.useState(0);

  const cycle = (direction: number) => {
    let currentCharCode = tweet[charIndex];
    const newTweet = [...tweet];

    if (currentCharCode + direction > CHAR_CODE_MAX) {
      newTweet[charIndex] = CHAR_CODE_MIN;
    } else if (currentCharCode + direction < CHAR_CODE_MIN) {
      newTweet[charIndex] = CHAR_CODE_MAX;
    } else {
      newTweet[charIndex] = currentCharCode + direction;
    }

    setTweet(newTweet)
  };

  const next = () => {
    updateCharIndex(charIndex + 1)
  };

  const getUrl = () => {
    let message = tweet.slice(0, charIndex).map((it) => String.fromCharCode(it)).join('');
    return "https://twitter.com/intent/tweet?" +
            "hashtags=ArcadeTweet&" +
            `original_referer=${encodeURI("https://arcade-tweet.herokuapp.com")}` +
            "ref_src=twsrc%5Etfw&" +
            `text=${encodeURI(message)}&` +
            "tw_p=tweetbutton&" +
            `url=${encodeURI("https://arcade-tweet.herokuapp.com")}`
  };

  const ifEnter = (func: () => void) => {
    return (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'Enter') {
        func()
      }
    }
  };

  return (
    <div className="content">
      <div>
        <div
          tabIndex={0}
          className="button-flat red no-select"
          onClick={() => cycle(BACKWARD)}
          onKeyUp={ifEnter(() => cycle(BACKWARD))}
        >
          <i title="cycle backward" className="material-icons md-48">arrow_drop_up</i>
        </div>
        <div
          tabIndex={0}
          className="button-flat green no-select"
          onClick={next}
          onKeyUp={ifEnter(next)}
        >
          <i title="next character" className="material-icons md-48">check</i>
        </div>
      </div>
      <div>
        <div
          tabIndex={0}
          className="button-flat red no-select"
          onClick={() => cycle(FORWARD)}
          onKeyUp={ifEnter(() => cycle(FORWARD))}
        >
          <i title="cycle forward" className="material-icons md-48">arrow_drop_down</i>
        </div>
        <a tabIndex={0} href={getUrl()} title="tweet it">
          <div className="button-flat blue no-select">
            <img alt="twitter" className="twitter-logo" src={twitter}/>
          </div>
        </a>
      </div>

      <div className="tweet-characters">
        {tweet.map((charCode: number, i: number): ReactElement => {
          const activeClass = i === charIndex ? "active" : ""
          let characterToDisplay = <>{String.fromCharCode(charCode)}</>;
          if (charCode === CHAR_CODE_SPACE) {
            characterToDisplay = <>&nbsp;</>;
          }
          return (
            <div key={i} className={`character ${activeClass}`}>
              {characterToDisplay}
            </div>
          )
        })}
      </div>

      <div className="footer">
        <div>
            © 2020 <a href="http://anneloverso.com/">Anne LoVerso</a>
        </div>
        <div>
          <a href="https://twitter.com/AnneLoVerso">
            <img alt="twitter" src={twitter}/>
          </a>
        </div>
      </div>
    </div>
  );
};

export default App;
