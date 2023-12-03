import React, { useState } from "react";
import { Link } from "react-router-dom";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { motion } from 'framer-motion/dist/framer-motion';
import styles from "../../styles/CommentForm.module.css";
import Avatar from "../../components/Avatar";
import { axiosRes } from '../../api/axiosDefault';

function CommentCreateForm(props) {
    const { post, setPost, setComments, profileImage, profile_id } = props;
    const [content, setContent] = useState("");
    const [chars, setChars] = useState(150);
    const handleChange = (e) => {
        if (e.target.value.length > 150) return;
        setContent(e.target.value);
        setChars(150 - e.target.value.length);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axiosRes.post("/comments/", {
                content,
                post,
            });
            setComments((prevComments) => ({
                ...prevComments,
                results: [data, ...prevComments.results],
            }));
            setPost((prevPost) => ({
                results: [
                    {
                        ...prevPost.results[0],
                        comments_count: prevPost.results[0].comments_count + 1,
                    },
                ],
            }));
            setContent("");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <motion.div initial={{ width: 0 }} animate={{ width: '100%' }} exit={{ x: window.innerWidth, transition: { duration: 0.1 } }}>
            <Form className="mt-2" onSubmit={handleSubmit}>
                <Form.Group>
                    <InputGroup>
                        <Link to={`/profiles/${profile_id}`}>
                            <Avatar src={profileImage} />
                        </Link>
                        <Form.Control
                            className={styles.Form}
                            placeholder="my comment..."
                            as="textarea"
                            value={content}
                            onChange={handleChange}
                            rows={2}
                        />
                    </InputGroup>
                    <span className={styles.Chars}>{chars} characters remaining</span>
                </Form.Group>
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: 'spring', stiffness: 700 }}
                    className={`${styles.Button} btn d-block ml-auto`}
                    disabled={!content.trim()}
                    type="submit"
                >
                    post
                </motion.button>
            </Form>
        </motion.div>
    );
}

export default CommentCreateForm;