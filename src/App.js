import React from 'react';
import { Route, Routes } from 'react-router';

import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Signin from './components/Signin/Signin.jsx';
import SpecificBook from './components/Specific-book/SpecificBook.jsx';
import Booklist from './components/Book-list/Booklist.jsx';
import NotFoundBlock from './components/NotFoundPage/NotFoundPage.jsx';
import Cart from './components/Cart/Cart.jsx';

import { RequireAuth } from './hooks/RequireAuth.jsx';
// import { AuthProvider } from './context/AuthProvider.jsx';

import './scss/app.scss';

export const SearchContext = React.createContext();

const user = JSON.parse(localStorage.getItem('user'));

function App() {
    const [searchValue, setSearchValue] = React.useState('');

    return (
        <div className='wrapper'>
            {/* <AuthProvider> */}
            <SearchContext.Provider value={{ searchValue, setSearchValue }}>
                <Header />
                <Routes>
                    <Route path='/' element={<Signin />} />
                    <Route
                        path='/booklist'
                        element={
                            <RequireAuth>
                                <Booklist searchValue={searchValue} />
                            </RequireAuth>
                        }
                    />
                    <Route
                        path='/booklist/book/:bookId'
                        element={
                            <RequireAuth>
                                <SpecificBook />
                            </RequireAuth>
                        }
                    />

                    <Route
                        path='/cart'
                        element={
                            <RequireAuth>
                                <Cart />
                            </RequireAuth>
                        }
                    />

                    <Route
                        path='*'
                        element={
                            <RequireAuth>
                                {user ? <NotFoundBlock /> : <Signin />}
                            </RequireAuth>
                        }
                    />
                </Routes>
                <Footer />
            </SearchContext.Provider>
            {/* </AuthProvider> */}
        </div>
    );
}

export default App;

// проверить наименование папок (hooks?)
