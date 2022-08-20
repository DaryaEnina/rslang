import ReactDOM from 'react-dom';
import './index.css';
import App from './core/App/App';
import Launcher from './core/Launcher/Launcher';

ReactDOM.render(
    <Launcher>
        <App />
    </Launcher>,
    document.getElementById('root')
);
