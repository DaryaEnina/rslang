import Loader from 'Components/Loader/Loader';
import Pagination from 'Components/Pagination/Pagination';
import WordList from 'Components/WordList/WordList';
import { useAppSelector } from 'hooks/redux';
import { WordsResponse } from 'models/models';
import { useGetUserAggregatedWordsQuery } from 'store/rslang/usersWords.api';

interface IProps {
    isWordsLoading: boolean;
    words: WordsResponse;
    difficulty: number;
    currentPage: number;
    totalPages: number;
    hardWordsPage: boolean;
}

const BookWords = (props: IProps) => {
    const { isWordsLoading, words, difficulty, currentPage, totalPages, hardWordsPage } = props;

    const { isLogin, userId, token } = useAppSelector((state) => state.userLogin.userLogin);

    const optional = hardWordsPage
        ? { wordsPerPage: 3600, filter: '{"$and":[{"userWord.difficulty":"hard"}]}' }
        : { wordsPerPage: 20, group: difficulty, page: currentPage };

    const { isLoading: isCommonWordsLoading, data: commonWords } = useGetUserAggregatedWordsQuery({
        userId,
        token,
        optional,
    });

    if (hardWordsPage) {
        return isCommonWordsLoading ? (
            <div style={{ display: 'flex', justifyContent: 'center', margin: 10 }}>
                <Loader color="#23266e" />
            </div>
        ) : (
            <WordList words={commonWords![0].paginatedResults as WordsResponse} />
        );
    }
    return isWordsLoading || isCommonWordsLoading ? (
        <div style={{ display: 'flex', justifyContent: 'center', margin: 10 }}>
            <Loader color="#23266e" />
        </div>
    ) : (
        <>
            <WordList words={isLogin ? commonWords![0].paginatedResults : (words as WordsResponse)} />
            <Pagination currentPage={currentPage} totalPages={totalPages} />
        </>
    );
};

export default BookWords;
