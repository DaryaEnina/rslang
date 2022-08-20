import { UserWordResponse } from '../../models/models';
import rslangApi from './rslang.api';

const usersWordsApi = rslangApi.injectEndpoints({
    endpoints: (build) => ({
        createUserWord: build.mutation<
            UserWordResponse,
            { userId: string; wordId: string; wordInfo: { difficulty: string; optional: {} }; token: string }
        >({
            query: ({ userId, wordId, wordInfo, token }) => ({
                url: `users/${userId}/words/${wordId}`,
                method: 'POST',
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(wordInfo),
            }),
        }),
        updateUserWord: build.mutation<
            UserWordResponse,
            { userId: string; wordId: string; wordInfo: { difficulty: string; optional: {} }; token: string }
        >({
            query: ({ userId, wordId, wordInfo, token }) => ({
                url: `users/${userId}/words/${wordId}`,
                method: 'PUT',
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(wordInfo),
            }),
        }),
    }),
});

export const { useCreateUserWordMutation, useUpdateUserWordMutation } = usersWordsApi;
