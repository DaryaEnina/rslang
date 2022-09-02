/* eslint-disable jsx-a11y/control-has-associated-label */
import SoundLogo from 'assets/icons/sound-logo.png';
import { AnsweredWord } from 'Pages/Games/Audiogame/Audiogame';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { clearAnsweredWordsReducer } from 'store/reducers/answeredWordsReducer';
import { setPageReducer } from 'store/reducers/pageSlice';
import './results.scss';

interface IRootState {
    answeredWords: {
        answeredWords: AnsweredWord[];
    };
    currentPage: {
        currentPage: number;
    };
}

interface IProps {
    seria: number;
    right: number;
    wrong: number;
}

const Results = (props: IProps) => {
    const { seria, right, wrong } = props;
    const dispatch = useDispatch();
    const currentPage = useSelector((state: IRootState) => state.currentPage.currentPage);
    const answeredWords = useSelector((state: IRootState) => state.answeredWords.answeredWords);

    function playAydio(audioEl: HTMLAudioElement) {
        audioEl.play();
    }

    function getPageNumber() {
        const newPage = Math.floor(Math.random() * 30);
        if (newPage === currentPage) {
            getPageNumber();
        } else {
            dispatch(setPageReducer(newPage));
        }
    }

    function toNextGame() {
        getPageNumber();
        dispatch(clearAnsweredWordsReducer());
    }

    return (
        <div className="game-result-wrapper">
            <div className="game-result">
                <p className="header page-header">Результаты игры:</p>
                <p className="header-text">Серия правильных ответов: {seria}</p>
                <p className="header-text">Процент верных ответов: {((right / (right + wrong)) * 100).toFixed(0)}%</p>
                <div className="result-wrapper">
                    <p className="header right">Я знаю: {String(right)}</p>
                    <div className="right-wrapper">
                        {answeredWords
                            .filter((el) => el.result)
                            .map((el) => {
                                const audio = new Audio(el.audio);
                                return (
                                    <div className="answer-card" key={el.english}>
                                        <button type="button" className="listen-btn" onClick={() => playAydio(audio)}>
                                            <img src={SoundLogo} alt="Sould" className="sound-logo" />
                                        </button>
                                        <span className="text bold">{el.english}</span>
                                        <span className="text"> - {el.translate}</span>
                                    </div>
                                );
                            })}
                    </div>
                    <p className="header wrong">Нужно подучить: {String(wrong)}</p>
                    <div className="wrong-wrapper">
                        {answeredWords
                            .filter((el) => !el.result)
                            .map((el) => {
                                const audio = new Audio(el.audio);
                                return (
                                    <div className="answer-card" key={el.english}>
                                        <button
                                            type="button"
                                            className="listen-btn"
                                            onClick={() => playAydio(audio)}
                                            style={{ backgroundImage: SoundLogo }}
                                        >
                                            <img src={SoundLogo} alt="Sould" className="sound-logo" />
                                        </button>
                                        <span className="text bold">{el.english}</span>
                                        <span className="text"> - {el.translate}</span>
                                    </div>
                                );
                            })}
                    </div>
                </div>
                <NavLink to="/games" className="new-game btn" onClick={() => toNextGame()}>
                    Новая игра
                </NavLink>
            </div>
        </div>
    );
};

export default Results;
