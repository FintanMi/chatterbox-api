import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import styles from "../../styles/CreateCommunity.module.css";
import appStyles from "../../App.module.css";
import { useHistory } from "react-router";
import { axiosReq } from '../../api/axiosDefault';
import { useRedirect } from '../../hooks/useRedirect';

function CreateCommunity() {
    useRedirect('loggedOut');
    const [errors, setErrors] = useState({});

    const [community, setCommunity] = useState({
        name: "",
        description: "",
    });
    const { name, description } = community;
    const [chars, setChars] = useState(21);
    const history = useHistory();

    const handleChange = (e) => {
        setCommunity({
            ...community,
            [e.target.name]: e.target.value
        });
    };

    const handleNameLimit = (e) => {
        if (e.target.value.length > 21) return;
        setCommunity(e.target.value);
        setChars(21 - e.target.value.length);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axiosReq.post("/community/", community);
            history.push(`/community/${data.id}`);
        } catch (err) {
            console.log(err);
            if (err.response?.status !== 401) {
                setErrors(err.response?.data);
            }
        }
    };

    const communityFields = (
        <div className="text-center">
            <div>
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        value={name}
                        onChange={handleNameLimit}
                    />
                    <Form.Label
                        className={styles.NameLimit}
                    >
                        {chars} characters remaining
                    </Form.Label>
                </Form.Group>
                {errors?.name?.map((message, idx) => (
                    <Alert variant="warning" key={idx}>
                        {message}
                    </Alert>
                ))}
            </div>

            <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={6}
                    name="description"
                    value={description}
                    onChange={handleChange}
                />
            </Form.Group>
            {errors?.description?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                    {message}
                </Alert>
            ))}

            <Button
                onClick={() => history.goBack()}
                className={styles.BtnCancel}
            >
                Cancel
            </Button>
            <Button
                type="submit"
                className={styles.BtnCreate}
            >
                Create
            </Button>
        </div >
    );

    return (
        <Form onSubmit={handleSubmit}>
            <Row>
                <Col lg={4}></Col>
                <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2">
                    <Container className={appStyles.Content}>
                        <div>
                            {communityFields}
                        </div>
                    </Container>
                </Col>
                <Col lg={4}></Col>
            </Row>
        </Form>
    );
}

export default CreateCommunity;