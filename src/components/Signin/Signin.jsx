import React, { useState, useEffect } from 'react';

import avatar from '../../assets/images/avatar.png';
import { UserContext } from '../../App';

import styles from './Signin.module.scss';

function Signin() {
    // const [userName, setUserName] = useState('');
    const [disBtn, setDisBtn] = useState(false);
    // const [userNameError, setUserNameError] = useState('');

    const { userName, setUserName } = React.useContext(UserContext);

    localStorage.setItem('username', userName);
    const name = localStorage.getItem('username');
    console.log(name);

    useEffect(() => {
        setDisBtn(userName.length < 4 || userName.length > 16);
        setUserName(name);
        // setUserNameError(
        //     userName.length > 16
        //         ? 'Username must be at least 4 characters and not more than 16'
        //         : ''
        // );
    }, [userName, setUserName, name]);

    // console.log(userName);

    return (
        <main>
            <img className={styles.avatar} src={avatar} alt='avatar' />
            <div>
                <div className={styles.username}>Username</div>
                {/* {userNameError && (
                    <div style={{ color: 'red' }}>{userNameError}</div>
                )} */}
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
                    // onClick={() => userNameError}
                    onClick={() => setUserName(name)}
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
