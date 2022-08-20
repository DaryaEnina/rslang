import { Outlet } from 'react-router-dom';
import Footer from 'Components/Footer/Footer';

import './style.scss';

function Template() {
  return (
    <>
      <main className="main-container">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default Template;
