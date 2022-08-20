import AudioLogo from 'assets/images/audio.png';
import SprintLogo from 'assets/images/sprint.png';
import Header from 'Components/Header/Header';
import { Link } from 'react-router-dom';
import './games.scss';

const Games = () => {

  return (
    <>
      <Header />
      <p className='header'>Игры</p>
      <p className='text'>
        Выбирай игру и повторяй уже знакомые слова весело и непринуждённо!
      </p>
      <div className='games-container'>
        <Link to="/audiogame" className='game-card'>
          <p className='header'>Аудиовызов</p>
          <img src={AudioLogo} className="game-img" alt="Audio logo" />
        </Link>
        <Link to="/sprint" className='game-card' >
          <p className='header'>Спринт</p>
          <img src={SprintLogo} className="game-img" alt="Audio logo" />
        </Link>
      </div>
    </>
  );
};
export default Games;
