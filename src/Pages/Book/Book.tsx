import Loader from 'Components/Loader/Loader';
import WordList from 'Components/WordList/WordList';
import { WordsResponse } from 'models/models';
import { useGetWordsQuery } from 'store/rslang/words.api';

const Book = () => {
    const { isLoading: isWordsLoading, error: wordsError, data: words } = useGetWordsQuery({ page: 0, group: 0 });

    return (
        <>
            {wordsError && <h2>Произошла ошибка: {wordsError}</h2>}
            {isWordsLoading ? (
                <div style={{ display: 'flex', justifyContent: 'center', margin: 10 }}>
                    <Loader color="#23266e" />
                </div>
            ) : (
                <WordList words={words as WordsResponse} />
            )}
        </>
    );
};

export default Book;
