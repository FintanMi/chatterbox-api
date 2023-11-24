import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import logo from '../assets/box.png';
import styles from '../styles/NavBar.module.css';
import { NavLink } from 'react-router-dom';
import { useCurrentUser, useSetCurrentUser } from '../contexts/CurrentUserContext';
import Avatar from './Avatar';
import axios from 'axios';
import useClickOutsideToggle from '../hooks/useClickOutsideToggle';
import { removeTokenTimestamp } from '../utils/utils';

const NavBar = () => {
    const currentUser = useCurrentUser();
    console.log('CURRENT USER: ', currentUser);
    const setCurrentUser = useSetCurrentUser();

    const { burgerExpand, setBurgerExpand, ref } = useClickOutsideToggle();

    const handleSignout = async () => {
        try {
            await axios.post('dj-rest-auth/logout/');
            setCurrentUser(null);
            removeTokenTimestamp();
        } catch (err) {
            console.log(err);
        }
    };

    const loggedInIcons = <>
        <NavLink
            to='/feed'
            className={styles.Navlink}
            style={{ textDecoration: 'none' }}
        >
            <i className="fas fa-stream"></i> Feed
        </NavLink>
        <NavLink
            to='/liked'
            className={styles.Navlink}
            style={{ textDecoration: 'none' }}
        >
            <i className="fas fa-heart"></i> Liked
        </NavLink>
        <NavLink
            to='/'
            className={styles.Navlink}
            style={{ textDecoration: 'none' }}
            onClick={handleSignout}
        >
            <i className="fas fa-sign-out-alt"></i> Logout
        </NavLink>
        <NavLink
            to={`/profiles/${currentUser?.profile_id}`}
            className={styles.Navlink}
            style={{ textDecoration: 'none' }}
        >
            <Avatar src={currentUser?.profile_image} text='Profile' height={40} />
        </NavLink>
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

    const createIcon = (
        <>
            <NavLink
                to='/posts/create'
                className={styles.Navlink}
                style={{ textDecoration: 'none' }}
            >
                <i className="fas fa-plus-square"></i> Create Post
            </NavLink>
            <NavLink
                to='/community/create'
                className={styles.Navlink}
                style={{ textDecoration: 'none' }}
            >
                <i className="fas fa-plus-square"></i> Create Community
            </NavLink>
        </>
    );

    return (
        <Navbar expanded={burgerExpand} className={styles.NavBar} expand="md" fixed='top'>
            <Container>
                <NavLink to='/' style={{ textDecoration: 'none' }}>
                    <Navbar.Brand>
                        <img src={logo} alt='logo' height='48' />
                        <span className={styles.LogoText}>chatterbox</span>
                    </Navbar.Brand>
                </NavLink>
                {currentUser && createIcon}
                <Navbar.Toggle
                    ref={ref}
                    onClick={() => setBurgerExpand(!burgerExpand)}
                    aria-controls="basic-navbar-nav"
                />
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