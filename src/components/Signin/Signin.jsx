import { useState, useEffect } from 'react';

import avatar from '../../assets/images/avatar.png';

import styles from './Signin.module.scss';

function Signin() {
    const [userName, setUserName] = useState('');
    const [disBtn, setDisBtn] = useState(false);
    console.log(userName);

    useEffect(() => {
        setDisBtn(userName.length < 4 || userName.length > 16);
        setUserName(userName);
    }, [userName]);

    return (
        <main>
            <img className={styles.avatar} src={avatar} alt='avatar' />
            <div>
                <label className={styles.username}>Username</label>
                <div>
                    <input
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        type='text'
                        className={styles.name}
                        name='user_name'
                        placeholder='type Username'
                    />
                </div>
            </div>
            <a href='/booklist'>
                <button disabled={disBtn} type='submit' className={styles.btn}>
                    Sign-in
                </button>
            </a>
        </main>
    );
}
export default Signin;
