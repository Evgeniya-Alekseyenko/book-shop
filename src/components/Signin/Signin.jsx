import avatar from '../../assets/images/avatar.png';

import styles from './Signin.module.scss';

function Signin() {
    return (
        <main>
            <img className={styles.avatar} src={avatar} alt='avatar' />
            <form action='/handling-form-page' method='post'>
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
                <button type='submit' className={styles.btn}>
                    Sign-in
                </button>
            </form>
        </main>
    );
}
export default Signin;
