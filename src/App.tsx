import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Autorisation from './Pages/Login/Autorization/Autorization';
import Book from './Pages/Book/Book';
import Audiogame from './Pages/Games/Audiogame';
import Sprint from './Pages/Games/Sprint';

import Home from './Pages/Home/Home';
import Registration from './Pages/Login/Registration/Registration';
import Statistics from './Pages/Statistics/Statistics';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signIn" element={<Autorisation />} />
                <Route path="/signUp" element={<Registration />} />
                <Route path="/statistics" element={<Statistics />} />
                <Route path="/audiogame" element={<Audiogame />} />
                <Route path="/sprint" element={<Sprint />} />
                <Route path="/book" element={<Book />} />
            </Routes>
        </Router>
    );
}

export default App;
