import React from 'react';
import { AnimatePresence, motion } from 'framer-motion/dist/framer-motion';
import useMeasure from 'react-use-measure';

function DynamicDiv({ children }) {
    let [ref, { height }] = useMeasure();

    return (
        <motion.div
            animate={{ height }}
            className='overflow-hidden'
        >
            <div ref={ref} className='px-8 pb-8'>
                {children}
            </div>
        </motion.div>
    );

}

export default DynamicDiv;