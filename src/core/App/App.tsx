import { Route, Routes } from 'react-router-dom';

import Autorisation from '../../Pages/Login/Autorization/Autorization';
import Book from '../../Pages/Book/Book';
import Audiogame from '../../Pages/Games/Audiogame';
import Sprint from '../../Pages/Games/Sprint';

import Home from '../../Pages/Home/Home';
import Registration from '../../Pages/Login/Registration/Registration';
import Statistics from '../../Pages/Statistics/Statistics';
import Template from '../../Pages/Template/Template';
import Games from '../../Pages/Games/Games';

import '../../Pages/Login/LogIn.css';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Template />}>
                <Route path="/" element={<Home />} />
                <Route path="/signin" element={<Autorisation />} />
                <Route path="/signup" element={<Registration />} />
                <Route path="/statistics" element={<Statistics />} />
                <Route path="/games" element={<Games />} />
                <Route path="/audiogame" element={<Audiogame />} />
                <Route path="/sprint" element={<Sprint />} />
                <Route path="/book/:group/:page" element={<Book />} />
            </Route>
        </Routes>
    );
}

export default App;
