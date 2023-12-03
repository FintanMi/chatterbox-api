import React, { useState } from 'react';
import styles from '../styles/Carousel.module.css';
import right from '../assets/right.png';
import left from '../assets/left.png';
import { AnimatePresence, motion } from 'framer-motion/dist/framer-motion';

function Carousel() {
    let [count, setCount] = useState(1);
    let [prev, setPrev] = useState([null, count]);

    if (prev[1] !== count) {
        setPrev([prev[1], count]);
    }
    let direction = count > prev[0] ? 'increasing' : 'decreasing';

    let variants = {
        enter: (direction) => ({ x: direction === 'increasing' ? 100 : -100 }),
        centre: { x: 0 },
        exit: (direction) => ({ x: direction === 'decreasing' ? -100 : 100 }),
    };

    return (
        <div className={styles.CarouselContainer}>
            <div className={styles.CarouselContainerBtn}>
                <button
                    onClick={() => setCount(count - 1)}
                    src={left}
                    className={styles.BtnLeft}
                ></button>
                <button
                    onClick={() => setCount(count + 1)}
                    src={right}
                    className={styles.Right}
                ></button>
            </div>
            <div className={styles.CarouselContainerOuter}>
                <div className={styles.CarouselContainerInner}>
                    <AnimatePresence custom={direction}>
                        <motion.div
                            className={styles.CarouselContainerContent}
                            key={count}
                            variants={variants}
                            inital='enter'
                            animate='centre'
                            exit='exit'
                            custom={direction}
                        >
                            {count}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}

export default Carousel;