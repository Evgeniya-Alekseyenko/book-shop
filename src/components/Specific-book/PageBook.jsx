import { Link } from 'react-router-dom';

import styles from './SpecificBook.module.scss';

const PageBook = ({
    id,
    title,
    author,
    price,
    image,
    shortDescription,
    description,
}) => {
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
                    <Link
                        to={{ pathname: `book/${id}` }}
                        state={{
                            id,
                            title,
                            author,
                            price,
                            image,
                            shortDescription,
                            description,
                        }}
                    >
                        <button className={styles.btn}>View</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};
export default PageBook;
