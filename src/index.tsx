import ReactDOM from 'react-dom';

import App from './core/App/App';
import Launcher from './core/Launcher/Launcher';

import './index.css';

ReactDOM.render(
    <Launcher>
        <App />
    </Launcher>,
    document.getElementById('root')
);
