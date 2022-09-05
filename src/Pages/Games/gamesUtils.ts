import Service, { DataStat } from 'Utils/Service';

const token = localStorage.getItem('token') as string;
const userId = localStorage.getItem('userId') as string;

export default async function setToStatNewWordsAudioGame() {
    const responseStat = (await Service.getUserStat(userId, token)) as DataStat;
    delete responseStat.id;
    let { optional } = responseStat;
    const newWordsAudioGame = responseStat.optional.newWordsAudioGame + 1;
    optional = { ...responseStat.optional, newWordsAudioGame };
    const dataStatUpdate = { ...responseStat, optional };
    setTimeout(async () => {
        await Service.updateUserStat(dataStatUpdate, userId, token);
    }, 100);
    // TODO: проверять слова по ID, если такого нет - добавлять в статистику
}

export async function setToStatNewWordSprint() {
    const responseStat = (await Service.getUserStat(userId, token)) as DataStat;
    delete responseStat.id;
    let { optional } = responseStat;
    const newWordsSprintGame = responseStat.optional.newWordsSprintGame + 1;
    optional = { ...responseStat.optional, newWordsSprintGame };
    const dataStatUpdate = { ...responseStat, optional };
    setTimeout(async () => {
        await Service.updateUserStat(dataStatUpdate, userId, token);
    }, 100);
    // TODO: проверять слова по ID, если такого нет - добавлять в статистику
}

export async function resultsToStatAudioGame(rightCount: number) {
    const responseStat = (await Service.getUserStat(userId, token)) as DataStat;
    delete responseStat.id;
    let { optional } = responseStat;
    const totalCorrectAnswersAudioGame = +responseStat.optional.totalCorrectAnswersAudioGame + rightCount;
    optional = { ...responseStat.optional, totalCorrectAnswersAudioGame };
    const dataStatUpdate = { ...responseStat, optional };
    setTimeout(async () => {
        await Service.updateUserStat(dataStatUpdate, userId, token);
    }, 100);
}
