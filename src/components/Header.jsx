import React from 'react';
import { Link } from 'react-router-dom';

import { UserContext } from '../App';

function Header() {
    const { userName } = React.useContext(UserContext);
    // const [name, setName] = React.useState();
    // console.log(userName);

    return (
        <header>
            <div className='header'>
                <h1>X-course task / Прізвище Ім’я</h1>
                <Link to='/'>
                    <button type='submit' className='btn'>
                        Sign-Out
                    </button>
                </Link>
                <span>{userName}</span>
            </div>
        </header>
    );
}
export default Header;
