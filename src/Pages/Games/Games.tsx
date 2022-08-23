import AudioLogo from 'assets/images/audio.png';
import SprintLogo from 'assets/images/sprint.png';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { changeDifficulty } from 'store/actions/actions';
import './games.scss';
import Levels from './Levels';

interface IRootState {
  gameDifficulty: {
    gameDifficulty: string,
  }
}

function Games() {

  const dispatch = useDispatch();
  const difficulty = useSelector((state: IRootState) => state.gameDifficulty.gameDifficulty);

  function setDifficulty(level: string) {
    dispatch(changeDifficulty(level));
  }

  return (
    <>
      <p className='header'>Игры</p>
      <p className='text'>
        Выбирай игру и повторяй уже знакомые слова весело и непринуждённо!
      </p>
      <div className='games-container'>
        <div className='levels-container'>
          <p className='header'>Выбирай уровень</p>
          {Levels.map((el) => {
            const classBnt = el.level === difficulty ? 'level-btn active' : 'level-btn';
            return (
              <button className={classBnt}
                type='button' key={el.key}
                style={{ backgroundColor: el.color }}
                onClick={() => setDifficulty(el.level)}>
                <p className='level-name'>{el.level}</p>
                <p className='level-text'>{el.levelDescription}</p>
              </button>
          )})} 
        </div>
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
}
export default Games;
