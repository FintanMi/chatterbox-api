import React from 'react';
import styles from '../styles/Modal.module.css';

function Modal({ children, onClose }) {
    return <>
        <div className={styles.Backdrop} onClick={onClose} />
        <dialog open className={styles.Modal}>
            {children}
        </dialog>
    </>;
}

export default Modal;