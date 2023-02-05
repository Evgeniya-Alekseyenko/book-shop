import styles from './SpecificBook.module.scss';

const PageBook = ({ title, author, price, image }) => {
    return (
        <div className={styles.card}>
            <div className={styles.wrapper__column}>
                <img
                    className={styles.book_cover}
                    src={
                        image
                            ? image
                            : 'https://via.placeholder.com/250x328.png?text=No+Image'
                    }
                    alt="book's foto"
                />
            </div>
            <div className={styles.wrapper__column}>
                <h2>
                    Book name:
                    <span className={styles.book_value}>{title}</span>
                </h2>
                <h2>
                    Book author:
                    <span className={styles.book_value}>{author}</span>
                </h2>
                <div className={styles.card_footer}>
                    <h2>
                        <span className={styles.price_desc}>Price: </span>$
                        {price}
                    </h2>
                    <button className={styles.btn}>View</button>
                </div>
            </div>
        </div>
    );
};
export default PageBook;
