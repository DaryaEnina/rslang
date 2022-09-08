import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { setPageReducer } from 'store/reducers/pageSlice';
import styles from './Pagination.module.scss';

interface IPaginationProps {
    currentPage: number;
    totalPages: number;
    isAllWordsHardOrLearned: boolean;
}

const Pagination: FC<IPaginationProps> = ({ currentPage, totalPages, isAllWordsHardOrLearned }) => {
    const dispatch = useDispatch();

    return (
        <div className={styles.pagination}>
            <button
                type="button"
                className={styles.pagination__btn}
                disabled={currentPage + 1 < 3}
                onClick={() => dispatch(setPageReducer(0))}
            >
                <i className={`material-icons ${styles.pagination__icon}`}>keyboard_double_arrow_left</i>
            </button>
            <button
                type="button"
                className={styles.pagination__btn}
                disabled={currentPage + 1 === 1}
                onClick={() => dispatch(setPageReducer(currentPage - 1))}
            >
                <i className={`material-icons ${styles.pagination__icon}`}>keyboard_arrow_left</i>
            </button>
            <span className={styles.pagination__text}>
                <span
                    style={{
                        backgroundColor: isAllWordsHardOrLearned ? '#90ee90' : 'transparent',
                        borderRadius: isAllWordsHardOrLearned ? '50%' : 'transparent',
                    }}
                >
                    {currentPage + 1}
                </span>{' '}
                / {totalPages}
            </span>
            <button
                type="button"
                className={styles.pagination__btn}
                disabled={currentPage + 1 === totalPages}
                onClick={() => dispatch(setPageReducer(currentPage + 1))}
            >
                <i className={`material-icons ${styles.pagination__icon}`}>keyboard_arrow_right</i>
            </button>
            <button
                type="button"
                className={styles.pagination__btn}
                disabled={currentPage + 1 > totalPages - 2}
                onClick={() => dispatch(setPageReducer(totalPages - 1))}
            >
                <i className={`material-icons ${styles.pagination__icon}`}>keyboard_double_arrow_right</i>
            </button>
        </div>
    );
};

export default Pagination;
