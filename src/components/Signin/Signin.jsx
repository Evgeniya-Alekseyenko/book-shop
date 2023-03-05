import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { LocalStorageService, LS_KEYS } from '../../services/LocalStorage';
import avatar from '../../assets/images/avatar.png';

import styles from './Signin.module.scss';

function Signin() {
    const [userName, setUserName] = useState('');
    const [disBtn, setDisBtn] = useState(false);
    const [userNameError, setUserNameError] = useState('');

    const navigate = useNavigate();
    const location = useLocation();
    const fromPage = location.state?.from?.pathname || '/booklist';

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const user = form.username.value;

        if (!LocalStorageService.get(LS_KEYS.USER)) {
            LocalStorageService.set(LS_KEYS.USER, user);
            navigate(fromPage, { replace: true });
        }
    };
    useEffect(() => {
        if (LocalStorageService.get(LS_KEYS.USER)) {
            navigate('/booklist');
        }
    }, [navigate]);

    useEffect(() => {
        setDisBtn(userName.length < 4 || userName.length > 16);
        setUserName(userName);
        setUserNameError(
            userName.length > 16
                ? 'Username must be at least 4 characters and not more than 16'
                : ''
        );
    }, [userName]);

    return (
        <main>
            <img className={styles.avatar} src={avatar} alt='avatar' />
            <div className={styles.username}>Username</div>
            {userNameError && (
                <div style={{ color: 'red' }}>{userNameError}</div>
            )}
            <form onSubmit={handleSubmit} className={styles.form_container}>
                <label htmlFor='signinInput'>
                    <div>
                        <input
                            id='signinInput'
                            value={userName}
                            onChange={(e) => setUserName(e.target.value.trim())}
                            type='text'
                            className={styles.name}
                            name='username'
                            placeholder='type more than 4 characters'
                        />
                    </div>
                </label>
                <button
                    onClick={() => userNameError}
                    disabled={disBtn}
                    type='submit'
                    className={disBtn ? styles.btn_disabled : styles.btn}
                >
                    Sign-in
                </button>
            </form>
            <blockquote>
                <p>Imagination is the only weapon in the war against reality</p>
                <footer>
                    — <cite>Lewis Carroll</cite>
                </footer>
            </blockquote>
        </main>
    );
}
export default Signin;
