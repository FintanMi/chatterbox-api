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
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from '../../utils/utils';

function Home({ message, filter = '' }) {
    const [content, setContent] = useState({ results: [] });
    const [loaded, setLoaded] = useState(false);
    const { pathname } = useLocation();

    const [searchFor, setSearchFor] = useState('');

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const { data } = await axiosReq.get(`/posts/?${filter}search=${searchFor}`);
                setContent(data);
                setLoaded(true);
            } catch (err) {
                console.log(err);
            }
        };
        setLoaded(false);
        const timer = setTimeout(() => {
            fetchContent();
        }, 500);
        return () => {
            clearTimeout(timer);
        };
    }, [filter, searchFor, pathname]);

    return (
        <Row className="h-100">
            <Col md={3} className="d-none d-lg-block p-0 p-lg-2">
                <p>Popular communities</p>
            </Col>
            <Col className="py-2 p-0 p-lg-2" lg={6}>
                <p>Popular profiles mobile</p>
                <i className={`fas fa-search ${styles.SearchIcon}`} />
                <Form className={styles.Searchbar} onSubmit={(e) => e.preventDefault()}>
                    <Form.Control
                        value={searchFor}
                        onChange={(e) => setSearchFor(e.target.value)}
                        type='text'
                        placeholder='Search'
                        className='mr-sm-2'
                    >
                    </Form.Control>
                </Form>
                {loaded ? (
                    <>
                        {content.results.length ? (
                            <InfiniteScroll
                                children={
                                    content.results.map((contents) => (
                                        <PostContent key={contents.id} {...contents} setPosts={setContent} />
                                    ))
                                }
                                dataLength={content.results.length}
                                loader={<Asset spinner />}
                                hasMore={!!content.next}
                                next={() => fetchMoreData(content, setContent)}
                            />
                        ) : (<Container className={appStyles.Content}>
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