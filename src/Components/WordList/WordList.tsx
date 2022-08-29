import { WordsResponse } from 'models/models';
import { FC } from 'react';
import Word from './Word/Word';
import styles from './WordList.module.scss';

interface IWordListProps {
    words: WordsResponse;
}

const WordList: FC<IWordListProps> = ({ words }) => {
    return (
        <div className={styles['word-list']}>
            {words?.map((word) => (
                <Word key={word.id} word={word} />
            ))}
        </div>
    );
};

export default WordList;
