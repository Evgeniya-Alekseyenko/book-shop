import avatar from '../../assets/images/avatar.png';

import styles from './Signin.module.scss';

function Signin() {
    return (
        <div className={styles.main_container}>
            <header>
                <div className={styles.heading_container}>
                    <div className={styles.headingLeft}>
                        <h1>JS BAND STORE/Your full name</h1>
                    </div>
                </div>
            </header>
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
        </div>
    );
}
export default Signin;
