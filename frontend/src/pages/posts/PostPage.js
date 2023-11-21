import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styles from '../../styles/PostPage.module.css';
import { useParams } from 'react-router';
import { axiosReq } from '../../api/axiosDefault';
import PostContent from './PostContent';
import { useCurrentUser, useSetCurrentUser } from '../../contexts/CurrentUserContext';

function PostPage() {
    const { id } = useParams();
    const [post, setPost] = useState({ results: [] });

    const currentUser = useCurrentUser();
    console.log('CURRENT USER: ', currentUser);
    const setCurrentUser = useSetCurrentUser();

    useEffect(() => {
        const handleMount = async () => {
            try {
                const [{ data: post }] = await Promise.all([
                    axiosReq.get(`/posts/${id}`),
                ]);
                setPost({ results: [post] });
                console.log(post);
            } catch (err) {
                console.log(err);
            }
        };
        handleMount();
    }, [id]);

    return (
        < Row className='h-100' >
            <Col lg={3} className='d-none d-lg-block p-0 p-lg-2'>
                <p>Popular communities</p>
            </Col>
            <Col className='py-2 p-0 p-lg-2' lg={6}>
                <p>Popular profiles for mobile</p>
                <PostContent {...post.results[0]} setPosts={setPost} postPage />
                <Container className={styles.Content}>
                    Comments
                </Container>
            </Col>
            <Col lg={3} className='d-none d-lg-block p-0 p-lg-2'>
                <p>Popular profiles for desktop</p> <br />
            </Col>
        </Row >
    );
}

export default PostPage;