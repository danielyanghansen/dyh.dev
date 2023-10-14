import React from 'react';
import { Link, Outlet } from 'react-router-dom';
//import './navbar.css';

const NavBar: React.FC = () => {
    return (
        <>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/landing">Landing</Link>
                    </li>
                </ul>
            </nav>
            <Outlet />
        </>
    );
};

export default NavBar;
