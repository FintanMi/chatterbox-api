import React, { useEffect, useState } from 'react';
import styles from '../styles/Votes.module.css';
import thumbsup from '../assets/thumbsup.png';
import thumbsdown from '../assets/thumbsdown.png';

const Votes = () => {
    const [votes, setVotes] = useState(0);

    useEffect(() => {
        document.title = votes;
    }, []);

    const handleIncrease = () => {
        setVotes(votes => votes + 1);
    };
    const handleDecrease = () => {
        if (votes <= 0) {
            return;
        } else {
            setVotes(vote => vote - 1);
        }
    };
    const storeVotes = (e) => {
        const { value } = e.target.value;
        setVotes(value);
    };

    return (
        <div className={styles.container}>
            <div className={styles.progressbar}>
                <div className={styles.progressbarFill1}>
                    <span>Direct Messaging {votes}</span>
                    <img
                        onClick={handleIncrease}
                        className={styles.UpVote}
                        src={thumbsup}
                        height='20'
                        onChange={storeVotes}
                    />
                    <img
                        onClick={handleDecrease}
                        className={styles.DownVote}
                        src={thumbsdown}
                        height='20'
                        onChange={storeVotes}
                    />
                </div>
                <div className={styles.progressbarFill2}>
                    <span>Reply Functionality {votes}</span>
                    <img onClick={handleIncrease} className={styles.UpVote} src={thumbsup} height='20' />
                    <img onClick={handleDecrease} className={styles.DownVote} src={thumbsdown} height='20' />
                </div>
                <div className={styles.progressbarFill3}>
                    <span>Community Creation {votes}</span>
                    <img onClick={handleIncrease} className={styles.UpVote} src={thumbsup} height='20' />
                    <img onClick={handleDecrease} className={styles.DownVote} src={thumbsdown} height='20' />
                </div>
            </div>
        </div>
    );
};

export default Votes;