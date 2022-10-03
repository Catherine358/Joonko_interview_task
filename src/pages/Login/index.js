import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import Logo from "assets/logo.svg";

import './index.scss';

const formFields = [
    {type: 'email', name: 'email', placeholder: 'Enter work email'},
    {type: 'password', name: 'password', placeholder: 'Enter password'}
];

const Login = () => {
    const [values, setValues] = useState({[formFields[0].name]: '', [formFields[1].name]: ''});
    const [error, setError] = useState('');

    const history = useHistory();

    const onChangeInput = (e) => {
        const newValue = e.target.value;
        const targetName = e.target.name;
        setValues((prev) => ({
            ...prev,
            [targetName]: newValue,
        }));
    }

    const onSubmitForm = async (e) => {
        if (!!error) {
            setError('');
        }
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;
        if (!email || !password) {
            setError('Invalid Entry!');
            return;
        }
        try {
            const response = await axios.post('http://localhost:3001/api/v1/users/login', JSON.stringify({ email, password }), {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });
            if (response.status === 200) {
                setValues({[formFields[0].name]: '', [formFields[1].name]: ''});
                history.push('/');
            }
        } catch (e) {
            if (!e.response) {
                setError('No server response');
            } else if (e.response.status === 404) {
                setError('User does not exist');
            } else if (e.response.status === 401) {
                setError('Wrong password');
            } else {
                setError(e.message);
            }
        }
    };

    return (
        <div className="login">
            <div className="login__container">
                <img src={Logo} className="header__logo" alt="logo" />
                <div className="header-wrapper">
                    <span className="title">Joonko's Jobs Manager</span>
                    <span className="subtitle">Enter your details</span>
                </div>
                <form className="auth-form" onSubmit={onSubmitForm}>
                    {formFields.map(({type, name, placeholder}) => (
                        <input
                            key={`form__${name}`}
                            type={type}
                            name={name}
                            placeholder={placeholder}
                            value={values[name]}
                            onChange={onChangeInput}
                        />
                    ))}
                    <button type="submit">Log in</button>
                </form>
                <span className="error-msg">{error}</span>
            </div>
        </div>
    )
}

export default Login;
