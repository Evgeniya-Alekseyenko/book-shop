import { Route, Routes } from 'react-router';

import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Signin from './components/Signin/Signin.jsx';
import SpecificBook from './components/Specific-book/SpecificBook.jsx';
import Booklist from './components/Book-list/Booklist.jsx';
import NotFoundBlock from './components/NotFoundPage/NotFoundPage.jsx';

import './scss/app.scss';

function App() {
    return (
        <div className='wrapper'>
            <Header />
            <Routes>
                <Route path='/' element={<Signin />} />
                <Route path='/booklist' element={<Booklist />} />
                <Route path='/book' element={<SpecificBook />} />
                <Route path='*' element={<NotFoundBlock />} />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;
