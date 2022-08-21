import { Outlet } from 'react-router-dom';
import SideMenu from 'Components/Menu/Menu';
import Footer from '../../Components/Footer/Footer';

import './style.scss';

function Template() {
    return (
        <div id="outer-container">
            <SideMenu />
            <main id="page-wrap" className="main-container">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}

export default Template;
