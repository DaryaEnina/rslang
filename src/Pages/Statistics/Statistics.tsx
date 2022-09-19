import Loader from 'Components/Loader/Loader';
import { useAppSelector } from 'hooks/redux';
import { learnedToStat } from 'Pages/Games/gamesUtils';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import { useGetUserAggregatedWordsQuery } from 'store/rslang/usersWords.api';
import Service, { DataStat } from 'Utils/Service';
import './style.scss';

const Statistics = () => {
    const navigator = useNavigate();
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

    const { isLogin, token, userId } = useAppSelector((state) => state.userLogin.userLogin);
    // const token = localStorage.getItem('token') as string;
    // const userId = localStorage.getItem('userId') as string;
    const optional = { wordsPerPage: 3600, filter: '{"$and":[{"userWord.difficulty":"learned"}]}' };
    const { isLoading: loadStatus, data: commonWords } = useGetUserAggregatedWordsQuery({
        userId,
        token,
        optional,
    });

    const dayResults = useCallback(async () => {
        const responseStat = await Service.getUserStat(userId, token);
        if (responseStat !== 404) {
            setStateData(responseStat as DataStat);
        }
    }, [userId, token]);

    useEffect(() => {
        dayResults();
    }, [dayResults]);

    useEffect(() => {
        if (isLogin) {
            if (stateData!.optional && stateData!.optional?.totalQuestionsAudioGame) {
                const audioAnswers = (
                    (stateData!.optional.totalCorrectAnswersAudioGame / stateData!.optional.totalQuestionsAudioGame) *
                    100
                ).toFixed(0);
                setAudioGamePercent(+audioAnswers);
            } else {
                setAudioGamePercent(0);
            }
            if (stateData!.optional && stateData!.optional.totalQuestionsSprintGame) {
                const sprintAnswers = (
                    (stateData!.optional.totalCorrectAnswersSprintGame / stateData!.optional.totalQuestionsSprintGame) *
                    100
                ).toFixed(0);
                setSprintGamePercent(+sprintAnswers);
            } else {
                setSprintGamePercent(0);
            }
            if (
                stateData!.optional &&
                (stateData!.optional.totalQuestionsSprintGame ||
                stateData!.optional.totalQuestionsAudioGame)
            ) {
                const totalAnswers = (
                    ((stateData!.optional.totalCorrectAnswersSprintGame +
                        stateData!.optional.totalCorrectAnswersAudioGame) /
                        (stateData!.optional.totalQuestionsSprintGame + stateData!.optional.totalQuestionsAudioGame)) *
                    100
                ).toFixed(0);
                setTotalPercent(+totalAnswers);
            } else {
                setTotalPercent(0);
            }
        } else {
            localStorage.clear();
            navigator('/signin');
        }
        if (commonWords) {
            learnedToStat(commonWords![0].paginatedResults.length);
            // console.log(commonWords![0].paginatedResults[0].userWord?.optional.date);
        }
    }, [stateData, navigator, isLogin, commonWords]);

    const data = [
        {
            name: 'День 1',
            new: 0,
            learned: 0,
        },
        {
            name: 'День 2',
            new: '15',
            learned: '8',
        },
        {
            name: 'День 3',
            new: 25,
            learned: 25,
        },
        {
            name: 'День 4',
            new: 32,
            learned: 25,
        },
        {
            name: 'День 5',
            new: 18,
            learned: 13,
        },
        {
            name: 'День 6',
            new: 19,
            learned: 14,
        },
        {
            name: 'День 7',
            new: 20,
            learned: 15,
        },
    ];

    return (
        <div className="statistics_wrapper">
            <h2>Статистика</h2>
            {loadStatus && !commonWords ?
                (
                    <div style={{ display: 'flex', justifyContent: 'center', margin: 10 }}>
                        <Loader color="#23266e" />
                    </div>
                ) : (
                    <>
                        <h4>Успехи сегодня</h4>
                        <div className="stat-day">
                            <div className="stat-words">
                                <h5>По словам</h5>
                                <div className="stat-words_result">
                                    <div className="stat-words_count">
                                        <p>Новых слов</p>
                                        <p> {stateData.optional ? stateData!.optional.newWordsAudioGame! + stateData!.optional.newWordsSprintGame : '0' } шт</p>
                                    </div>
                                    <div className="stat-words_count">
                                        <p>Изученных слов</p>
                                        <p>{stateData.learnedWords} шт</p>
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
                                        <p>{stateData.optional ? stateData!.optional.newWordsAudioGame : '0'} шт</p>
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
                                        <p>{stateData.optional ? stateData.optional.wordsInRowAudioGame: '0'} шт</p>
                                    </div>
                                </div>
                            </div>
                            <div className="stat-games">
                                <h5>Спринт</h5>
                                <div className="stat-games_result">
                                    <div className="stat-games_count">
                                        <p>Новых слов </p>
                                        <p>{stateData.optional ? stateData.optional.newWordsSprintGame: '0'} шт</p>
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
                                        <p>{stateData.optional ? stateData?.optional.wordsInRowSprintGame: '0'} шт</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <h4>Долгосрочная статистика</h4>
                        <LineChart
                            width={500}
                            height={300}
                            data={data}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="new" stroke="#8884d8" activeDot={{ r: 8 }} />
                            <Line type="monotone" dataKey="learned" stroke="#82ca9d" />
                        </LineChart>
                    </>)}
        </div>
    )
};
export default Statistics;
