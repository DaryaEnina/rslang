import { Outlet } from 'react-router-dom';
import Footer from '../../Components/Footer/Footer';
import Header from '../../Components/Header/Header';

import './style.scss';

function Template() {
    return (
        <>
            <Header />
            <main className="main-container">
                <Outlet />
            </main>
            <Footer />
        </>
    );
}

export default Template;
