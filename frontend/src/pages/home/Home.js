import React, { useEffect, useState } from "react";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { useLocation } from 'react-router';
import appStyles from "../../App.module.css";
import styles from "../../styles/Home.module.css";
import { axiosReq } from '../../api/axiosDefault';
import PostContent from '../posts/PostContent';
import Asset from '../../components/Asset';

function Home({ message, filter = '' }) {
    const [content, setContent] = useState({ results: [] });
    const [loaded, setLoaded] = useState(false);
    const { pathname } = useLocation();

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const { data } = await axiosReq.get(`/posts/?${filter}`);
                setContent(data);
                setLoaded(true);
            } catch (err) {
                console.log(err);
            }
        };
        setLoaded(false);
        fetchContent();
    }, [filter, pathname]);

    return (
        <Row className="h-100">
            <Col md={3} className="d-none d-lg-block p-0 p-lg-2">
                <p>Popular communities</p>
            </Col>
            <Col className="py-2 p-0 p-lg-2" lg={6}>
                <p>Popular profiles mobile</p>
                {loaded ? (
                    <>
                        {content.results.length
                            ?
                            content.results.map((contents) => (
                                <PostContent key={contents.id} {...contents} setPosts={setContent} />
                            ))
                            : (<Container className={appStyles.Content}>
                                <Asset message={message} />
                            </Container>)}
                    </>
                ) : (
                    <Container className={appStyles.Content}>
                        <Asset spinner />
                    </Container>
                )}
            </Col>
            <Col md={3} className="d-none d-lg-block p-0 p-lg-2">
                <p>Popular profiles for desktop</p>
            </Col>
        </Row>
    );
}

export default Home;