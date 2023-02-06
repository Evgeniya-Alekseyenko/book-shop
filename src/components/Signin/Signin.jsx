import { useState, useEffect } from 'react';

import avatar from '../../assets/images/avatar.png';

import styles from './Signin.module.scss';

function Signin() {
    const [userName, setUserName] = useState('');
    const [disBtn, setDisBtn] = useState(false);
    const [userNameError, setUserNameError] = useState('');

    useEffect(() => {
        setDisBtn(userName.length < 4 || userName.length > 16);
        // setUserName(userName);
        setUserNameError(
            userName.length > 16
                ? 'Username must be at least 4 characters and not more than 16'
                : ''
        );
    }, [userName, userNameError]);

    return (
        <main>
            <img className={styles.avatar} src={avatar} alt='avatar' />
            <div>
                <div className={styles.username}>Username</div>
                {userNameError && (
                    <div style={{ color: 'red' }}>{userNameError}</div>
                )}
                <div>
                    <input
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        type='text'
                        className={styles.name}
                        name='user_name'
                        placeholder='type more than 4 characters'
                    />
                </div>
            </div>
            <a href='/booklist'>
                <button
                    onClick={() => userNameError}
                    disabled={disBtn}
                    type='submit'
                    className={disBtn ? styles.btn_disabled : styles.btn}
                >
                    Sign-in
                </button>
            </a>
        </main>
    );
}
export default Signin;
