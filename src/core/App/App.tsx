import { Route, Routes } from 'react-router-dom';

import Autorisation from 'Pages/Login/Autorization/Autorization';
import Book from 'Pages/Book/Book';
import Audiogame from 'Pages/Games/Audiogame/Audiogame';
import Sprint from 'Pages/Games/Sprint/Sprint';

import Home from 'Pages/Home/Home';
import Registration from 'Pages/Login/Registration/Registration';
import Statistics from 'Pages/Statistics/Statistics';
import Template from 'Pages/Template/Template';
import Games from 'Pages/Games/Games';

import 'Pages/Login/LogIn.css';

import SprintMain from 'Pages/Games/Sprint/SprintMain';
import AudiogameMain from 'Pages/Games/Audiogame/AudiogameMain';
import Error from 'Pages/Errors/Error';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Template />}>
                <Route path="/" element={<Home />} />
                <Route path="/signin" element={<Autorisation />} />
                <Route path="/signup" element={<Registration />} />
                <Route path="/statistics" element={<Statistics />} />
                <Route path="/games" element={<Games />} />
                <Route path="/audiogame-main" element={<AudiogameMain />} />
                <Route path="/audiogame" element={<Audiogame />} />
                <Route path="/sprint-main" element={<SprintMain />} />
                <Route path="/sprint" element={<Sprint />} />
                <Route path="/book" element={<Book />} />
                <Route path="*" element={<Error />} />
            </Route>
        </Routes>
    );
}

export default App;
