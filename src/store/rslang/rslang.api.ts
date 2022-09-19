import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const rslangApi = createApi({
    reducerPath: 'rslangApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://react-rslang-team.herokuapp.com/',
    }),
    tagTypes: ['User', 'Words'],
    endpoints: () => ({}),
});

export default rslangApi;
