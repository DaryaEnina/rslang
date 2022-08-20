import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const rslangApi = createApi({
    reducerPath: 'rslang/api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://react-rslang-team.herokuapp.com/',
    }),
    endpoints: () => ({}),
});

export default rslangApi;
