import React from 'react';
import { useModal } from 'react-hooks-use-modal';

import PageBook from '../Specific-book/PageBook';
import Sort from '../Sort';
import { sortOptions } from '../Sort';
import { MainContext } from '../../context/MainContext';
import Loader from '../Loader';

import styles from './Booklist.module.scss';

function Booklist() {
    const { books } = React.useContext(MainContext);
    const [filteredItems, setFilteredItems] = React.useState(null);
    const [filterPrice, setFilterPrice] = React.useState(sortOptions[0]);
    const [filterSearch, setFilterSearch] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(true);
    const [Modal, open, close] = useModal('root', {
        preventScroll: true,
        closeOnOverlayClick: false,
        initialValue: true,
    });

    const closeModal = () => {
        close();
        sessionStorage.setItem('knows_about_offline', true);
    };

    React.useEffect(() => {
        let result = null;
        const filterPriceDefault = sortOptions[0];

        if (filterPrice !== filterPriceDefault || filterSearch !== '') {
            result = books
                .filter(
                    (item) =>
                        filterPrice.priceFilter.min_price <= item.price &&
                        item.price <= filterPrice.priceFilter.max_price
                )
                .filter((item) =>
                    item.title
                        .toLowerCase()
                        .includes(filterSearch.toLowerCase())
                );
        }
        setFilteredItems(
            filterPrice !== filterPriceDefault
                ? result.sort((a, b) => a.price - b.price)
                : result
        );
        setIsLoading(false);
    }, [filterPrice, filterSearch, books]);

    return (
        <main>
            {isLoading && <Loader />}
            <section className={styles.search_block}>
                <div className={styles.box}>
                    <div className={styles.container}>
                        <span className={styles.search_icon}>
                            <svg
                                className={styles.icon}
                                version='1.1'
                                viewBox='0 0 128 128'
                            >
                                <g>
                                    <path d='M109,55c0-29.8-24.2-54-54-54C25.2,1,1,25.2,1,55s24.2,54,54,54c13.5,0,25.8-5,35.2-13.1l25.4,25.4l5.7-5.7L95.9,90.2   C104,80.8,109,68.5,109,55z M55,101C29.6,101,9,80.4,9,55S29.6,9,55,9s46,20.6,46,46S80.4,101,55,101z' />
                                    <path d='M25.6,30.9l6.2,5.1C37.5,29,46,25,55,25v-8C43.6,17,32.9,22.1,25.6,30.9z' />
                                    <path d='M17,55h8c0-2.1,0.2-4.1,0.6-6.1l-7.8-1.6C17.3,49.8,17,52.4,17,55z' />
                                </g>
                            </svg>
                        </span>
                        <input
                            value={filterSearch}
                            onChange={(event) => {
                                setFilterSearch(event.target.value);
                            }}
                            className={styles.search}
                            type='search'
                            id='search'
                            placeholder='Search by book name'
                        />
                    </div>
                </div>
                <Sort
                    value={filterPrice}
                    onChangeSort={(i) => setFilterPrice(i)}
                />
            </section>
            <section id='cards'>
                {filteredItems?.length !== 0 && filteredItems !== [] ? (
                    <div className={styles.card_container}>
                        {(filteredItems ?? books).map((obj) => (
                            <PageBook key={obj.id} {...obj} />
                        ))}
                    </div>
                ) : (
                    <div className={styles.unfound_books}>
                        Nothing found for your request 🤔
                    </div>
                )}
                {JSON.parse(sessionStorage.getItem('knows_about_offline')) ===
                    false && (
                    <Modal onChange={open}>
                        <div className={styles.modal}>
                            <h1>
                                An error occurred while fetching data via API,
                                using local copy ✅ ↓
                            </h1>
                            <div>
                                <button
                                    onClick={closeModal}
                                    className={styles.btn}
                                >
                                    OK
                                </button>
                            </div>
                        </div>
                    </Modal>
                )}
            </section>
        </main>
    );
}
export default Booklist;
