import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import styles from '../styles/NavBar.module.css';

const CommunityModal = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button
                style={{ textDecoration: 'none' }}
                onClick={handleShow}
                className={styles.Navlink}
            >
                Create Community
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create a community</Modal.Title>
                </Modal.Header>
                <hr />
                <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button onClick={handleClose}>
                        Create Community
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default CommunityModal;