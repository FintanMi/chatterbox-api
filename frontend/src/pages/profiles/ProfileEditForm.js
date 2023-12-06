import React, { useState, useEffect, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";
import styles from "../../styles/PostCreateForm.module.css";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import { motion } from 'framer-motion/dist/framer-motion';
import { axiosReq } from '../../api/axiosDefault';
import {
    useCurrentUser,
    useSetCurrentUser,
} from "../../contexts/CurrentUserContext";
import appStyles from "../../App.module.css";

const ProfileEditForm = () => {
    const currentUser = useCurrentUser();
    const setCurrentUser = useSetCurrentUser();
    const { id } = useParams();
    const history = useHistory();
    const imageFile = useRef();

    const [profileData, setProfileData] = useState({
        name: "",
        content: "",
        image: "",
    });
    const { name, content, image } = profileData;

    const [errors, setErrors] = useState({});

    useEffect(() => {
        const handleMount = async () => {
            if (currentUser?.profile_id?.toString() === id) {
                try {
                    const { data } = await axiosReq.get(`/profiles/${id}/`);
                    const { name, content, image } = data;
                    setProfileData({ name, content, image });
                } catch (err) {
                    console.log(err);
                    history.push("/");
                }
            } else {
                history.push("/");
            }
        };

        handleMount();
    }, [currentUser, history, id]);

    const handleChange = (event) => {
        setProfileData({
            ...profileData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("name", name);
        formData.append("content", content);

        if (imageFile?.current?.files[0]) {
            formData.append("image", imageFile?.current?.files[0]);
        }

        try {
            const { data } = await axiosReq.put(`/profiles/${id}/`, formData);
            setCurrentUser((currentUser) => ({
                ...currentUser,
                profile_image: data.image,
            }));
            history.goBack();
        } catch (err) {
            console.log(err);
            setErrors(err.response?.data);
        }
    };

    const textFields = (
        <>
            <Form.Group>
                <Form.Label>Bio</Form.Label>
                <Form.Control
                    as="textarea"
                    value={content}
                    onChange={handleChange}
                    name="content"
                    rows={7}
                />
            </Form.Group>

            {errors?.content?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                    {message}
                </Alert>
            ))}
            <motion.button
                onClick={() => history.goBack()}
                whileHover={{ scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 700 }}
                className={styles.BtnPostCancel}
            >
                Cancel
            </motion.button>
            <motion.button
                type="submit"
                whileHover={{ scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 700 }}
                className={styles.BtnPostCreate}
            >
                Save
            </motion.button>
        </>
    );

    return (
        <Form onSubmit={handleSubmit}>
            <Row>
                <Col className="py-2 p-0 p-md-2 text-center" md={7} lg={6}>
                    <Container className={appStyles.Content}>
                        <Form.Group>
                            {image && (
                                <figure>
                                    <Image src={image} fluid />
                                </figure>
                            )}
                            {errors?.image?.map((message, idx) => (
                                <Alert variant="warning" key={idx}>
                                    {message}
                                </Alert>
                            ))}
                            <div>
                                <Form.Label
                                    className={`my-auto ${styles.ChangeImage}`}
                                    htmlFor="image-upload"
                                >
                                    Change the image
                                </Form.Label>
                            </div>
                            <Form.File
                                id="image-upload"
                                className={styles.FileInput}
                                ref={imageFile}
                                accept="image/*"
                                onChange={(e) => {
                                    if (e.target.files.length) {
                                        setProfileData({
                                            ...profileData,
                                            image: URL.createObjectURL(e.target.files[0]),
                                        });
                                    }
                                }}
                            />
                        </Form.Group>
                        <div className="d-md-none">{textFields}</div>
                    </Container>
                </Col>
                <Col md={5} lg={6} className="d-none d-md-block p-0 p-md-2 text-center">
                    <Container className={appStyles.Content}>{textFields}</Container>
                </Col>
            </Row>
        </Form>
    );
};

export default ProfileEditForm;