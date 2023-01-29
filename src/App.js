import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Signin from './components/Signin/Signin.jsx';

import './scss/app.scss';

function App() {
    return (
        <div className='wrapper'>
            <Header />
            <Signin />
            <Footer />
        </div>
    );
}

export default App;
