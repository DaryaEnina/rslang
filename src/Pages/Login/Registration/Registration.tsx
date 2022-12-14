import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { userLoginReducer } from 'store/reducers/loginReducer';
import Service, { DataUserCreateResponse, DataUserLoginResponse } from '../../../Utils/Service';

const Registration = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [disabled, setDisabled] = useState<boolean>(true);
    const [registrationStatusMessage, setRegistrationStatusMessage] = useState<string>('');
    const [success, setSuccess] = useState<boolean>(false);
    const refEmail = useRef<HTMLInputElement>(null);
    const refPassword = useRef<HTMLInputElement>(null);
    const closeFormHandler = (event: React.MouseEvent) => {
        if ((event.target as HTMLDivElement).classList.contains('wrapper-form')) {
            navigate('/');
        }
    };
    const inputHandler = (event: React.ChangeEvent): void => {
        const { id, value } = event.target as HTMLInputElement;

        let isEmailValid = false;
        let isPasswordValid = false;
        switch (id) {
            case 'name':
                setName(value);
                break;
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

        if (name.trim() !== '' && isEmailValid && isPasswordValid) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    };
    const submitHandler = async (event: React.FormEvent) => {
        event.preventDefault();
        setRegistrationStatusMessage('');
        setDisabled(true);
        const responseRegistration = (await Service.createUser({ name, email, password })) as DataUserCreateResponse;

        setDisabled(false);
        if (!responseRegistration) {
            setSuccess(false);
            setRegistrationStatusMessage(`???????????????????????? ?? ${email} ?????? ??????????????????????????????!`);
        } else {
            setSuccess(true);
            setRegistrationStatusMessage(`???? ?????????????? ????????????????????????????????????!`);
            const responseLogin = (await Service.loginUser({
                email,
                password,
            })) as DataUserLoginResponse;
            localStorage.setItem('userId', responseLogin.userId);
            localStorage.setItem('token', responseLogin.token);
            localStorage.setItem('name', responseLogin.name);

            setTimeout(() => {
                const token = localStorage.getItem('token') as string;
                const userId = localStorage.getItem('userId') as string;
                dispatch(
                    userLoginReducer({
                        isLogin: true,
                        token,
                        userId,
                    })
                );
                navigate('/');
            }, 1500);
        }
    };

    return (
        <div className="wrapper-form" onClick={closeFormHandler} aria-hidden>
            <section className="content">
                <h1 className="form-title">??????????????????????</h1>
                <div className="row">
                    <form onSubmit={submitHandler} noValidate>
                        <div className="row">
                            <div className="input-field col s12">
                                <i className="material-icons prefix ">account_circle</i>
                                <input id="name" className="validate" type="text" onChange={inputHandler} required />
                                <label htmlFor="text">??????</label>
                                <span className="helper-text" data-error="?????????????????? ?????? ????????" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <i className="material-icons prefix">email</i>
                                <input
                                    ref={refEmail}
                                    id="email"
                                    className="validate"
                                    type="email"
                                    required
                                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                                    onChange={inputHandler}
                                />
                                <label htmlFor="email">Email</label>

                                <span className="helper-text" data-error="Email ???? ??????????????" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <i className="material-icons prefix">password</i>
                                <input
                                    ref={refPassword}
                                    id="password"
                                    type="password"
                                    autoComplete="off"
                                    minLength={8}
                                    className="validate"
                                    required
                                    onChange={inputHandler}
                                />
                                <label htmlFor="password">Password</label>
                                <span className="helper-text" data-error="?????????? ???????????? ???????? ???? ?????????? 8 ????????????????" />
                                <span style={{ color: success ? 'green' : 'red' }}>
                                    <b>{registrationStatusMessage}</b>
                                </span>
                            </div>
                        </div>

                        <div className="control">
                            <button
                                name="action"
                                className="btn waves-effect waves-light orange darken-1"
                                type="submit"
                                disabled={disabled}
                            >
                                ??????????????????????
                                <i className="material-icons right">send</i>
                            </button>

                            <Link to="/signin">?????? ???????? ???????????????</Link>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default Registration;
