import { FC } from 'react';
import styles from './Loader.module.scss';

interface ILoaderProps {
    color: string;
}

const Loader: FC<ILoaderProps> = ({ color }) => {
    return (
        <div className={styles['lds-ripple']}>
            <div style={{ borderColor: color }} />
            <div style={{ borderColor: color }} />
        </div>
    );
};

export default Loader;
