import styles from './SpecificBook.module.scss';

import cover from '../../assets/books/angular_up_and_running.jpg';

const SpecificBook = () => {
    return (
        <section>
            <div className={styles.wrapper}>
                <div className={styles.wrapper__column}>
                    <img
                        className={styles.book_cover}
                        src={cover}
                        alt="book's foto"
                    />
                    <div className={styles.description_book}>
                        <span className={styles.description}>Description:</span>
                        A book providing an introduction to the Angular
                    </div>
                </div>
                <div className={styles.wrapper__column}>
                    <h2>
                        Book name:
                        <span className={styles.book_value}>
                            Angular Up & Running
                        </span>
                    </h2>
                    <h2>
                        Book author:
                        <span className={styles.book_value}>
                            Shyam Seshadri
                        </span>
                    </h2>
                    <p>
                        <span className={styles.tags}>Book level:</span>Beginner
                    </p>
                    <p>
                        <span className={styles.tags}>Book tags:</span>core
                    </p>
                </div>
                <div className={styles.wrapper__column}>
                    <div className={styles.column_price}>
                        <h3 className={styles.count}>
                            Price:
                            <span className={styles.book_value} id='price'>
                                52.72
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
        </section>
    );
};
export default SpecificBook;
