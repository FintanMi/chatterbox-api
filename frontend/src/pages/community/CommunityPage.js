import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from '../../styles/CommunityPage.module.css';
import gaming from '../../assets/gaming.png';
import medal from '../../assets/medal.png';
import tech from '../../assets/tech.png';
import tv from '../../assets/tv.png';
import nature from '../../assets/mountain.png';

const CommunityPage = () => {
    return (
        <Container className={`${styles.Content} text-center`}>
            <h5 className='mb-3'>Topics</h5>
            <hr className={styles.HR} />
            <div className={styles.CommunityLink}>
                <Link style={{ textDecoration: 'none' }} to='/gaming'>
                    <img
                        src={gaming}
                        alt='icon'
                        height='22'
                        className={styles.CommunityLinkIcon}
                    />
                    Gaming
                </Link>
                <Link style={{ textDecoration: 'none' }}>
                    <img
                        src={medal}
                        alt='icon'
                        height='22'
                        className={styles.CommunityLinkIcon}
                    />
                    Sports
                </Link>
                <Link style={{ textDecoration: 'none' }}>
                    <img
                        src={tech}
                        alt='icon'
                        height='22'
                        className={styles.CommunityLinkIcon}
                    />
                    Technology
                </Link>
                <Link style={{ textDecoration: 'none' }}>
                    <img
                        src={tv}
                        alt='icon'
                        height='22'
                        className={styles.CommunityLinkIcon}
                    />
                    Television
                </Link>
                <Link style={{ textDecoration: 'none' }}>
                    <img
                        src={nature}
                        alt='icon'
                        height='22'
                        className={styles.CommunityLinkIcon}
                    />
                    Nature
                </Link>
            </div>
        </Container>
    );
};

export default CommunityPage;