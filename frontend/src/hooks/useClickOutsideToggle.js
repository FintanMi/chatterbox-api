import { useEffect, useRef, useState } from 'react';

const useClickOutsideToggle = () => {
    const [burgerExpand, setBurgerExpand] = useState(false);
    const ref = useRef(null);
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setBurgerExpand(false);
            }
        };
        document.addEventListener('mouseup', handleClickOutside);
        return () => {
            document.removeEventListener('mouseup', handleClickOutside);
        };
    }, [ref]);

    return { burgerExpand, setBurgerExpand, ref };
};

export default useClickOutsideToggle;