import { IUser, SigninUserResponse } from "../../models/models";
import rslangApi from "./rslang.api";

const usersApi = rslangApi.injectEndpoints({
    endpoints: (build) => ({
        createUser: build.mutation<IUser, { name: string; email: string; password: string }>({
            query: (user) => ({
                url: 'users',
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            }),
        }),
        signinUser: build.mutation<SigninUserResponse, { email: string; password: string }>({
            query: (user) => ({
                url: 'signin',
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            }),
        }),
        getUser: build.query<IUser, { id: string; token: string }>({
            query: ({ id, token }) => ({
                url: `users/${id}`,
                method: 'GET',
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json',
                },
            }),
        }),
    }),
    overrideExisting: false,
});

export const { useCreateUserMutation, useSigninUserMutation, useGetUserQuery } = usersApi;
