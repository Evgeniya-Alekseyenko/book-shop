import styles from './SpecificBook.module.scss';
import React from 'react';
import { useLocation } from 'react-router-dom';

const SpecificBook = ({
    title,
    author,
    image,
    price,
    shortDescription,
    description,
}) => {
    const book = useLocation().state;

    return (
        <section>
            <div className={styles.wrapper}>
                <div className={styles.wrapper__column}>
                    <img
                        className={styles.book_cover}
                        src={
                            book.image
                                ? book.image
                                : 'https://via.placeholder.com/250x328.png?text=No+Image'
                        }
                        alt="book's foto"
                    />
                </div>
                <div className={styles.wrapper__column}>
                    <h2>
                        Book name:
                        <span className={styles.book_value}>{book.title}</span>
                    </h2>
                    <h2>
                        Book author:
                        <span className={styles.book_value}>{book.author}</span>
                    </h2>
                    <p>
                        <span className={styles.tags}>Short description:</span>{' '}
                        {book.shortDescription}
                    </p>
                </div>
                <div className={styles.wrapper__column}>
                    <div className={styles.column_price}>
                        <h3 className={styles.count}>
                            Price:
                            <span className={styles.book_value} id='price'>
                                {book.price}
                            </span>
                        </h3>
                        <form>
                            <label className={styles.count}>Count</label>
                            <input
                                type='number'
                                placeholder='0'
                                id='count'
                                name='count'
                                className={styles.input_count}
                            />
                            <div className={styles.count}>
                                Total price:
                                <span
                                    className={styles.book_value}
                                    id='totalPrice'
                                ></span>
                            </div>
                            <div className={styles.btn}>
                                <button type='submit' className={styles.btn}>
                                    Add to cart
                                </button>
                                <div className={styles.btn_particles}></div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className={styles.description_book}>
                <span className={styles.description}>Description:</span>
                {book.description}
            </div>
        </section>
    );
};
export default SpecificBook;
