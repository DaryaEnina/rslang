import { useCallback, useEffect, useState } from 'react';
import Service, { DataStat } from 'Utils/Service';
import './style.scss';

const Statistics = () => {
    const [audioGamePercent, setAudioGamePercent] = useState<number>(0);
    const [sprintGamePercent, setSprintGamePercent] = useState<number>(0);
    const [totalPercent, setTotalPercent] = useState<number>(0);
    const [stateData, setStateData] = useState<DataStat>({
        learnedWords: 0,
        optional: {
            newWordsAudioGame: 0,
            newWordsSprintGame: 0,
            wordsInRowAudioGame: 0,
            wordsInRowSprintGame: 0,
            totalQuestionsAudioGame: 0,
            totalQuestionsSprintGame: 0,
            totalCorrectAnswersAudioGame: 0,
            totalCorrectAnswersSprintGame: 0,
        },
    });

    const dayResults = useCallback(async () => {
        const token = localStorage.getItem('token') as string;
        const userId = localStorage.getItem('userId') as string;
        const responseStat = await Service.getUserStat(userId, token);
        if (responseStat !== 404) {
            setStateData(responseStat as DataStat);
        }
    }, []);

    useEffect(() => {
        dayResults();
    }, [dayResults]);

    useEffect(() => {
        if (stateData!.optional.totalQuestionsAudioGame !== 0) {
            const audioAnswers = (
                (stateData!.optional.totalCorrectAnswersAudioGame / stateData!.optional.totalQuestionsAudioGame) *
                100
            ).toFixed(1);
            setAudioGamePercent(+audioAnswers);
        } else {
            setAudioGamePercent(1);
        }
        if (stateData!.optional.totalQuestionsSprintGame !== 0) {
            const sprintAnswers = (
                (stateData!.optional.totalCorrectAnswersSprintGame / stateData!.optional.totalQuestionsSprintGame) *
                100
            ).toFixed(1);
            setSprintGamePercent(+sprintAnswers);
        } else {
            setSprintGamePercent(1);
        }
        if (stateData!.optional.totalQuestionsSprintGame !== 0 && stateData!.optional.totalQuestionsAudioGame !== 0) {
            const totalAnswers = (
                ((stateData!.optional.totalCorrectAnswersSprintGame +
                    stateData!.optional.totalCorrectAnswersAudioGame) /
                    (stateData!.optional.totalQuestionsSprintGame + stateData!.optional.totalQuestionsAudioGame)) *
                100
            ).toFixed(1);
            setTotalPercent(+totalAnswers);
        } else {
            setTotalPercent(0);
        }
    }, [stateData]);
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
                            <p> {stateData!.optional.newWordsAudioGame + stateData!.optional.newWordsSprintGame} шт</p>
                        </div>
                        <div className="stat-words_count">
                            <p>Изученных слов</p>
                            <p>0 шт</p>
                        </div>
                        <div className="stat-words_count last">
                            <p>Правильных ответов</p>
                            <p>{totalPercent} %</p>
                        </div>
                    </div>
                </div>
                <div className="stat-games">
                    <h5>Аудиовызов</h5>
                    <div className="stat-games_result">
                        <div className="stat-games_count">
                            <p>Новых слов</p>
                            <p>{stateData!.optional.newWordsAudioGame} шт</p>
                        </div>
                        <div className="stat-games_count">
                            <p>Правильных ответов</p>
                            <p>{audioGamePercent}%</p>
                        </div>
                        <div className="stat-games_count last">
                            <p>
                                Самая длинная серия
                                <br /> правильных ответов
                            </p>
                            <p>0 шт</p>
                        </div>
                    </div>
                </div>
                <div className="stat-games">
                    <h5>Спринт</h5>
                    <div className="stat-games_result">
                        <div className="stat-games_count">
                            <p>Новых слов </p>
                            <p>{stateData.optional.newWordsSprintGame} шт</p>
                        </div>
                        <div className="stat-games_count">
                            <p>Правильных ответов </p>
                            <p> {sprintGamePercent}%</p>
                        </div>
                        <div className="stat-games_count last">
                            <p>
                                Самая длинная серия
                                <br /> правильных ответов
                            </p>
                            <p>0 шт</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Statistics;
