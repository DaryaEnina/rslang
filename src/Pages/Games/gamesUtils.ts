import Service, { DataStat } from 'Utils/Service';

const token = localStorage.getItem('token') as string;
const userId = localStorage.getItem('userId') as string;

export default async function setToStatNewWordsAudioGame() {
    if (userId) {
        const responseStat = (await Service.getUserStat(userId, token)) as DataStat;
        delete responseStat.id;
        let { optional } = responseStat;
        const newWordsAudioGame = responseStat.optional.newWordsAudioGame + 1;
        optional = { ...responseStat.optional, newWordsAudioGame };
        const dataStatUpdate = { ...responseStat, optional };
        setTimeout(async () => {
            await Service.updateUserStat(dataStatUpdate, userId, token);
        }, 100);
    }

    // TODO: проверять слова по ID, если такого нет - добавлять в статистику
}

export async function setToStatNewWordSprint() {
    if (userId) {
        const responseStat = (await Service.getUserStat(userId, token)) as DataStat;
        delete responseStat.id;
        let { optional } = responseStat;
        const newWordsSprintGame = responseStat.optional.newWordsSprintGame + 1;
        optional = { ...responseStat.optional, newWordsSprintGame };
        const dataStatUpdate = { ...responseStat, optional };
        setTimeout(async () => {
            await Service.updateUserStat(dataStatUpdate, userId, token);
        }, 100);
    }
    // TODO: проверять слова по ID, если такого нет - добавлять в статистику
}

export async function resultsToStatAudioGame(rightCount: number, wrongCount: number, seria: number) {
    if (userId) {
        const responseStat = (await Service.getUserStat(userId, token)) as DataStat;
        delete responseStat.id;
        let { optional } = responseStat;
        const totalCorrectAnswersAudioGame = +responseStat.optional.totalCorrectAnswersAudioGame + rightCount;
        const totalQuestionsAudioGame = +responseStat.optional.wordsInRowAudioGame + (rightCount + wrongCount);
        let wordsInRowAudioGame = +responseStat.optional.wordsInRowAudioGame;
        if (wordsInRowAudioGame < seria) {
            wordsInRowAudioGame = seria;
        }
        optional = {
            ...responseStat.optional,
            totalCorrectAnswersAudioGame,
            totalQuestionsAudioGame,
            wordsInRowAudioGame,
        };
        const dataStatUpdate = { ...responseStat, optional };
        setTimeout(async () => {
            await Service.updateUserStat(dataStatUpdate, userId, token);
        }, 100);
    }
}
export async function resultsToStatSprintGame(rightCount: number, wrongCount: number, seria: number) {
    if (userId) {
        const responseStat = (await Service.getUserStat(userId, token)) as DataStat;
        delete responseStat.id;
        let { optional } = responseStat;
        const totalCorrectAnswersSprintGame = +responseStat.optional.totalCorrectAnswersSprintGame + rightCount;
        const totalQuestionsSprintGame = +responseStat.optional.wordsInRowSprintGame + (rightCount + wrongCount);
        let wordsInRowSprintGame = +responseStat.optional.wordsInRowSprintGame;
        if (wordsInRowSprintGame < seria) {
            wordsInRowSprintGame = seria;
        }
        optional = {
            ...responseStat.optional,
            totalCorrectAnswersSprintGame,
            totalQuestionsSprintGame,
            wordsInRowSprintGame,
        };
        const dataStatUpdate = { ...responseStat, optional };
        setTimeout(async () => {
            await Service.updateUserStat(dataStatUpdate, userId, token);
        }, 100);
    }
}
export async function learnedToStat(data: number) {
    if (userId) {
        const responseStat = (await Service.getUserStat(userId, token)) as DataStat;
        delete responseStat.id;
        const { optional } = responseStat;

        setTimeout(async () => {
            await Service.updateUserStat(
                {
                    learnedWords: data,
                    optional: { ...optional },
                },
                userId,
                token
            );
        }, 100);
    }
}
