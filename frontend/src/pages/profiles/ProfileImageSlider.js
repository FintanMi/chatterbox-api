import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion/dist/framer-motion';
import images from './Images.js';
import styles from '../../styles/ProfileImageSlider.module.css';

function ProfileImageSlider() {
    const [width, setWidth] = useState(0);
    const slider = useRef();

    useEffect(() => {
        setWidth(slider.current.scrollWidth - slider.current.offsetWidth);
    }, []);

    return (
        <div>
            <motion.div
                className={styles.container}
                ref={slider}
                whileTap={{ cursor: 'grabbing' }}
            >
                <motion.div
                    drag='x'
                    dragConstraints={{ right: 0, left: -width }}
                    className={styles.containerInner}
                >
                    {images.map(image => {
                        return (
                            <motion.div className={styles.Item} key={image}>
                                <img className={styles.ItemImg} src={image} alt='slider' />
                            </motion.div>
                        );
                    })}
                </motion.div>
            </motion.div>
        </div>
    );
}

export default ProfileImageSlider;