import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { clearAnsweredWordsReducer } from "store/reducers/answeredWordsReducer";


function SprintMain() {

  const dispatch = useDispatch();

  return (
    <>
      <p className="header page-header">Спринт</p><div className="rules-container">
        <p className="text">«Спринт» - игра на скорость. Угадай как можно больше слов за 60 секунд.</p>
        <p className="header">Правила</p>
        <p className="text">
          Серии правильных ответов повышают множитель баллов.<br />
          При неверном ответе комбо-множитель сбрасывается до начального.
        </p>
        <p className="header">Управление</p>
        <p className="text">Левыя клавиша мыши выбора ответа<br />
          Клавишы стрелка влево и стрелка вправо для выбора ответа
        </p>
        <Link className="start-btn btn" to="/sprint" onClick={() => dispatch(clearAnsweredWordsReducer())}>Старт</Link>
      </div>
    </>
  )
}

export default SprintMain;