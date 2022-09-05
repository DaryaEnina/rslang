/* eslint-disable import/no-named-as-default */
/* eslint-disable @typescript-eslint/no-unused-vars */

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
import { WordsResponse } from 'models/models';
import BookWords from './BookWords';
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

    const { isLogin } = useAppSelector((state) => state.userLogin.userLogin);

    const [hardWordsPage, setHardWordsPage] = useState<boolean>(difficulty === 'HARD');
    const [limit] = useState(WORDS_PER_PAGE);
    const [totalPages] = useState(getPageCount(WORDS_PER_GROUP, limit));

    function setFrom() {
        dispatch(startGameFromReducer('book'));
    }

    function levelBtnHandler(lvl: string) {
        setHardWordsPage(false);
        dispatch(changeDifficultyReducer(lvl));
        dispatch(setPageReducer(0));
    }

    function toHardWords() {
        setHardWordsPage(true);
        dispatch(changeDifficultyReducer('HARD'));
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
                    <button className="hard-words btn" type="button" disabled={!isLogin} onClick={toHardWords} style={{ background: hardWordsPage ? 'rgb(210, 42, 48)' : '' }}>
                        <div className="hard">Сложные слова</div>
                    </button>
                </div>
                <div className='games-nav'>
                    <NavLink to="/audiogame-main" className="game-btn" onClick={() => setFrom()}>
                        <span className='game-link'>Аудиовызов</span></NavLink>
                    <NavLink to="/sprint-main" className="game-btn" onClick={() => setFrom()}>
                        <span className='game-link'>Спринт</span></NavLink>

                </div>
            </nav>
            {wordsError && <h2>Произошла ошибка: {wordsError}</h2>}
            <BookWords isWordsLoading={isWordsLoading} words={words as WordsResponse} difficulty={DifficultyData[difficulty as keyof typeof DifficultyData]}
                currentPage={currentPage} totalPages={totalPages} hardWordsPage={hardWordsPage} />
        </div>
    );
};

export default Book;
