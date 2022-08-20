import { useEffect } from 'react';
// import useGetUserQuery from '../../store/rslang/getUser.api';
// import useCreateUserMutation from '../../store/rslang/createUser.api';
// import { useSigninUserMutation } from '../../store/rslang/users.api';
import { useCreateUserWordMutation } from '../../store/rslang/usersWords.api';
// import { useGetWordsQuery } from '../../store/rslang/words.api';

const Home = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // const { data } = useGetWordsQuery({ page: 0, group: 0 });
    // const [createUser, { data }] = useCreateUserMutation();
    // const [signinUser, { data }] = useSigninUserMutation();
    const [createUserWord, { data }] = useCreateUserWordMutation();
    // const { data } = useGetUserQuery({
    //     id: '62ffe238476828001693ad01',
    //     token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZmZlMjM4NDc2ODI4MDAxNjkzYWQwMSIsImlhdCI6MTY2MDkzNzM2NiwiZXhwIjoxNjYwOTUxNzY2fQ.F4zS8NSjAaGqNZ5II6UAJUI83ydx0u3fBkK7fBn9YNg',
    // });
    useEffect(() => {
        createUserWord({
            userId: '62ffe238476828001693ad01',
            wordId: '5e9f5ee35eb9e72bc21af4a0',
            wordInfo: { difficulty: 'hard', optional: {} },
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZmZlMjM4NDc2ODI4MDAxNjkzYWQwMSIsImlhdCI6MTY2MDk4ODY4NCwiZXhwIjoxNjYxMDAzMDg0fQ.QDuyuNAcIbad0D8uM63aaW8qjPmlRk0amQW56Ed7qxU',
        });
    }, [createUserWord]);
    console.log(data);

    return <div>Home</div>;
};

export default Home;
