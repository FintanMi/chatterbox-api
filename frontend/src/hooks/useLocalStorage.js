import { useState } from 'react';

const useLocalStorage = (key, defaultValue) => {
    const [rate, setRateValue] = useState(() => {
        if (typeof window === 'undefined') {
            return defaultValue;
        }
        try {
            const score = localStorage.getItem(key);
            return score ? JSON.parse(score) : defaultValue;
        } catch (err) {
            console.log(err);
            return defaultValue;
        }
    });

    const setRate = value => {
        try {
            setRateValue(value);
            if (typeof window !== 'undefined') {
                localStorage.setItem(key, JSON.stringify(value));
            }
        } catch (err) {
            console.log(err);
        }
    };

    return [rate, setRate];
};

export default useLocalStorage;