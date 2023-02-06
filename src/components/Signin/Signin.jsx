import avatar from '../../assets/images/avatar.png';

import styles from './Signin.module.scss';

function Signin() {
    return (
        <main>
            <img className={styles.avatar} src={avatar} alt='avatar' />
            <div>
                <label className={styles.username}>Username</label>
                <div>
                    <input
                        type='text'
                        className={styles.name}
                        name='user_name'
                        placeholder='type Username'
                    />
                </div>
            </div>
            <a href='/booklist'>
                <button type='submit' className={styles.btn}>
                    Sign-in
                </button>
            </a>
        </main>
    );
}
export default Signin;
