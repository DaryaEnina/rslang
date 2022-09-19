/* eslint-disable @typescript-eslint/no-unused-vars */
import { ReactComponent as BookmarkIcon } from 'assets/icons/bookmark.svg';
import { ReactComponent as CheckmarkIcon } from 'assets/icons/checkmark.svg';
import VolumeIcon from 'assets/icons/sound-logo.png';
import { useAppSelector } from 'hooks/redux';
import parse from 'html-react-parser';
import { Difficulty, IWord } from 'models/models';
import { learnedToStat } from 'Pages/Games/gamesUtils';
import Levels from 'Pages/Games/Levels';
import { FC, useState } from 'react';
import { useCreateUserWordMutation, useUpdateUserWordMutation } from 'store/rslang/usersWords.api';
import styles from './Word.module.scss';

const BASE_URL = 'https://react-rslang-team.herokuapp.com/';
const audioPlayer = new Audio('');

interface IWordProps {
    word: IWord;
}

const Word: FC<IWordProps> = ({ word }) => {
    const [isWordDifficult, setIsWordDifficult] = useState<boolean>(word.userWord?.difficulty === 'hard');
    const [isWordLearned, setIsWordLearned] = useState<boolean>(word.userWord?.difficulty === 'learned');

    const [createUserWord] = useCreateUserWordMutation();
    const [updateUserWord] = useUpdateUserWordMutation();

    const difficulty = useAppSelector((state) => state.gameDifficulty.changeDifficulty);
    const gameLevel = Levels.find((el) => el.level === difficulty);

    const { isLogin, userId, token } = useAppSelector((state) => state.userLogin.userLogin);

    const audioHandler = () => {
        let soundCounter = 0;

        audioPlayer.src = `${BASE_URL}${word.audio}`;

        if (audioPlayer.paused) {
            audioPlayer.play();
            soundCounter += 1;
        } else {
            audioPlayer.pause();
        }

        audioPlayer.addEventListener('ended', () => {
            switch (soundCounter) {
                case 1:
                    audioPlayer.src = `${BASE_URL}${word.audioMeaning}`;
                    audioPlayer.play();
                    soundCounter += 1;
                    break;
                case 2:
                    audioPlayer.src = `${BASE_URL}${word.audioExample}`;
                    audioPlayer.play();
                    soundCounter = 0;
                    break;

                default:
                    break;
            }
        });
    };

    async function addToUserWords(newDifficulty: Difficulty) {
        const wordId = word._id as string;
        if (word.userWord && word.userWord.difficulty && word.userWord.optional) {
            const { optional } = word.userWord;
            const newWordInfo = { difficulty: newDifficulty, optional };
            await updateUserWord({ userId, wordId, wordInfo: newWordInfo, token });
        } else {
            const data = { difficulty: newDifficulty, optional: { rightAnswers: 0, wrongAnswers: 0, rightInRow: 0, date: new Date() } };
            await createUserWord({ userId, wordId, wordInfo: data, token });
        }
    }

    async function addWordToHard() {
        if (isWordDifficult) {
            setIsWordDifficult(false);
            await addToUserWords('new');
        } else {
            setIsWordDifficult(true);
            if (isWordLearned) setIsWordLearned(false);
            await addToUserWords('hard');
        }
    }

    async function addWordToLearned() {
        if (isWordLearned) {
            setIsWordLearned(false);
            await addToUserWords('new');
        } else {
            setIsWordLearned(true);
            if (isWordDifficult) setIsWordDifficult(false);
            await addToUserWords('learned');
        }
    }

    return (
        <div className={styles.word}>
            <div
                className={styles.word__top}
                style={{
                    backgroundImage: `url(${BASE_URL}${word.image})`,
                    borderLeft: `10px solid ${gameLevel ? gameLevel?.color : 'rgb(210, 42, 48)'}`,
                }}
            >
                <div className={styles.word__overlay}>
                    {isLogin && (
                        <div className={styles.word__buttons}>
                            <button type="button" onClick={addWordToHard} className={styles.word__btn}>
                                <BookmarkIcon className={styles.bookmark} fill={isWordDifficult ? '#d22a30' : '#111'} />
                            </button>
                            <button type="button" onClick={addWordToLearned} className={styles.word__btn}>
                                <CheckmarkIcon className={styles.checkmark} fill={isWordLearned ? '#90ee90' : '#111'} />
                            </button>
                            {word.userWord && word.userWord?.difficulty && word.userWord?.optional  && (
                                <div className={styles.word__stat}>
                                    <span className={styles.word__right} title="Правильных ответов">
                                        {word.userWord.optional.rightAnswers}
                                    </span>{' '}
                                    |{' '}
                                    </span>
                                </div>
                            )}
                        </div>
                    )}
                    <h3 className={styles.word__title}>{word.word}</h3>
                    <div className={styles.word__description}>
                        <div className={styles.word__translate}>{word.wordTranslate}</div>
                        <div className={styles.word__transcription}>{word.transcription}</div>
                        <button type="button" onClick={audioHandler} className={styles.word__btn}>
                            <img src={VolumeIcon} className={styles.volume} alt="Volume icon" />
                        </button>
                    </div>
                </div>
            </div>
            <div className={styles.word__body}>
                <div className={styles.word__content}>
                    <p className={styles.word__text}>{parse(word.textMeaning)}</p>
                    <p className={`${styles.word__text} ${styles.word__text_translate}`}>{word.textMeaningTranslate}</p>
                </div>
                <div className={styles.word__content}>
                    <p className={styles.word__text}>{parse(word.textExample)}</p>
                    <p className={`${styles.word__text} ${styles.word__text_translate}`}>{word.textExampleTranslate}</p>
                </div>
            </div>
        </div>
    );
};

export default Word;
