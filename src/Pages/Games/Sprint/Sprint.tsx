/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import Loader from 'Components/Loader/Loader';
import ModalResults from 'Components/Results/Results';
import { useEffect, useState } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { useDispatch } from 'react-redux';
import { useGetWordsQuery } from 'store/rslang/words.api';
import useSound from 'use-sound';
import RightSound from 'assets/sounds/correct.mp3';
import WrongSound from 'assets/sounds/incorrect.mp3';
import GameOver from 'assets/sounds/game-over.mp3';
import CorrectLogo from 'assets/icons/right-el.png';
import { useAppSelector } from 'hooks/redux';
import { IWord, WordsResponse } from 'models/models';
import { setAnsweredWordsReducer } from 'store/reducers/answeredWordsReducer';
import { DifficultyData, wordsToFill } from '../types';
import './sprint.scss';
import { resultsToStatSprintGame, setToStatNewWordSprint } from '../gamesUtils';

function Sprint() {
    const dispatch = useDispatch();
    const difficulty = useAppSelector((state) => state.gameDifficulty.changeDifficulty);
    const currentPage = useAppSelector((state) => state.currentPage.currentPage);
    const fromBookWords = useAppSelector((state) => state.currentWords.currentWords);
    const startFrom = useAppSelector((state) => state.startGameFrom.startGameFrom);
    const { isLogin, userId, token } = useAppSelector((state) => state.userLogin.userLogin);
    const { isLoading: boolLoad, data: dataFromGames } = useGetWordsQuery({
        page: currentPage,
        group: DifficultyData[difficulty],
    });

    function extraPage() {
        if (currentPage > 0 && currentPage <= 29) {
            return currentPage - 1;
        }
        return currentPage + 1;
    }

    const { isLoading: boolExtra, data: dataFromGamesExtra } = useGetWordsQuery({
        page: extraPage(),
        group: DifficultyData[difficulty],
    });

    const userIdStr = userId as string;
    const tokenStr = token as string;

    const [startGame, setStartGame] = useState<boolean>(false);
    const [timer, setTimer] = useState(60);

    const [answerStatus, setAnswerStatus] = useState<boolean>();
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [currentWordData, setCurrentWordData] = useState<IWord | null>(null);
    const [currentWord, setCurrentWord] = useState<string>('');
    const [answerWord, setAnswerWord] = useState<string>('');

    const [score, setScore] = useState<number>(0);
    const [rightToMulty, setRightToMulty] = useState<number>(0);
    const [multiplier, setMultiplier] = useState<number>(10);

    const [seria, setSeria] = useState(0);
    const [currSeria, setCurrSeria] = useState(0);
    const [wrongCount, setWrongCount] = useState(0);
    const [rightCount, setRightCount] = useState(0);

    const url = 'https://react-rslang-team.herokuapp.com/';

    const [rightAudio] = useSound(RightSound);
    const [wrongAudio] = useSound(WrongSound);
    const [gameOver] = useSound(GameOver);

    function shuffle(array: string[]): string[] {
        return array.sort(() => Math.random() - 0.5);
    }

    function isRightAnswer(): boolean {
        return Math.random() - 0.5 > 0;
    }

    if (boolLoad) {
        return (
            <>
                <p className="header page-header">Спринт</p>
                <div style={{ display: 'flex', justifyContent: 'center', margin: 10 }}>
                    <Loader color="#23266e" />
                </div>
            </>
        );
    }

    let concatedWords: WordsResponse;
    let gameWords: WordsResponse;
    try {
        concatedWords = dataFromGames!.concat(dataFromGamesExtra!);
        gameWords = isLogin && startFrom === 'book' ? fromBookWords : concatedWords;
    } catch {
        console.log("Data haven't been load");
    }

    const arr = [1, 2, 3];

    function nextWord() {
        const newIndex = currentIndex + 1;
        setCurrentIndex(newIndex);
        if (newIndex < gameWords!.length) {
            const currentData = gameWords![newIndex] as IWord;
            setCurrentWordData(currentData);
            setCurrentWord(currentData.word);
            setStartGame(true);
            const answerStat = isRightAnswer();
            setAnswerStatus(answerStat);
            setAnswerWord(answerStat ? currentData.wordTranslate : shuffle(wordsToFill)[0]);
        }
    }

    function checkAnswer(bool: boolean) {
        if (bool === answerStatus) {
            setRightCount(rightCount + 1);
            setCurrSeria(currSeria + 1);
            rightAudio();
            setToStatNewWordSprint();
            if (rightToMulty === 3) {
                setScore(score + 10 + multiplier * 2);
                setMultiplier(multiplier * 2);
                setRightToMulty(1);
            } else {
                setScore(score + 10);
                setRightToMulty(rightToMulty + 1);
            }
        } else {
            if (currSeria > seria) {
                setSeria(currSeria);
            }
            setWrongCount(wrongCount + 1);
            setCurrSeria(0);
            wrongAudio();
            setRightToMulty(0);
            setMultiplier(10);
            setToStatNewWordSprint();
        }
        dispatch(
            setAnsweredWordsReducer({
                audio: `${url}${currentWordData?.audio}`,
                result: bool === answerStatus,
                english: currentWordData?.word!,
                translate: currentWordData?.wordTranslate!,
            })
        );
        nextWord();
    }

    function keyHandler(e: KeyboardEvent) {
        if (e.code === 'ArrowLeft') {
            checkAnswer(true);
        }
        if (e.code === 'ArrowRight') {
            checkAnswer(false);
        }
    }

    useEffect(() => {
        if (startGame) {
            window.addEventListener('keyup', keyHandler);
        }
        return () => window.removeEventListener('keyup', keyHandler);
    });

    useEffect(() => {
        if (startGame) {
            const time = setTimeout(setTimer, 1000, timer - 1);
            if (timer <= 0) {
                gameOver();
                if (currSeria > seria) {
                    setSeria(currSeria);
                }
                clearTimeout(time);
                setTimeout(() => {
                    setStartGame(false);
                }, 1000);
            }
        }
    }, [currSeria, gameOver, seria, startGame, timer]);

    if (!currentWordData) {
        const currentData = gameWords![currentIndex] as IWord;
        setCurrentWordData(currentData);
        setCurrentWord(currentData.word);
        setStartGame(true);
        const answerStat = isRightAnswer();
        setAnswerStatus(answerStat);
        setAnswerWord(answerStat ? currentData.wordTranslate : shuffle(wordsToFill)[0]);
    }

    if ((timer === 0 && !startGame) || (!boolExtra && currentIndex === gameWords!.length)) {
        resultsToStatSprintGame(rightCount, wrongCount, seria);
        return <ModalResults seria={seria} wrong={wrongCount} right={rightCount} />;
    }

    return (
        <>
            <p className="header page-header">Спринт</p>
            {boolLoad ? (
                <div style={{ display: 'flex', justifyContent: 'center', margin: 10 }}>
                    <Loader color="#23266e" />
                </div>
            ) : (
                <div className="sprint-container">
                    <div className="timer-score">
                        <div className="timer">
                            <CountdownCircleTimer
                                isPlaying
                                size={46}
                                duration={60}
                                colors={['#009727', '#F7B801', '#A30000', '#A30000']}
                                colorsTime={[15, 10, 5, 0]}
                                strokeWidth={7}
                            >
                                {({ remainingTime }) => remainingTime}
                            </CountdownCircleTimer>
                        </div>
                        <div className="score">
                            <p className="text-score">Счет: {score}</p>
                        </div>
                    </div>
                    <div className="right-to-multy">
                        {arr.map((el) => {
                            if (el - rightToMulty > 0) {
                                return <div className="correct-answ" key={el} />;
                            }
                            return <img className="correct-answ" key={el} src={CorrectLogo} alt="Correct answer" />;
                        })}
                    </div>
                    <p className="combo">Комбо {multiplier}</p>
                    <div className="sprint-word-wrap">
                        <span className="text-word">{currentWord}</span>
                        <span className="text"> это </span>
                        <span className="text-word">{answerWord}</span>
                    </div>
                    <div className="buttons-container">
                        <button className="right-btn answer-btn" type="button" onClick={() => checkAnswer(true)}>
                            Верно
                        </button>
                        <button className="wrong-btn answer-btn" type="button" onClick={() => checkAnswer(false)}>
                            Неверно
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

export default Sprint;
