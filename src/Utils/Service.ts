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
}

export default Service;
