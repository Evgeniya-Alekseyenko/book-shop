import Header from './components/Header.jsx';
import Signin from './components/Signin/Signin.jsx';

import './scss/app.scss';

function App() {
    return (
        <div className='wrapper'>
            <Header />
            <Signin />
        </div>
    );
}

export default App;
