import styles from './NotFoundPage.module.scss';

const NotFoundPage = () => {
    return (
        <div className={styles.root}>
            <h1>Not Found 😑</h1>
            <p>Oops, something went wrong. 404 error</p>
        </div>
    );
};
export default NotFoundPage;
