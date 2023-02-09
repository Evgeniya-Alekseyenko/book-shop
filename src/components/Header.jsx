import React from 'react';
import { Link } from 'react-router-dom';

// import { UserContext } from '../App';

function Header() {
    // const { userName } = React.useContext(UserContext);
    // const [name, setName] = React.useState();
    // console.log(userName);

    const name = localStorage.getItem('username');
    console.log(name);

    return (
        <header>
            <div className='header'>
                <Link to='/'>
                    <h1>X-course task / Прізвище Ім’я</h1>
                </Link>
                {/* <span>{name}</span> */}

                <Link to='/'>
                    <button
                        type='submit'
                        className='btn'
                        onClick={() => localStorage.clear()}
                    >
                        Sign-Out
                    </button>
                </Link>
            </div>
        </header>
    );
}
export default Header;
