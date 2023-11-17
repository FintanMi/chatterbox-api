import React from 'react';
import { Container } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import logo from '../assets/box.png';
import styles from '../styles/NavBar.module.css';
import { NavLink } from 'react-router-dom';
import { useCurrentUser } from '../contexts/CurrentUserContext';

const NavBar = () => {
    const currentUser = useCurrentUser();
    const loggedInIcons = <>
        {currentUser?.username}
    </>;
    const loggedOutIcons = <>
        <NavLink
            to='/login'
            className={styles.Navlink}
            style={{ textDecoration: 'none' }}
        >
            <i className="fas fa-sign-in-alt"></i> Login
        </NavLink>
        <NavLink
            to='/register'
            className={styles.Navlink}
            style={{ textDecoration: 'none' }}
        >
            <i className="fas fa-user-plus"></i> Register
        </NavLink>
    </>;

    return (
        <Navbar className={styles.NavBar} expand="md" fixed='top'>
            <Container>
                <Nav>
                    <NavLink to='/' style={{ textDecoration: 'none' }}>
                        <Navbar.Brand>
                            <img src={logo} alt='logo' height='48' />
                            <span className={styles.LogoText}>chatterbox</span>
                        </Navbar.Brand>
                    </NavLink>
                </Nav>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto text-right">
                        {currentUser ? loggedInIcons : loggedOutIcons}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar;