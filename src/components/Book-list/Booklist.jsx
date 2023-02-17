import React from 'react';

import PageBook from '../Specific-book/PageBook';
import Sort from '../Sort';
import { sortOptions } from '../Sort';

import styles from './Booklist.module.scss';

function Booklist() {
    const [items, setItems] = React.useState([]);
    const [filteredItems, setFilteredItems] = React.useState(null);
    const [filterType, setFilterType] = React.useState(sortOptions[0]);
    const [searchValue, setSearchValue] = React.useState('');

    React.useEffect(() => {
        fetch(
            `https://63da5cca2af48a60a7cbb748.mockapi.io/books?${
                searchValue ? `&title=${searchValue}` : ''
            }`
        )
            .then((response) => response.json())
            .then((arr) => {
                setItems(arr);
            });
        setFilterType(sortOptions[0]);
        setFilteredItems(null);
    }, [searchValue]);

    function filter(filterType) {
        const new_items = items
            .filter(
                (item) =>
                    filterType.priceFilter.min_price <= item.price &&
                    item.price <= filterType.priceFilter.max_price
            )
            .sort((a, b) => a.price - b.price);
        setFilteredItems(new_items);
        setFilterType(filterType);
    }

    return (
        <main>
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
                            value={searchValue}
                            onChange={(event) =>
                                setSearchValue(event.target.value)
                            }
                            className={styles.search}
                            type='search'
                            id='search'
                            placeholder='Search by book name'
                        />
                    </div>
                </div>
                <Sort
                    value={filterType}
                    setsort={setFilterType}
                    onChangeSort={(i) => filter(i)}
                />
            </section>
            <section id='cards'>
                <div className={styles.card_container}>
                    {(filteredItems ?? items).map((obj) => (
                        <PageBook key={obj.id} {...obj} />
                    ))}
                </div>
            </section>
        </main>
    );
}
export default Booklist;
