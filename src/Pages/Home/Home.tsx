import { Link } from 'react-router-dom';
import TextBookLogo from 'assets/images/textbook.png';
import RepeatLogo from 'assets/images/repeat.jpeg';
import ProgressLogo from 'assets/images/progress.jpeg';
import AudioLogo from 'assets/images/audio.png';
import SprintLogo from 'assets/images/sprint.png';

import AboutUs from 'Components/Footer/AboutUs';
import './home.scss';


const Home = () => {
  return (
    <>
      <div className="app-about" id="main-page">
        <div className="team-info">
          <p className="team header">RSLang</p>
          <div className="team-info-btns">
            <div className="btns-info-container">
              <a className="btn-info btn" href="#know-more-page">
                Узнать больше
              </a>
              <a className="btn-info btn" href="#games-page">
                Игры
              </a>
              <a className="btn-info btn" href="#about-us-page">
                О нас
              </a>
            </div>
            <p className="description-text">
              Андрей, Дарья, Матвей - мы команда junior разработчиков, <br />
              представляем Вам приложение для изучения английского языка, <br />
              в рамках курса Rolling scopes School JavaScript/Front-end 2022Q1
            </p>
          </div>
        </div>
      </div>
      <div id="know-more-page">
        <Link to="know-more" />
        <div className="know-more-container">
          <p className="know-more header">Особенности</p>
          <div className="know-container">
            <div className="category">
              <div className="img-wrap">
                <img className="category-image" src={TextBookLogo} alt="Learning" />
              </div>
              <p className="category-header">Узнавай новое</p>
              <p className="category-text">
                Коллекция слов в учебнике содержит 3600 наиболее часто употребляемых английских слов
              </p>
            </div>
            <div className="category">
              <div className="img-wrap">
                <img className="category-image" src={RepeatLogo} alt="Repeating" />
              </div>
              <p className="category-header">Повторяй изученное</p>
              <p className="category-text">
                Все слова которые ты изучил попадают в твой личный словарь. Ты можешь отметить сложные
                для тебя слова, чтобы знать, на что чаще обращать внимание!
              </p>
            </div>
            <div className="category">
              <div className="img-wrap">
                <img className="category-image" src={ProgressLogo} alt="Statistic" />
              </div>
              <p className="category-header">Следи за прогрессом</p>
              <p className="category-text">
                В личном кабинете ты можешь следить за своим прогрессом: сколько слов ты уже выучил
                всего и за каждый день.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div id='games-page'><Link to='games-page'/>
        <p className='know-more header'>
          Игры
        </p>
        <div className='games-container'>
          <div className='game'>
            <div className='img-wrap'>
              <img src={AudioLogo} className='category-image' alt="Audio" />
            </div>
            <p className='category-header'>Аудиовызов</p>
            <p className='category-text'>
              Аудиовызов поможет тебе развить навыки аудирования
              и перевода. Выбирай одно из 4 слов, которые услышишь
            </p>
          </div>
          <div className='game'>
            <div className='img-wrap'>
              <img src={SprintLogo} className='category-image' alt="Sprint" />
            </div>
            <p className='category-header'>Спринт</p>
            <p className='category-text'>
              В игре Спринт тебе нужно выбрать,<br/>
              правильный указан перевод слова или нет
            </p>
          </div>
        </div>
      </div>
      <div id='about-us-page'><Link to='about-us'/>
        <p className='about-us header'>
          Создатели приложения
        </p>
        <div className='know-container'>
          {AboutUs.map((el) => (
            <div className='creator-card' key={el.key.toString()}>
              <div className='creator-wrap'>
                <img src={el.image} className='creator-image' alt={el.name} />
              </div>
              <p className='creator-header'>{el.name}</p>
              <p className='creator-role'>{el.role}. {el.tasks}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;