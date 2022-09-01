import Loader from 'Components/Loader/Loader';
import Pagination from 'Components/Pagination/Pagination';
import WordList from 'Components/WordList/WordList';
import { AllDifficulties, WordsResponse } from 'models/models';
import { AnsweredWord } from 'Pages/Games/Audiogame/Audiogame';
import Levels from 'Pages/Games/Levels';
import { DifficultyData } from 'Pages/Games/types';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { changeDifficultyReducer } from 'store/reducers/difficultyReducer';
import { setPageReducer } from 'store/reducers/pageReducer';
import { useGetWordsQuery } from 'store/rslang/words.api';
import getPageCount from 'Utils/pages';
import './book.scss';

interface IRootState {
    gameDifficulty: {
        changeDifficulty: AllDifficulties;
    };
    answeredWords: {
        answeredWords: AnsweredWord[];
    };
    currentPage: {
        currentPage: number;
    };
    userLogin: {
        userLogin: { isLogin: boolean; token: string | null; userId: string | null };
    };
}

const WORDS_PER_PAGE = 20;
const WORDS_PER_GROUP = 600;

const Book = () => {
    const dispatch = useDispatch();
    const difficulty = useSelector((state: IRootState) => state.gameDifficulty.changeDifficulty);
    const currentPage = useSelector((state: IRootState) => state.currentPage.currentPage);
    // const userLogin = useSelector((state: IRootState) => state.userLogin.userLogin);
    // const { isLogin } = userLogin;
    //    const answeredWords = useSelector((state: IRootState) => state.answeredWords.answeredWords);
    const {
        isLoading: isWordsLoading,
        error: wordsError,
        data: words,
    } = useGetWordsQuery({ page: currentPage, group: DifficultyData[difficulty] });

    // const [hardWordsPage, setHardWordsPage] = useState<boolean>(false);
    const [limit] = useState(WORDS_PER_PAGE);
    const [totalPages] = useState(getPageCount(WORDS_PER_GROUP, limit));

    function levelBtnHandler(lvl: string) {
        dispatch(changeDifficultyReducer(lvl));
        dispatch(setPageReducer(0));
    }

    // function toHardWords() {
    //     setHardWordsPage(true);
    // }

    // if (hardWordsPage) {
    //     return isLogin ? (
    //         <h1>This hard words Page</h1>
    //     ) : (
    //         <h1>Для доступа к данному разделу необходимо авторизоваться</h1>
    //     );
    // }

    return (
        <div className="book">
            <p className="header page-header">Учебник</p>
            <nav className="textbook-nav">
                <div className="level-nav">
                    {Levels.map((el) => {
                        const { key, level, color } = el;
                        const classBtn = level === difficulty ? 'lvl-btn active' : 'lvl-btn';
                        const backgroundColor = level === difficulty ? color : 'transparent';
                        return (
                            <button
                                className={classBtn}
                                type="button"
                                style={{ backgroundColor }}
                                onClick={() => levelBtnHandler(level)}
                                key={key}
                            >
                                <div className="text">{level}</div>
                            </button>
                        );
                    })}
                    {/* <button className="hard-words btn" type="button" onClick={() => toHardWords()}>
                        <div className="hard">Сложные слова</div>
                    </button> */}
                </div>
                <div className="games-nav">
                    <NavLink to="/audiogame" className="game-btn">
                        <span className="game-link">Аудиовызов</span>
                    </NavLink>
                    <NavLink to="/sprint" className="game-btn">
                        <span className="game-link">Спринт</span>
                    </NavLink>
                </div>
            </nav>
            {wordsError && <h2>Произошла ошибка: {wordsError}</h2>}
            {isWordsLoading ? (
                <div style={{ display: 'flex', justifyContent: 'center', margin: 10 }}>
                    <Loader color="#23266e" />
                </div>
            ) : (
                <>
                    <WordList words={words as WordsResponse} />
                    <Pagination currentPage={currentPage} totalPages={totalPages} />
                </>
            )}
        </div>
    );
};

export default Book;
