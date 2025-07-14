

import React, { useEffect, useState } from 'react';
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import logo from '../../assets/Logo.png';
import { NavLink } from 'react-router-dom';

export default function Header() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <nav className={`header-navbar${scrolled ? ' header-navbar-rounded' : ''}`}>
                <div className="header-left">
                    <a className="header-logo-link" href="/">
                        <img
                            src={logo}
                            width="60"
                            height="60"
                            className="header-logo"
                            alt="Logo"
                        />
                        <span className="header-title">DIY Macros Tracker</span>
                    </a>
                </div>
                <ul className="header-nav">
                    <li>
                        <NavLink to="/" className="header-nav-link" end>Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/macros-chart" className="header-nav-link" end>Macros Chart</NavLink>
                    </li>
                    <li>
                        <NavLink to="/macros-tracker" className="header-nav-link" end>Macros Tracker</NavLink>
                    </li >
                </ul >
        <div className="header-profile-dropdown">
            <button className="header-profile-btn" tabIndex={0}>
                <FontAwesomeIcon icon={faUser} className="header-profile-icon" />
            </button>
            <ul className="header-dropdown-menu">
                <li><a className="header-dropdown-item" href="#">Profile</a></li>
                <li><a className="header-dropdown-item" href="#">Settings</a></li>
                <li><hr className="header-dropdown-divider" /></li>
                <li><a className="header-dropdown-item" href="#">Logout</a></li>
            </ul>
        </div>
            </nav >
        </>
    );
}