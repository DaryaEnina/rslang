/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/media-has-caption */
import useSound from 'use-sound';
import { useEffect, useState } from "react";
import SoundLogo from "assets/icons/sound-logo.png";
import AttemptLogo from "assets/icons/attempt.jpeg";
import Empty from "assets/icons/empty.png";
import QuestionMark from "assets/images/question-mark.png";
import "./audiogame.scss";
import { useDispatch, useSelector } from "react-redux";
import { AllDifficulties, IWord, WordsResponse } from "models/models";
import { useGetWordsQuery } from "store/rslang/words.api";
import ModalResults from "Components/Results/Results";
import { setAnsweredWordsReducer } from "store/reducers/answeredWordsReducer";
import RightSound from "assets/sounds/correct.mp3";
import WrongSound from "assets/sounds/incorrect.mp3";
import Loader from 'Components/Loader/Loader';
import { DifficultyData, wordsToFill } from "../types";


interface IRootState {
  gameDifficulty: {
    changeDifficulty: AllDifficulties
  },
  answeredWords: {
    answeredWords: AnsweredWord[]
  },
  currentPage: {
    currentPage: number
  },
  currentWords: {
    currentWords: WordsResponse
  },
  userLogin: {
    userLogin: { isLogin: boolean, token: string | null, userId: string | null }
  },
  startGameFrom: {
    startGameFrom: string
  }
}

export type AnsweredWord = {
    audio: string;
    result: boolean;
    english: string;
    translate: string;
};

function Audiogame() {

  const dispatch = useDispatch();
  const difficulty = useSelector((state: IRootState) => state.gameDifficulty.changeDifficulty);
  const currentPage = useSelector((state: IRootState) => state.currentPage.currentPage);
  const fromBookWords = useSelector((state: IRootState) => state.currentWords.currentWords);
  const answeredWords = useSelector((state: IRootState) => state.answeredWords.answeredWords);
  const startFrom = useSelector((state: IRootState) => state.startGameFrom.startGameFrom);
  const { isLogin, userId, token } = useSelector((state: IRootState) => state.userLogin.userLogin);
  const { isLoading: boolLoad, data: dataFromGames } = useGetWordsQuery({ page: currentPage, group: DifficultyData[difficulty] });

  const userIdStr = userId as string;
  const tokenStr = token as string;

  const gameWords = (isLogin && startFrom === 'book') ? fromBookWords : dataFromGames;
  
  const [startGame, setStartGame] = useState(true);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [attempt, setAttempt] = useState(5);
  const [currentWordNumber, setCurrentWordNumber] = useState(1);
  const [currentWordData, setCurrentWordData] = useState<IWord>();
  const [answered, setAnswered] = useState(false);
  const [wordAudio, setWordAudio] = useState<HTMLAudioElement>();
  const [imgLink, setImgLink] = useState<string>('');
  const [blockButtons, setBlockButtons] = useState<boolean>(false);
  const [resultStats, setResultStats] = useState<boolean>(false);
  const [rightAnswer, setRightAnswer] = useState<string>('');
  const [wordsAnswers, setWordsAnswers] = useState<string[]>([]);

  const [seria, setSeria] = useState(0);
  const [currSeria, setCurrSeria] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [rightCount, setRightCount] = useState(0);

  const url = 'https://react-rslang-team.herokuapp.com/';

  const [rightAudio] = useSound(RightSound);
  const [wrongAudio] = useSound(WrongSound);

  function shuffle(array: string[]): string[] {
    return array.sort(() => Math.random() - 0.5);
  }

  function generateWords(currentWord: string) {
    let shuffled = shuffle(wordsToFill);
    if (shuffled.includes(rightAnswer)) {
      shuffled = shuffled.filter((el) => el !== rightAnswer);
    }
    const resArr = [currentWord, ...shuffled].slice(0, 5);
    setWordsAnswers(shuffle(resArr));
  }

  function getWords(wordNum: number) {
    if (gameWords) {
      const currentWD = gameWords[wordNum - 1];
      setCurrentWordData(currentWD);
      setRightAnswer(currentWD.wordTranslate);
      generateWords(currentWD.wordTranslate);
    }
  }

  function decreaseAttempts() {
    if (attempt >= 1) {
      setAttempt(attempt - 1);
    } else {
      setStartGame(false);
      setResultStats(true);
    }
  }

  function playWord(target: HTMLAudioElement) {
    target.play();
  }
 
  function checkAnswer(elem: HTMLElement, wordToCheck: string) {
    setBlockButtons(true);
    setAnswered(true);
    setShowResult(true);
    elem.classList.add(wordToCheck === rightAnswer ? 'right' : 'wrong');
    if (wordToCheck !== rightAnswer) {
      if (currSeria > seria) {
        setSeria(currSeria);
      }
      wrongAudio();
      setCurrSeria(0);
      setWrongCount(wrongCount + 1);
      decreaseAttempts();
    } else {
      rightAudio();
      setRightCount(rightCount + 1);
      setCurrSeria(currSeria + 1);
    }

    dispatch(setAnsweredWordsReducer({
      audio: `${url}${currentWordData?.audio}`,
      result: wordToCheck === rightAnswer,
      english: currentWordData?.word!,
      translate: currentWordData?.wordTranslate!
    }))
  }

  function toNextWord() {
    const nextWordNumber = currentWordNumber + 1;
    const allAnswerButtons = document.querySelectorAll('.choose-word');
    allAnswerButtons.forEach((el) => {
      el.classList.remove('right');
      el.classList.remove('wrong');
    });

    if (nextWordNumber <= 20) {
      setCurrentWordNumber(nextWordNumber);
      setAnswered(false);
      setBlockButtons(false);
      setShowResult(false);
      getWords(nextWordNumber);
    } else {
      if (currSeria > seria) {
        setSeria(currSeria);
      }
      setStartGame(false);
      setAnswered(false);
      setBlockButtons(false);
      setShowResult(false);
      setResultStats(true);
    }
  }

  const arr = [1, 2, 3, 4, 5];

  function keyCheckAnswer(_event: KeyboardEvent, key: number) {
    if (!blockButtons) {
      setBlockButtons(true);
      const index = key - 1;
      const thisAnswerButtons = document.querySelectorAll('.choose-word')[index];
      checkAnswer(thisAnswerButtons as HTMLElement, wordsAnswers[index]);
    }
  }

  if (!currentWordData) {
    if (!boolLoad && !!gameWords!.length) {
      try {
        getWords(1);
        const current = gameWords![currentWordNumber - 1];
        setCurrentWordData(current);
        setRightAnswer(current.wordTranslate!);
      } catch {
        console.log('Error!');
      }
    }
  }

  function keyHandler(e: KeyboardEvent) {
    e.preventDefault();
    const key = Number(e.key);
    if (arr.includes(key)) {
      keyCheckAnswer(e, key);
    } else if (e.code === 'Space') {
      wordAudio?.play();
    } else if (e.code === 'Enter') {
      decreaseAttempts();
      toNextWord();
    }
  }

  useEffect(() => {
    if (!showResult && startGame) {
      window.addEventListener('keyup', keyHandler);
    }
    return () => window.removeEventListener('keyup', keyHandler);
  });

  useEffect(() => {
    if (currentWordData?.audio && startGame) {
      const audioComponent = new Audio(`${url}${currentWordData?.audio}`);
      setWordAudio(audioComponent);
      setImgLink(`${url}${currentWordData?.image}`);
      audioComponent.play();
    }
  }, [currentWordData?.audio, currentWordData?.image, startGame]);

  function AnswerButtons() {
    
    return arr.map((el) => (
      <button type="button" key={el} disabled={blockButtons}
        className="choose-word btn" onClick={(e) => checkAnswer(e.currentTarget ,wordsAnswers[el - 1])}>
          {el}. {wordsAnswers[el - 1]}
      </button>
    ));
  }

  if (!startGame && resultStats) {
    return <ModalResults seria={seria} right={rightCount} wrong={wrongCount} />;
  }

  return (
    <>
      <p className="header page-header">Аудиовызов</p>
      {boolLoad ? (
        <div style={{ display: 'flex', justifyContent: 'center', margin: 10 }}>
          <Loader color="#23266e" />
        </div>
      )
        : (
          <>
            <div className="game-container">
              <button type="button" className="play-word" 
                onClick={(e) => playWord((e.currentTarget.firstChild as HTMLAudioElement))}>
                <audio className="play-word" src={`${url}${currentWordData?.audio}`} />
                <img src={SoundLogo} className="play-img" alt="Play word button" />
              </button>

              <div className="words">
                <p className="english-word text">{answered ? currentWordData?.word : " "}</p>
                <p className="russian-word text">{answered ? currentWordData?.wordTranslate : " "}</p>
              </div>
              <div className="try-container">
                <p className="try-count">Попытки: {attempt}</p>
                <p className="word-progress">{currentWordNumber} / {gameWords!.length}</p>
              </div>
            </div>
            <div className="attempts-card-img">
              <div className="attempt-container">
                {arr.map((el) => {
                  const image = (el + attempt) / 2 >= 3 ? AttemptLogo : Empty;
                  return (
                    <div className="attempt" key={el}>
                      <img src={image} className="attempt-logo" alt="Attempt logo" />
                    </div>
                  )
                })}
              </div>
              <div className="word-image-div">
                <img src={answered ? imgLink : QuestionMark} alt={answered ? "Word" : "Question mark"} className="word-image" />
              </div>
            </div>
            <div className="answer-words-container">
              {AnswerButtons()}
            </div>
            <div className="next-word-container">
              <button type="button" className="next-word btn" onClick={toNextWord}>
                {currentWordNumber === 20 ? 'Завершить игру' : 'Следующее слово'}</button>
            </div>
          </>
        )}
    </>
  );
};

export default Audiogame;
