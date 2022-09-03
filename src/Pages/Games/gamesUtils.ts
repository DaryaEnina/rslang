import Service, { DataStat } from 'Utils/Service';

export default async function setToStatNewWords() {
    const token = localStorage.getItem('token') as string;
    const userId = localStorage.getItem('userId') as string;
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
