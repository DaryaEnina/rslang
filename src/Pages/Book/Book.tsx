/* eslint-disable @typescript-eslint/no-unused-vars */
import Loader from 'Components/Loader/Loader';
import Pagination from 'Components/Pagination/Pagination';
import WordList from 'Components/WordList/WordList';
import { WordsResponse } from 'models/models';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import Levels from 'Pages/Games/Levels';
import { DifficultyData } from 'Pages/Games/types';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { changeDifficultyReducer } from 'store/reducers/difficultyReducer';
import { startGameFromReducer } from 'store/reducers/startGameFromReducer';
import { setPageReducer } from 'store/reducers/pageSlice';
import { useGetWordsQuery } from 'store/rslang/words.api';
import getPageCount from 'Utils/pages';
import './book.scss';


const WORDS_PER_PAGE = 20;
const WORDS_PER_GROUP = 600;

const Book = () => {
    const dispatch = useAppDispatch();
    const difficulty = useAppSelector((state) => state.gameDifficulty.changeDifficulty);
    const currentPage = useAppSelector((state) => state.currentPage.currentPage);
    const {
        isLoading: isWordsLoading,
        error: wordsError,
        data: words,
    } = useGetWordsQuery({ page: currentPage, group: DifficultyData[difficulty as keyof typeof DifficultyData] });

    const [hardWordsPage, setHardWordsPage] = useState<boolean>(false);
    const [limit] = useState(WORDS_PER_PAGE);
    const [totalPages] = useState(getPageCount(WORDS_PER_GROUP, limit));

    function setFrom() {
        dispatch(startGameFromReducer('book'));
    }

    function levelBtnHandler(lvl: string) {
        dispatch(changeDifficultyReducer(lvl));
        dispatch(setPageReducer(0));
    }

    function toHardWords() {
        setHardWordsPage(true);
    }

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
                    <button className="hard-words btn" type="button">
                        <div className="hard">Сложные слова</div>
                    </button>
                </div>
                <div className='games-nav'>
                    <NavLink to="/audiogame-main" className="game-btn" onClick={() => setFrom()}>
                        <span className='game-link'>Аудиовызов</span></NavLink>
                    <NavLink to="/sprint" className="game-btn" onClick={() => setFrom()}>
                        <span className='game-link'>Спринт</span></NavLink>

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
