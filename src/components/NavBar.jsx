import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className='nav-bar'>
            <ul>
                <li className="header">Open Library API</li>
                <li><Link to="/">Dashboard</Link></li>
                <li><a href="https://openlibrary.org/dev/docs/api/search">About</a></li>
            </ul>
        </nav>
    );
};

export default Navbar;
