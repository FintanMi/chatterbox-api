import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styles from '../../styles/PostPage.module.css';
import { useParams } from 'react-router';
import { axiosReq } from '../../api/axiosDefault';
import PostContent from './PostContent';

function PostPage() {
    const { id } = useParams();
    const [post, setPost] = useState({ results: [] });

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
            <Col className='py-2 p-0 p-lg-2' lg={8}>
                <p>Popular profiles for mobile</p>
                <PostContent {...post.results[0]} setPosts={setPost} postPage />
                <Container className={styles.Content}>
                    Comments
                </Container>
            </Col>
            <Col lg={4} className='d-none d-lg-block p-0 p-lg-2'>
                <p>Popular profiles for desktop</p> <br />
                <p>Popular communities</p>
            </Col>
        </Row >
    );
}

export default PostPage;