import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Signin from './components/Signin/Signin.jsx';
import SpecificBook from './components/Specific-book/SpecificBook.jsx';
import NotFoundBlock from './components/NotFoundPage/NotFoundPage.jsx';

import './scss/app.scss';

function App() {
    return (
        <div className='wrapper'>
            <Header />
            {/* <Signin /> */}
            {/* <NotFoundBlock /> */}
            <SpecificBook />
            <Footer />
        </div>
    );
}

export default App;
