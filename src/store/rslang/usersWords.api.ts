import { UserWordResponse, WordsResponse } from '../../models/models';
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
        getUserWordById: build.query<UserWordResponse, { userId: string, token: string, wordId: string }>({
            query: ({ userId, token, wordId }) => ({
                url: `users/${userId}/words/${wordId}`,
                method: 'GET',
                withCridentials: true,
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            })
        }),
        getUserWords: build.query<UserWordResponse[], { userId: string, token: string }>({
            query: ({ userId, token }) => ({
                url: `users/${userId}/words`,
                method: 'GET',
                withCridentials: true,
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            })
        }),
        getUserAggregatedWords: build.query<WordsResponse, { 
            userId: string, token: string, optional: { wordsPerPage?: number, group?: number, page?: number }  
        }>({
            query: ({ userId, token, optional }) => ({
                url: `users/${userId}/aggregatedWords`,
                method: 'GET',
                withCridentials: true,
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                param: optional,
            })
        })
    }),
});

export const { 
    useCreateUserWordMutation,
    useUpdateUserWordMutation,
    useGetUserWordByIdQuery,
    useGetUserWordsQuery,
    useGetUserAggregatedWordsQuery } = usersWordsApi;
