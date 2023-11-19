import React, { useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Upload from "../../assets/upload.png";
import styles from "../../styles/Post.module.css";
import appStyles from "../../App.module.css";
import Asset from '../../components/Asset';
import { Image } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { axiosReq } from '../../api/axiosDefault';
import Alert from "react-bootstrap/Alert";

function Post() {

    const [errors, setErrors] = useState({});
    const [postData, setPostData] = useState({
        title: 'title',
        content: 'content',
        image: '',
    });
    const { title, content, image } = postData;
    const imageRef = useRef(null);
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('image', imageRef.current.files[0]);

        try {
            const { data } = await axiosReq.post('/posts/', formData);
            history.push(`/posts/${data.id}`);
        } catch (err) {
            console.log(err);
            if (err.response?.status !== 401) {
                setErrors(err.response?.data);
            }
        }
    };

    const handleChange = (e) => {
        setPostData({
            ...postData,
            [e.target.name]: e.target.value,
        });
    };

    const handleImage = (e) => {
        if (e.target.files.length) {
            URL.revokeObjectURL(image);
            setPostData({
                ...postData,
                image: URL.createObjectURL(e.target.files[0]),
            });
        }
    };

    const textFields = (
        <div className="text-center">
            <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control
                    type='text'
                    name='title'
                    value={title}
                    onChange={handleChange}
                />
            </Form.Group>
            {errors.title?.map((message, idx) => (
                <Alert variant='warning' key={idx}>
                    {message}
                </Alert>
            ))}

            <Form.Group>
                <Form.Label>Content</Form.Label>
                <Form.Control
                    as='textarea'
                    rows={8}
                    name='content'
                    value={content}
                    onChange={handleChange}
                />
            </Form.Group>
            {errors.content?.map((message, idx) => (
                <Alert variant='warning' key={idx}>
                    {message}
                </Alert>
            ))}

            <Button
                className={styles.BtnPostCancel}
                onClick={() => history.goBack()}
            >
                cancel
            </Button>
            <Button
                className={styles.BtnPostCreate}
                type="submit">
                create
            </Button>
        </div>
    );

    return (
        <Form onSubmit={handleSubmit}>
            <Row>
                <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
                    <Container
                        className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
                    >
                        <Form.Group className="text-center">
                            {image ? (
                                <>
                                    <figure>
                                        <Image className={appStyles.Image} src={image} rounded />
                                    </figure>
                                    <div>
                                        <Form.Label
                                            className={styles.BtnPostCancel}
                                            htmlFor='upload-image'>
                                            Change the Image
                                        </Form.Label>
                                    </div>
                                </>
                            ) : (
                                <Form.Label
                                    className="d-flex justify-content-center"
                                    htmlFor="upload-image"
                                >
                                    <Asset src={Upload} message='Click to upload a photo' />
                                </Form.Label>
                            )}
                            <Form.File
                                id='upload-image'
                                accept='image/*'
                                onChange={handleImage}
                                ref={imageRef}
                            />
                        </Form.Group>
                        {errors?.image?.map((message, idx) => (
                            <Alert variant='warning' key={idx}>
                                {message}
                            </Alert>
                        ))}

                        <div className="d-md-none">{textFields}</div>
                    </Container>
                </Col>
                <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2">
                    <Container className={appStyles.Content}>{textFields}</Container>
                </Col>
            </Row>
        </Form>
    );
}

export default Post;