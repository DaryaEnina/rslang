import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const rslangApi = createApi({
    reducerPath: 'rslangApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://react-rslang-team.herokuapp.com/',
    }),
    tagTypes: ['User'],
    endpoints: () => ({}),
});

export default rslangApi;
