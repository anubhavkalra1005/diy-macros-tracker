import React, { useEffect, useState, useRef } from 'react';
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faUser } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/Logo.png';

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [navOpen, setNavOpen] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef();
    const navRef = useRef();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close dropdown and hamburger when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setShowDropdown(false);
            }
            if (navRef.current && !navRef.current.contains(e.target)) {
                setNavOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Close hamburger menu when a link is clicked
    const handleNavLinkClick = () => setNavOpen(false);

    return (
        <nav className={`header-navbar${scrolled ? ' header-navbar-rounded' : ''}`}>
            <div className="header-top-row" ref={navRef}>
                <div className="header-left">
                    <button className="hamburger-btn" onClick={() => setNavOpen(!navOpen)}>
                        <FontAwesomeIcon icon={navOpen ? faTimes : faBars} />
                    </button>
                    <a className="header-logo-link" href="/">
                        <img src={logo} className="header-logo" alt="Logo" />
                        <span className="header-title">DIY Macros Tracker</span>
                    </a>
                </div>
                <ul className={`header-nav hamburger-dropdown-menu ${navOpen ? 'show' : ''}`}>
                    <li>
                        <NavLink to="/" className="header-nav-link hamburger-dropdown-item" end onClick={handleNavLinkClick}>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/macros-chart" className="header-nav-link hamburger-dropdown-item" onClick={handleNavLinkClick}>
                            Macros Chart
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/macros-tracker" className="header-nav-link hamburger-dropdown-item" onClick={handleNavLinkClick}>
                            Macros Tracker
                        </NavLink>
                    </li>
                </ul>
                <div className="header-right">
                    <div className="header-profile-dropdown" ref={dropdownRef}>
                        <button className="header-profile-btn" onClick={() => setShowDropdown(!showDropdown)}>
                            <FontAwesomeIcon icon={faUser} className="header-profile-icon" />
                        </button>
                        {showDropdown && (
                            <ul className="header-dropdown-menu">
                                <li><a className="header-dropdown-item" href="#">Profile</a></li>
                                <li><a className="header-dropdown-item" href="#">Settings</a></li>
                                <li><hr className="header-dropdown-divider" /></li>
                                <li><a className="header-dropdown-item" href="#">Logout</a></li>
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
