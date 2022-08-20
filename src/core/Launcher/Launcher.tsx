import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import store from '../../store';

const Launcher: React.FC = ({ children }) => (
    <React.StrictMode>
        <Provider store={store}>
            <Router>{children}</Router>
        </Provider>
    </React.StrictMode>
);

export default Launcher;
