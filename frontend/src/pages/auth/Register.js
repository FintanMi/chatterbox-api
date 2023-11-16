import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from 'axios'
import styles from "../../styles/Register.module.css";
import appStyles from "../../App.module.css";
import Alert from 'react-bootstrap/Alert';
import { Form, Button, Col, Row, Container } from "react-bootstrap";

const Register = () => {
    const [registerData, setRegisterData] = useState({
        username: '',
        password1: '',
        password2: ''
    })
    const {username, password1, password2} = registerData;
    const [errors, setErrors] = useState({});
    const history = useHistory();

    const handleChange = (e) => {
        setRegisterData({
          ...registerData,
          [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("/dj-rest-auth/registration/", registerData);
            history.push("/login");
        } catch (err) {
            setErrors(err.response?.data);
        }
    };

    return (
        <Row className={styles.Row}>
            <Col></Col>
            <Col className="my-auto py-2 p-md-2" md={6}>
                <Container className={`${appStyles.Content} p-4 `}>
                <h1 className={styles.Header}>sign up</h1>
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

                    <Form.Group controlId="password1">
                        <Form.Label className='d-none'>Password</Form.Label>
                        <Form.Control
                            className={styles.Input}
                            type="password"
                            placeholder="Password"
                            name="password1"
                            value={password1}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    {errors.password1?.map((message, idx) => (
                    <Alert key={idx} variant="warning">
                        {message}
                    </Alert>
                    ))}

                    <Form.Group controlId="password2">
                        <Form.Label className='d-none'>Confirm Password</Form.Label>
                        <Form.Control
                            className={styles.Input}
                            type="password"
                            placeholder="Password"
                            name="password2"
                            value={password2}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    {errors.password2?.map((message, idx) => (
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
                <Container className={`mt-3 ${appStyles.Content}`}>
                <Link className={styles.Link} style={{textDecoration: 'none'}} to="/login">
                    Already have an account? <span>Sign in</span>
                </Link>
                </Container>
            </Col>
            <Col></Col>
        </Row>
    );
};

export default Register;