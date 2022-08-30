import { ReactComponent as BookmarkIcon } from 'assets/icons/bookmark.svg';
import { ReactComponent as CheckmarkIcon } from 'assets/icons/checkmark.svg';
import VolumeIcon from 'assets/icons/sound-logo.png';
import parse from 'html-react-parser';
import { IWord } from 'models/models';
import { FC } from 'react';
import styles from './Word.module.scss';

const BASE_URL = 'https://react-rslang-team.herokuapp.com/';
const audioPlayer = new Audio('');

interface IWordProps {
    word: IWord;
}

const Word: FC<IWordProps> = ({ word }) => {
    const userToken = localStorage.getItem('token');

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

    const addWordToHard = () => {};

    return (
        <div className={styles.word}>
            <div className={styles.word__top} style={{ backgroundImage: `url(${BASE_URL}${word.image})` }}>
                <div className={styles.word__overlay}>
                    {userToken && (
                        <div className={styles.word__buttons}>
                            <button type="button" onClick={addWordToHard} className={styles.word__btn}>
                                <BookmarkIcon className={styles.bookmark} fill="#111" />
                            </button>
                            <button type="button" className={styles.word__btn}>
                                <CheckmarkIcon className={styles.checkmark} fill="#111" />
                            </button>
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
