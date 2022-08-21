import { Outlet } from 'react-router-dom';
import Footer from 'Components/Footer/Footer';
import SideMenu from 'Components/Menu/Menu';

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
