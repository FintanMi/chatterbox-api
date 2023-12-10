import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useHistory } from 'react-router-dom';
import { axiosReq } from '../../api/axiosDefault';
import { useRedirect } from '../../hooks/useRedirect';
import styles from '../../styles/Contact.module.css';
import { motion } from 'framer-motion/dist/framer-motion';


const ContactForm = () => {
    useRedirect('loggedOut');
    const [errors, setErrors] = useState();
    const [contactMessage, setContactMessage] = useState({
        issue: '',
        body: '',
    });
    const { issue, body } = contactMessage;
    const history = useHistory();

    const handleChange = (e) => {
        setContactMessage({
            ...contactMessage,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append('issue', issue);
        formData.append('body', body);

        try {
            await axiosReq.post('/contact/', formData);
            history.goBack();
        } catch (err) {
            if (err.response?.status !== 401) {
                setErrors(err.response?.data);
            }
        }
    };

    const textFields = (
        <div className={`text-center ${styles.ContactContainer}`}>
            <Form.Group className={styles.Contact}>
                <Form.Label>Having an Issue?</Form.Label>
                <Form.Control
                    type="text"
                    name="issue"
                    value={issue}
                    onChange={handleChange}
                />
            </Form.Group>
            {errors?.issue?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                    {message}
                </Alert>
            ))}

            <Form.Group className={styles.Contact}>
                <Form.Label>Message</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={6}
                    name="body"
                    value={body}
                    onChange={handleChange}
                />
            </Form.Group>
            {errors?.body?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                    {message}
                </Alert>
            ))}

            <motion.button
                whileHover={{ scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 700 }}
                onClick={() => history.goBack()}
                className={styles.BtnPostCancel}
            >
                Cancel
            </motion.button>
            <motion.button
                whileHover={{ scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 700 }}
                type="submit"
                className={styles.BtnPostCreate}
            >
                Send
            </motion.button>
        </div>
    );

    return (

        <Form onSubmit={handleSubmit}>
            <Row>
                <Col></Col>
                <Col md={6}>{textFields}</Col>
                <Col></Col>
            </Row>
        </Form>
    );
};

export default ContactForm;