import { IWord, WordsResponse } from 'models/models';
import rslangApi from './rslang.api';

const wordsApi = rslangApi.injectEndpoints({
    endpoints: (build) => ({
        getWords: build.query<WordsResponse, { page: number; group: number }>({
            query: ({ page = 0, group = 0 }) => ({
                url: 'words',
                params: {
                    page,
                    group,
                },
            }),
        }),
        getWord: build.query<IWord, string>({
            query: (id) => `words/${id}`,
        }),
    }),
    overrideExisting: false,
});

export const { useGetWordsQuery, useGetWordQuery } = wordsApi;
