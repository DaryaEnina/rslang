import { useState } from "react";

function Audiogame() {

  const [startGame, setStartGame] = useState(false);

  function playWord() {
    console.log('Play word!');
  }


  return (
    <>
      <p className="header">Аудиовызов</p>
      {!startGame ? (
        <>
          <div className="rules-container">
            <p className="text">«Аудиовызов» - игра, улучшающая восприятие речи на слух.</p>
            <p className="header">Правила</p>
            <p className="text">Слушай слово на английском языке и выбирай правильный перевод.</p>
            <p className="text">При неверном ответе сгорает одна попытка.</p>
            <p className="text">Неверно ответить можно не более пяти раз.</p>
            <p className="header">Управление</p>
            <p className="text">Левыя клавиша мыши и 1-5 для выбора ответа<br />
              Клавиша Enter для перехода к следующему слову<br />
              Клавиша пробел для повторного прослушивания слова
            </p>
          </div>
          <button type="button" onClick={() => setStartGame(!startGame)}>Старт</button>
        </>)
        : (
          <div className="game-container">
            <button type="button" onClick={playWord}>
              <img src="" className="play-word btn" alt="Play word button"  />

            </button>
          </div>
        )}
    </>
  );
};
export default Audiogame;
