import React from 'react';
import { useHistory } from 'react-router';
import Button from "react-bootstrap/Button";
import styles from '../styles/PageNotFound.module.css';

const PageNotFound = async () => {
    const history = await useHistory();

    return (
        <div className={`${styles.PageNotFound} lg={8} justify-content-center`}>
            <div className={styles.PageNotFoundContainer}>
                <h1>This isn't the page you're looking for</h1>
                <br />
            </div>
            <div className={styles.BtnContainer}>
                <Button
                    onClick={() => history.goBack()}
                    className={styles.GoBackBtn}
                >
                    Go Back
                </Button>
            </div>
        </div>
    );
};

export default PageNotFound;