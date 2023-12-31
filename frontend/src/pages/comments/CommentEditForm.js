import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import { axiosRes } from '../../api/axiosDefault';
import { motion } from 'framer-motion/dist/framer-motion';
import styles from "../../styles/CommentForm.module.css";

function CommentEditForm(props) {
    const { id, content, setShowEditForm, setComments } = props;

    const [formContent, setFormContent] = useState(content);

    const handleChange = (event) => {
        setFormContent(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axiosRes.put(`/comments/${id}/`, {
                content: formContent.trim(),
            });
            setComments((prevComments) => ({
                ...prevComments,
                results: prevComments.results.map((comment) => {
                    return comment.id === id
                        ? {
                            ...comment,
                            content: formContent.trim(),
                            updated_at: "now",
                        }
                        : comment;
                }),
            }));
            setShowEditForm(false);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="pr-1">
                <Form.Control
                    className={styles.Form}
                    as="textarea"
                    value={formContent}
                    onChange={handleChange}
                    rows={2}
                />
            </Form.Group>
            <div className="text-right">
                <motion.button
                    whileHover={{ y: -5 }}
                    transition={{ type: 'tween', stiffness: 700 }}
                    className={styles.Button}
                    onClick={() => setShowEditForm(false)}
                    type="button"
                >
                    Cancel
                </motion.button>
                <motion.button
                    whileHover={{ y: -5 }}
                    transition={{ type: 'tween', stiffness: 700 }}
                    className={styles.Button}
                    disabled={!content.trim()}
                    type="submit"
                >
                    Save
                </motion.button>
            </div>
        </Form>
    );
}

export default CommentEditForm;