import './style.scss';


const Statistics = () => {
    
    return (
        <div className="statistics_wrapper">
            <h2>Статистика</h2>
            <h4>Успехи сегодня</h4>
            <div className="stat-day">
                <div className="stat-words">
                    <h5>По словам</h5>
                    <div className="stat-words_result">
                        <div className="stat-words_count">
                            <p>Новых слов</p>
                            <p>0 шт</p>
                        </div>
                        <div className="stat-words_count">
                            <p>Изученных слов</p>
                            <p>0 шт</p>
                        </div>
                        <div className="stat-words_count">
                            <p>Правильных ответов</p>
                            <p>0 %</p>
                        </div>
                    </div>
                </div>
                <div className="stat-games">
                    <h5>Аудиовызов</h5>
                    <div className="stat-games_result">
                        <div className="stat-games_count">
                            <p>Новых слов</p>
                            <p>0 шт</p>
                        </div>
                        <div className="stat-games_count">
                            <p>Правильных ответов</p>
                            <p>0%</p>
                        </div>
                        <div className="stat-games_count">
                            <p>Самая длинная серия правильных ответов</p>
                            <p>0 шт</p>
                        </div>
                    </div>
                </div>
                <div className="stat-games">
                    <h5>Спринт</h5>
                    <div className="stat-games_result">
                        <div className="stat-games_count">
                            <p>Новых слов</p>
                            <p>0 шт</p>
                        </div>
                        <div className="stat-games_count">
                            <p>Правильных ответов</p>
                            <p> 0%</p>
                        </div>
                        <div className="stat-games_count">
                            <p>Самая длинная серия правильных ответов</p>
                            <p>0 шт</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Statistics;
