import { UserWordResponse, WordsResponse } from '../../models/models';
import rslangApi from './rslang.api';

interface IAggregatedWords {
    paginatedResults: WordsResponse;
}

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
            invalidatesTags: ['Words'],
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
            invalidatesTags: ['Words'],
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
            }),
            providesTags: ['Words'],
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
            }),
            providesTags: ['Words'],
        }),
        getUserAggregatedWords: build.query<[IAggregatedWords], { 
            userId: string, token: string, optional?: { wordsPerPage?: number, group?: number, page?: number, filter?: string }  
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
                params: {
                    wordsPerPage: optional?.wordsPerPage,
                    group: optional?.group,
                    page: optional?.page,
                    filter: optional?.filter
                },
            }),
            providesTags: ['Words'],
        })
    }),
});

export const { 
    useCreateUserWordMutation,
    useUpdateUserWordMutation,
    useGetUserWordByIdQuery,
    useGetUserWordsQuery,
    useGetUserAggregatedWordsQuery } = usersWordsApi;
