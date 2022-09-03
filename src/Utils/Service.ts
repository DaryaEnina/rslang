type DataUser = {
    name?: string;
    email: string;
    password: string;
};

export type DataUserCreateResponse = {
    id: string;
    email: string;
};

export type DataWord = {
    id: string;
    _id?: string;
    group: number;
    page: number;
    word: string;
    image: string;
    audio: string;
    audioMeaning: string;
    audioExample: string;
    textMeaning: string;
    textExample: string;
    transcription: string;
    wordTranslate: string;
    textMeaningTranslate: string;
    textExampleTranslate: string;
    userWord: {
        difficulty: string;
        optional: {
            guessedCount: string;
        };
    };
};

export type DataUserLoginResponse = {
    message: string;
    token: string;
    refreshToken: string;
    userId: string;
    name: string;
};

export type DataStat = {
    id?: string;
    learnedWords: number;
    optional: {
        newWordsAudioGame: number;
        newWordsSprintGame: number;
        wordsInRowAudioGame: number;
        wordsInRowSprintGame: number;
        totalQuestionsAudioGame: number;
        totalQuestionsSprintGame: number;
        totalCorrectAnswersAudioGame: number;
        totalCorrectAnswersSprintGame: number;
    };
};

class Service {
    private static baseUrl = 'https://react-rslang-team.herokuapp.com';

    public static async createUser(data: DataUser): Promise<DataUserCreateResponse | undefined> {
        try {
            const response = await fetch(`${this.baseUrl}/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                },
                body: JSON.stringify(data),
            });
            const userData: DataUserCreateResponse = await response.json();
            return userData;
        } catch (error) {
            console.log(error);
        }
        return undefined;
    }

    public static async loginUser(user: DataUser): Promise<DataUserLoginResponse | undefined> {
        try {
            const rawResponse = await fetch(`${this.baseUrl}/signin`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });
            const loginResponse = await rawResponse.json();
            return loginResponse;
        } catch (error) {
            console.log(error);
        }
        return undefined;
    }

    public static async getUserStat(userId: string, token: string): Promise<DataStat | number | undefined> {
        try {
            const rawResponse = await fetch(`${this.baseUrl}/users/${userId}/statistics`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json',
                },
            });
            if (rawResponse.status === 401 || rawResponse.status === 404) {
                return rawResponse.status;
            }
            const content = await rawResponse.json();
            return content;
        } catch (error) {
            console.log(error);
        }
        return undefined;
    }

    public static async updateUserStat(
        statData: DataStat,
        userId: string,
        token: string
    ): Promise<DataStat | number | undefined> {
        try {
            const rawResponse = await fetch(`${this.baseUrl}/users/${userId}/statistics`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(statData),
            });

            if (rawResponse.status === 401) {
                return rawResponse.status;
            }
            const content = await rawResponse.json();
            return content;
        } catch (error) {
            console.log(error);
        }
        return undefined;
    }
}

export default Service;
