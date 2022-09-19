import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { userLoginReducer } from 'store/reducers/loginReducer';
import Service, { DataUserLoginResponse } from '../../../Utils/Service';

const Autorisation = () => {

    const dispatch = useDispatch();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [disabled, setDisabled] = useState<boolean>(true);
    const navigate = useNavigate();
    const refEmail = useRef(null);
    const refPassword = useRef(null);
    const [loginStatusMessage, setLoginStatusMessage] = useState<string>('');
    const [success, setSuccess] = useState<boolean>(false);

    const inputHandler = (event: React.ChangeEvent): void => {
        const { id, value } = event.target as HTMLInputElement;
        let isEmailValid = false;
        let isPasswordValid = false;
        switch (id) {
            case 'email':
                setEmail(value);
                break;
            case 'password':
                setPassword(value);
                break;
            default:
                break;
        }

        if (refEmail.current !== null) {
            isEmailValid = (refEmail.current as HTMLInputElement).validity.valid;
        }
        if (refPassword.current !== null) {
            isPasswordValid = (refPassword.current as HTMLInputElement).validity.valid;
        }

        if (isEmailValid && isPasswordValid) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    };

    const submitHandler = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoginStatusMessage('');
        setDisabled(true);
        const responseLogin = (await Service.loginUser({ email, password })) as DataUserLoginResponse;

        setDisabled(false);
        if (!responseLogin) {
            setSuccess(false);
            setLoginStatusMessage(`Неверный Email или пароль!`);
        } else {
            const { name, token, userId } = responseLogin;
            setSuccess(true);
            setLoginStatusMessage(`Вы успешно авторизовались!`);
            localStorage.setItem('token', token);
            localStorage.setItem('userId', userId);
            localStorage.setItem('name', name);
            setTimeout(() => {
                dispatch(userLoginReducer({
                    isLogin: true,
                    token,
                    userId }));
                navigate('/');
            }, 1500);
        }
    };

    const closeFormHandler = (event: React.MouseEvent) => {
        if ((event.target as HTMLDivElement).classList.contains('wrapper-form')) navigate('/');
    };

    return (
        <div className="wrapper-form" aria-hidden onClick={closeFormHandler}>
            <section id="content" className="content">
                <h1>Войти</h1>
                <div className="row">
                    <form className="col s12" noValidate onSubmit={submitHandler}>
                        <div className="row">
                            <div className="input-field col s12">
                                <i className="material-icons prefix">email</i>
                                <input
                                    ref={refEmail}
                                    id="email"
                                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                                    className="validate"
                                    type="email"
                                    required
                                    onChange={inputHandler}
                                />
                                <label htmlFor="email">Email</label>
                                <span className="helper-text" data-error="Email не валиден" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <i className="material-icons prefix">password</i>
                                <input
                                    ref={refPassword}
                                    id="password"
                                    className="validate"
                                    type="password"
                                    autoComplete="off"
                                    minLength={8}
                                    required
                                    onChange={inputHandler}
                                />
                                <label htmlFor="password">Password</label>
                                <span className="helper-text" data-error="Длина должна быть не менее 8 символов" />
                                <span style={{ color: success ? 'green' : 'red' }}>
                                    <b>{loginStatusMessage}</b>
                                </span>
                            </div>
                        </div>
                        <div className="control">
                            <button
                                disabled={disabled}
                                className="btn waves-effect waves-light blue darken-1"
                                type="submit"
                                name="action"
                            >
                                Войти
                                <i className="material-icons right">send</i>
                            </button>
                            <Link to="/signup">Регистрация</Link>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default Autorisation;
