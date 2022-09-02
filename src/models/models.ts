export interface IWord {
    id: string;
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
    textExampleTranslate: string;
    textMeaningTranslate: string;
    wordTranslate: string;
}

export type WordsResponse = IWord[];

export interface IUser {
    id: string;
    name: string;
    email: string;
}

export type SigninUserResponse = {
    message: string;
    token: string;
    refreshToken: string;
    userId: string;
};

export type UserWordResponse = {
    id: string;
    difficulty: string;
    optional: Params;
    wordId: string;
};

export type Params = {
    wordsPerPage?: number;
    group?: number;
    page?: number;
    filter?: unknown;
  };

export type AllDifficulties = "A1" | "A2" | "B2" | "B2" | "C1" | "C2" | "HARD";
