import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import styles from '../styles/NavBar.module.css';
import modalStyles from '../styles/CommunityModal.module.css';
import Form from 'react-bootstrap/Form';
import { useParams } from 'react-router';
import { axiosReq } from '../api/axiosDefault';

const CommunityModal = () => {
    const [show, setShow] = useState(false);
    const [community, setCommunity] = useState('');
    const [chars, setChars] = useState(21);

    const { id } = useParams();
    const [communityName, setCommunityName] = useState({ results: [] });
    useEffect(() => {
        const handleMount = async () => {
            try {
                const [{ data: communityName }] = await Promise.all([
                    axiosReq.get(`/community/${id}`),
                ]);
                setCommunityName({ results: [communityName] });
                console.log(communityName);
            } catch (err) {
                console.log(err);
            }
        };
        handleMount();
    }, [id]);

    const handleChange = (e) => {
        if (e.target.value.length > 21) return;
        setCommunity(e.target.value);
        setChars(21 - e.target.value.length);
    };

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
                    <Modal.Title className={modalStyles.ModalHeader}>Create a community</Modal.Title>
                </Modal.Header>
                <Modal.Body className={modalStyles.ModalBody}>
                    <div>Name</div>
                    <div className={modalStyles.ModalBodySmall}>Community names including capitalisation cannot be changed</div>
                    <Form>
                        <Form.Group className={modalStyles.ModalBodyGroup}>
                            <Form.Control
                                type='text'
                                value={community}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Form>
                    <div className={modalStyles.ModalBodySmall}>{chars} characters remaining</div>
                    <div>Community Type</div>
                    <div className={modalStyles.ModalBodyGroup}>
                        <Form>
                            <Form.Group controlId="checkbox">
                                <Form.Check type="checkbox" label="Public" />
                                <Form.Check type="checkbox" label="Private" />
                            </Form.Group>
                        </Form>
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleClose} className={modalStyles.BtnCancel}>
                        Cancel
                    </Button>
                    <Button onClick={handleClose} className={modalStyles.BtnCreate}>
                        Create Community
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default CommunityModal;