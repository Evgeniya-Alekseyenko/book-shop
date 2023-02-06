import { Link } from 'react-router-dom';

function Header() {
    return (
        <header>
            <div className='header'>
                <h1>X-course task / Прізвище Ім’я</h1>
                <Link to='/'>
                    <button type='submit' className='btn'>
                        Sign-Out
                    </button>
                </Link>
            </div>
        </header>
    );
}
export default Header;
