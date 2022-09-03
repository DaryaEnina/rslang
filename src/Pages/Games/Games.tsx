import AudioLogo from 'assets/images/audio.png';
import SprintLogo from 'assets/images/sprint.png';
import { AllDifficulties } from 'models/models';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { changeDifficultyReducer } from 'store/reducers/difficultyReducer';
import { selectAudiogame, selectSprint } from 'store/reducers/selectGameReducer';
import { startGameFromReducer } from 'store/reducers/startGameFromReducer';
import { useGetWordsQuery } from 'store/rslang/words.api';
import './games.scss';
import Levels from './Levels';
import { DifficultyData } from './types';


interface IRootState {

  gameDifficulty: {
    changeDifficulty: AllDifficulties
  },
  currentPage: {
    currentPage: number
  },
  startGameFrom: {
    startGameFrom: string
  }
}

function Games() {
  const dispatch = useDispatch();
  const difficulty = useSelector((state: IRootState) => state.gameDifficulty.changeDifficulty);
  const currentPage = useSelector((state: IRootState) => state.currentPage.currentPage);

  useGetWordsQuery({ page: currentPage, group: DifficultyData[difficulty] });

  function setDifficulty(level: AllDifficulties) {
    dispatch(changeDifficultyReducer(level));
  }

  function startGame(gameName: string) {
    if (gameName === 'sprint') {
      selectSprint();
    } else {
      selectAudiogame();
    }
    dispatch(startGameFromReducer('games'));
  }

  return (
    <>
      <p className='header page-header'>Игры</p>
      <p className='text page-text'>{difficulty} {currentPage}
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
                onClick={() => setDifficulty(el.level as AllDifficulties)}>
                <p className='level-name'>{el.level}</p>
                <p className='level-text'>{el.levelDescription}</p>
              </button>
            )
          })}
        </div>
        <Link to="/audiogame-main" className='game-card' onClick={() => startGame('audiogame')}>
          <p className='header'>Аудиовызов</p>
          <img src={AudioLogo} className="game-img" alt="Audio logo" />
        </Link>
        <Link to="/sprint" className='game-card' onClick={() => startGame('sprint')}>
          <p className='header'>Спринт</p>
          <img src={SprintLogo} className="game-img" alt="Audio logo" />
        </Link>
      </div>
    </>
  );
}
export default Games;
