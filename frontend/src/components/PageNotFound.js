import React from 'react';
import { useHistory } from 'react-router';
import { motion } from 'framer-motion/dist/framer-motion';
import styles from '../styles/PageNotFound.module.css';

const PageNotFound = () => {
    const history = useHistory();

    const containerVariants = {
        initial: {
            opacity: 0,
            x: '100vw'
        },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                type: 'spring', delay: 0.5,
                when: 'beforeChildren'
            }
        }
    };

    const containerBtn = {
        initial: {
            opacity: 0
        },
        visible: {
            opacity: 1
        }
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="initial"
            animate="visible"
            className={`${styles.PageNotFound}
            lg={8} justify-content-center`}
        >
            <div className={styles.PageNotFoundContainer}>
                <motion.h1>
                    This isn't the page you're looking for
                </motion.h1>
                <br />
            </div>
            <div className={styles.BtnContainer}>
                <motion.button
                    variants={containerBtn}
                    whileHover={{
                        scale: 1.05,
                        textShadow: "0px 0px 6px rgb(255,255,255)",
                        boxShadow: "0px 0px 6px rgb(255,255,255)"
                    }}
                    onClick={() => { history.goBack(); }}
                    className={styles.GoBackBtn}
                >
                    <span>Go Back</span>
                </motion.button>
            </div>
        </motion.div>
    );
};

export default PageNotFound;