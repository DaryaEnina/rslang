/* eslint-disable @typescript-eslint/no-unused-vars */
import Loader from 'Components/Loader/Loader';
import WordList from 'Components/WordList/WordList';
import { AllDifficulties, WordsResponse } from 'models/models';
import Levels from 'Pages/Games/Levels';
import { DifficultyData } from 'Pages/Games/types';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { changeDifficultyReducer } from 'store/reducers/difficultyReducer';
import { startGameFromReducer } from 'store/reducers/startGameFromReducer';
import { useGetWordsQuery } from 'store/rslang/words.api';
import "./book.scss";

interface IRootState {
    gameDifficulty: {
      changeDifficulty: AllDifficulties
    },
    currentPage: {
      currentPage: number
    }
    userLogin: {
        userLogin: { isLogin: boolean, token: string | null, userId: string | null }
    },
    startGameFrom: {
      startGameFrom: string
    }
  }

const Book = () => {
    const dispatch = useDispatch();
    const difficulty = useSelector((state: IRootState) => state.gameDifficulty.changeDifficulty);
    const currentPage = useSelector((state: IRootState) => state.currentPage.currentPage);
    const userLogin = useSelector((state: IRootState) => state.userLogin.userLogin);
    const { isLogin, token, userId } = userLogin; 
    const { isLoading: isWordsLoading, error: wordsError, data: words } = useGetWordsQuery({ page: currentPage, group: DifficultyData[difficulty] });

    const [hardWordsPage, setHardWordsPage] = useState<boolean>(false);

    function setFrom() {
        dispatch(startGameFromReducer('book'));
    }

    function levelBtnHandler(lvl: string) {
        dispatch(changeDifficultyReducer(lvl));
    }

    function toHardWords() {
        setHardWordsPage(true);
    }

    return (
        <>
            <p className='header page-header'>Учебник</p>
            <nav className='textbook-nav'>
                <div className='level-nav'>
                    {Levels.map((el) => {
                        const { key, level, color } = el;
                        const classBtn = level === difficulty ? 'lvl-btn active' : 'lvl-btn';
                        const backgroundColor = level === difficulty ? color : 'transparent';
                        return (
                            <button className={classBtn} type="button" style={{ backgroundColor }}
                                onClick={() => levelBtnHandler(level)} key={key}>
                                <div className='text' >{level}</div>
                            </button>
                        )
                    })}
                    <button className='hard-words btn' type='button' onClick={() => toHardWords()}>
                        <div className='hard'>Сложные слова</div>
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
                        <section className='pagination-section'>
                            <div className='pag'>Pagination</div>
                        </section>
                    </>
            )}

        </>
    );
};

export default Book;
