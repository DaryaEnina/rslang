/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import SoundLogo from "assets/icons/sound-logo.png";
import AttemptLogo from "assets/icons/attempt.jpeg";
import Empty from "assets/icons/empty.png";
import QuestionMark from "assets/images/question-mark.png";
import "./audiogame.scss";
import { useDispatch, useSelector } from "react-redux";
import { AllDifficulties, IWord, WordsResponse } from "models/models";
import { useGetWordsQuery } from "store/rslang/words.api";
import { setPageReducer } from "store/reducers/pageReducer";
import { DifficultyData } from "../types";


interface IRootState {
  gameDifficulty: {
    changeDifficulty: AllDifficulties
  },
  currentWords: {
    currentWords: WordsResponse
  },
  currentPage: {
    currentPage: number
  }
  rslangApi: {
    queries: {
      getWords: WordsResponse
    }
  }
}

function Audiogame() {


  const dispatch = useDispatch();
  const difficulty = useSelector((state: IRootState) => state.gameDifficulty.changeDifficulty);
  const currentPage = useSelector((state: IRootState) => state.currentPage.currentPage);

  const words = useSelector((state: IRootState) => state.rslangApi.queries);

  const [startGame, setStartGame] = useState(false);
  const [attempt, setAttempt] = useState(5);
  const [currentWord, setCurrentWord] = useState(1);
  const [currentWordData, setCurrentWordData] = useState<IWord>();
  const [answered, setAnswered] = useState(false);
  const { data, isLoading } = useGetWordsQuery({ page: currentPage, group: DifficultyData[difficulty] });

  const url = 'https://react-rslang-team.herokuapp.com/';

  function getPageNumber() {
    const newPage = Math.floor(Math.random() * 30);
    if (newPage === currentPage) {
      getPageNumber();
    } else {
      dispatch(setPageReducer(newPage));
    }
    
  }

  function getWords(): IWord | undefined {
    let wordsData: WordsResponse;
    
    if (!isLoading) {
      wordsData = data as WordsResponse;
      console.log(wordsData);
      const currentWD = wordsData[currentWord - 1];
      console.log(currentWD);
      return currentWD;
    }
    return undefined;
  }

  function playWord(target: HTMLAudioElement) {
    target.play();
  }

  function decreaseAttempts() {
    if (attempt > 1) {
      setAttempt(attempt - 1);
    }
    
  }

  function Start() {
    setStartGame(!startGame);
    setCurrentWordData(getWords());
  }
 
  function checkAnswer() {
    setAnswered(!answered);
  }

  function toNextWord() {
    setCurrentWord(currentWord + 1);
    setCurrentWordData(getWords());
    setAnswered(false);
  }

  const arr = [1, 2, 3, 4, 5];


  return (
    <>
      <p className="header">Аудиовызов</p>
      {!startGame ? (
        <div className="rules-container">
          <p className="text">«Аудиовызов» - игра, улучшающая восприятие речи на слух.</p>
          <p className="header">Правила</p>
          <p className="text">
            Слушай слово на английском языке и выбирай правильный перевод.<br />
            При неверном ответе сгорает одна попытка.<br />
            Неверно ответить можно не более пяти раз.
          </p>
          <p className="header">Управление</p>
          <p className="text">Левыя клавиша мыши и 1-5 для выбора ответа<br />
            Клавиша Enter для перехода к следующему слову<br />
            Клавиша пробел для повторного прослушивания слова
          </p>
          <button type="button" className="start-btn btn" onClick={Start}>Старт</button>
        </div>
      )
        : (
          <>
            <div className="game-container">
              <button type="button" className="play-word" onClick={(e) => playWord((e.currentTarget.firstChild as HTMLAudioElement))}>
                <audio className="play-word" src={`${url}${currentWordData?.audio!}`} />
                <img src={SoundLogo} className="play-img" alt="Play word button" />
              </button>

              <div className="words">
                <p className="english-word text">{answered ? currentWordData?.word : " "}</p>
                <p className="russian-word text">{answered ? currentWordData?.wordTranslate : " "}</p>
              </div>
              <div className="try-container">
                <p className="try-count">Попытки: {attempt}</p>
                <p className="word-progress">{currentWord} / 20</p>
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
                <img src={answered ? `${url}${currentWordData?.image}` : QuestionMark} alt={answered ? "Word" : "Question mark"} className="word-image" />
              </div>
            </div>
            <div className="answer-words-container">
              {arr.map((el) => (
                <button type="button" key={el}
                  className="choose-word btn" onClick={checkAnswer}>{el}. Hi</button>
              )
              )}
            </div>
            <div className="next-word-container">
              <button type="button" className="next-word btn" onClick={toNextWord}>Следующее слово</button>
            </div>
          </>
        )}
    </>
  );
};
export default Audiogame;
