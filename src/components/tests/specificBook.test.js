import { MemoryRouter, useParams } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';

import { LocalStorageService, LS_KEYS } from '../../services/LocalStorage';
import SpecificBook from '../Specific-book/SpecificBook';
import { MainContext } from '../../context/MainContext';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: jest.fn(),
}));

describe('SpecificBook', () => {
    const books = [
        {
            id: 20,
            author: 'Garann Means',
            price: 20.1,
            image: 'https://courses.prometheus.org.ua/asset-v1:Ciklum+FEB101+2022_T3+type@asset+block@node_for_front_end_developers.jpg',
            title: 'Node for Front-End Developers',
            shortDescription:
                'If you know how to use JavaScript in the browser, you already have the skills you need to put JavaScript to work on back-end servers with Node.',
            description:
                'If you know how to use JavaScript in the browser, you already have the skills you need to put JavaScript to work on back-end servers with Node. This hands-on book shows you how to use this popular JavaScript platform to create simple server applications, communicate with the client, build dynamic pages, work with data, and tackle other tasks. Although Node has a complete library of developer-contributed modules to automate server-side development, this book will show you how to program with Node on your own, so you truly understand the platform. Discover firsthand how well Node works as a web server, and how easy it is to learn and use.',
        },
        {
            id: 21,
            author: 'Shelley Powers',
            price: 30,
            image: 'https://courses.prometheus.org.ua/asset-v1:Ciklum+FEB101+2022_T3+type@asset+block@learning_node_2nd_edition.jpg',
            title: 'Learning Node, 2nd Edition',
            shortDescription:
                'Take your web development skills from browser to server with Node—and learn how to write fast, highly scalable network applications on this JavaScript-based platform.',
            description:
                'Take your web development skills from browser to server with Node—and learn how to write fast, highly scalable network applications on this JavaScript-based platform. Updated for the latest Node Long Term Support (LTS) and Node Current (6.0) releases, this hands-on edition helps you master Node’s core fundamentals and gain experience with several built-in and contributed modules. Get up to speed on Node’s event-driven, asynchronous I/O model for developing data-intensive applications that are frequently accessed but computationally simple. If you’re comfortable working with JavaScript, this book provides many programming and deployment examples to help you take advantage of server-side development with Node.',
        },
    ];

    const renderComp = (bookId = '20') => {
        LocalStorageService.set(LS_KEYS.USERNAME, 'Jane');
        useParams.mockImplementation(() => ({
            bookId: bookId,
        }));

        render(
            <MainContext.Provider value={{ books }}>
                <MemoryRouter initialEntries={[`/book/${bookId}`]}>
                    <SpecificBook />
                </MemoryRouter>
            </MainContext.Provider>
        );
    };

    beforeEach(() => {
        LocalStorageService.remove(LS_KEYS.USERNAME);
    });

    it('renders component', () => {
        renderComp();
        const count = screen.getByText('Count:');
        expect(count).toBeInTheDocument();
        const title = screen.getByText('Node for Front-End Developers');
        expect(title).toBeInTheDocument();
    });

    it('should render a counter with value of 1', () => {
        renderComp();
        const input = screen.getByTestId('number-input');
        expect(input.value).toBe('1');
        const decrement = screen.getByTestId('decrement');
        userEvent.click(decrement);
        expect(input.value).toBe('');
        const error = screen.getByTestId('error').textContent;
        expect(error).toBe('You can enter more than 1 and less than 42');
    });

    it('should render a counter with a value of 42 when a larger number is entered', () => {
        renderComp();
        const input = screen.getByTestId('number-input');
        expect(input.value).toBe('1');
        userEvent.type(input, '42');
        expect(input.value).toBe('42');
        const increment = screen.getByTestId('increment');
        userEvent.click(increment);
        expect(input).toHaveValue(42);
    });

    it('should increase input value when "+" button is clicked', () => {
        renderComp();
        const input = screen.getByTestId('number-input');
        const initialValue = input.value;
        const increment = screen.getByTestId('increment');
        userEvent.click(increment);
        expect(input.value).toBe(String(Number(initialValue) + 1));
        expect(input.value).toBe('2');
    });

    it('should increment input value by 5 when "+" button is clicked 5 times', () => {
        renderComp();
        const input = screen.getByTestId('number-input');
        const increment = screen.getByTestId('increment');
        const initialValue = Number(input.value);

        for (let i = 0; i < 5; i++) {
            userEvent.click(increment);
        }

        expect(input.value).toBe(String(initialValue + 5));
        expect(input.value).toBe('6');
    });

    it('should decrease input value when "-" button is clicked', () => {
        renderComp();
        const input = screen.getByTestId('number-input');
        const increment = screen.getByTestId('increment');
        userEvent.click(increment);
        expect(input.value).toBe('2');
        const decrement = screen.getByTestId('decrement');
        userEvent.click(decrement);
        expect(input.value).toBe('1');
    });

    it('updates total price when count input value changes', () => {
        renderComp();
        const input = screen.getByTestId('number-input');
        const totalPrice = screen.getByTestId('totalPrice');
        expect(input).toHaveValue(1);
        expect(totalPrice).toHaveTextContent('20.10');
        const increment = screen.getByTestId('increment');
        userEvent.click(increment);
        expect(input).toHaveValue(2);
        expect(totalPrice).toHaveTextContent('40.20');
        userEvent.click(increment);
        expect(input).toHaveValue(3);
        expect(totalPrice).toHaveTextContent('60.30');
        userEvent.type(input, '42');
        expect(input.value).toBe('42');
        expect(totalPrice).toHaveTextContent('844.20');
        const decrement = screen.getByTestId('decrement');
        userEvent.click(decrement);
        expect(input.value).toBe('41');
        expect(totalPrice).toHaveTextContent('824.10');
        userEvent.click(decrement);
        expect(input.value).toBe('40');
        expect(totalPrice).toHaveTextContent('804.00');
    });
});
