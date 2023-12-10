import React from 'react';
import { motion } from 'framer-motion/dist/framer-motion';
import useMeasure from 'react-use-measure';

function DynamicDiv({ children }) {
    let [ref, { height }] = useMeasure();

    return (
        <motion.div
            animate={{ height }}
            className='overflow-hidden'
        >
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                <div ref={ref} className='px-8 pb-8'>
                    {children}
                </div>
            </motion.div>
        </motion.div>
    );

}

export default DynamicDiv;