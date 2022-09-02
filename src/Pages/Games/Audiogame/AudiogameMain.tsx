import { Link } from "react-router-dom";

function AudiogameMain() {


  return (
    <>
      <p className="header page-header">Аудиовызов</p><div className="rules-container">
        <p className="text">«Аудиовызов» - игра, улучшающая восприятие речи на слух.</p>
        <p className="header">Правила</p>
        <p className="text">
          Слушай слово на английском языке и выбирай правильный перевод.<br />
          При неверном ответе сгорает одна попытка.<br />
          Неверно ответить можно не более пяти раз.
        </p>
        <p className="header">Управление</p>
        <p className="text">Левыя клавиша мыши и 1-5 для выбора ответа<br />
          Клавиша Enter для перехода к следующему слову<br />
          Клавиша пробел для повторного прослушивания слова
        </p>
        <Link className="start-btn btn" to="/audiogame">Старт</Link>
      </div>
    </>
  )
}

export default AudiogameMain;