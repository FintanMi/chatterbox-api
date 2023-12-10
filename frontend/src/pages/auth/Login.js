import React, { useState } from "react";
import axios from 'axios';
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { Link, useHistory } from "react-router-dom";
import styles from "../../styles/Login.module.css";
import appStyles from "../../App.module.css";
import { useSetCurrentUser } from "../../contexts/CurrentUserContext";
import { useRedirect } from "../../hooks/useRedirect";
import { setTokenTimestamp } from "../../utils/utils";
import { motion, MotionConfig } from 'framer-motion/dist/framer-motion';
import DynamicDiv from './DynamicDiv';

function Login() {
    const setCurrentUser = useSetCurrentUser();
    useRedirect('loggedIn');
    const [registerData, setRegisterData] = useState({
        username: '',
        password: '',
    });
    const { username, password } = registerData;
    const [errors, setErrors] = useState({});
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("/dj-rest-auth/login/", registerData);
            setCurrentUser(data.user);
            setTokenTimestamp(data);
            history.goBack();
        } catch (err) {
            setErrors(err.response?.data);
        }
    };

    const handleChange = (e) => {
        setRegisterData({
            ...registerData,
            [e.target.name]: e.target.value,
        });
    };

    let [expanded, setExpanded] = useState(false);

    return (
        <MotionConfig transition={{ duration: 0.25 }}>
            <div>
                <Row className={styles.Row}>
                    <Col></Col>
                    <Col className="my-auto p-0 p-md-2" md={6}>
                        <div className={styles.WelcomeText}>
                            chatterbox
                        </div>
                        <div>
                            <motion.button
                                className={styles.DynamicDivBtn}
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: 'spring', stiffness: 700 }}
                                onClick={() => setExpanded(!expanded)}>
                                Login
                            </motion.button>
                        </div>
                        <DynamicDiv>
                            {expanded ? (<motion.div

                            >
                                <Container fluid className={`${appStyles.Content} p-4`}>
                                    <motion.h1
                                        initial={{ opacity: 0, translateX: -50, translateY: -50 }}
                                        animate={{ opacity: 1, translateX: 0, translateY: 0 }}
                                        transition={{ duration: 0.25, delay: 0.1 }}
                                        className={styles.Header}>
                                        Sign in
                                    </motion.h1>
                                    <Form onSubmit={handleSubmit}>
                                        <Form.Group controlId="username">
                                            <Form.Label className='d-none'>Username</Form.Label>
                                            <Form.Control
                                                className={styles.Input}
                                                type="text"
                                                placeholder="Username"
                                                name="username"
                                                value={username}
                                                onChange={handleChange}
                                            />
                                        </Form.Group>
                                        {errors.username?.map((message, idx) => (
                                            <Alert variant='warning' key={idx}>
                                                {message}
                                            </Alert>
                                        ))}

                                        <Form.Group controlId="password">
                                            <Form.Label className='d-none'>Password</Form.Label>
                                            <Form.Control
                                                className={styles.Input}
                                                type="password"
                                                placeholder="Password"
                                                name="password"
                                                value={password}
                                                onChange={handleChange}
                                            />
                                        </Form.Group>
                                        {errors.password?.map((message, idx) => (
                                            <Alert key={idx} variant="warning">
                                                {message}
                                            </Alert>
                                        ))}

                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            transition={{ type: 'spring', stiffness: 700 }}
                                            className={styles.Btn}
                                            type="submit"
                                        >
                                            Submit
                                        </motion.button>
                                        {errors.non_field_errors?.map((message, idx) => (
                                            <Alert key={idx} variant='warning'>
                                                {message}
                                            </Alert>
                                        ))}
                                    </Form>

                                </Container>
                                <Container fluid className={`mt-3 ${appStyles.ContentLink}`}>
                                    <Link
                                        to="/register"
                                        className={styles.Link}
                                        style={{ textDecoration: 'none' }}
                                    >
                                        Don't have an account? <span className={styles.RegisterBtn}>Register now!</span>
                                    </Link>
                                </Container>
                            </motion.div>) : (
                                <span></span>
                            )}
                        </DynamicDiv>
                    </Col>
                    <Col></Col>
                </Row>
            </div>
        </MotionConfig>
    );
}

export default Login;