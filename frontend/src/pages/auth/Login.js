import React, { useState } from "react";
import axios from 'axios';
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import { Link, useHistory } from "react-router-dom";
import styles from "../../styles/Login.module.css";
import appStyles from "../../App.module.css";
import { useSetCurrentUser } from "../../contexts/CurrentUserContext";

function Login() {
    const setCurrentUser = useSetCurrentUser();
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
            history.push('/');
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

    return (
        <Row className={styles.Row}>
            <Col></Col>
            <Col className="my-auto p-0 p-md-2" md={6}>
                <Container className={`${appStyles.Content} p-4 `}>
                    <h1 className={styles.Header}>sign in</h1>
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

                        <Button className={styles.Btn} type="submit">
                            Submit
                        </Button>
                        {errors.non_field_errors?.map((message, idx) => (
                            <Alert key={idx} variant='warning'>
                                {message}
                            </Alert>
                        ))}
                    </Form>

                </Container>
                <Container className={`mt-3 ${appStyles.ContentLink}`}>
                    <Link className={styles.Link} style={{ textDecoration: 'none' }} to="/register">
                        Don't have an account? <span>Register now!</span>
                    </Link>
                </Container>
            </Col>
            <Col></Col>
        </Row>
    );
}

export default Login;