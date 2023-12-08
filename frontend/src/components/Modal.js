import React from 'react';
import styles from '../styles/Modal.module.css';
import ContactForm from '../pages/contact/ContactForm';

function Modal({ open }) {
    if (!open) return null;
    return (
        <div className={styles.Backdrop}>
            <div className={styles.Modal}>
                <div className={styles.ModalContent}>
                    <div><ContactForm /></div>
                </div>
            </div>

        </div>
    );
}

export default Modal;