import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Post from "./Post";
import Asset from "../../components/Asset";
import appStyles from "../../App.module.css";
import styles from "../../styles/PostsPage.module.css";
import { useLocation } from "react-router";
import { axiosReq } from '../../api/axiosDefault';
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import PopularProfiles from '../profiles/PopularProfiles';
import { motion } from 'framer-motion/dist/framer-motion';

function PostsPage({ message, filter = "" }) {
    const [posts, setPosts] = useState({ results: [] });
    const [hasLoaded, setHasLoaded] = useState(false);
    const { pathname } = useLocation();

    const [query, setQuery] = useState("");

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const { data } = await axiosReq.get(`/posts/?${filter}search=${query}`);
                setPosts(data);
                setHasLoaded(true);
            } catch (err) {
                console.log(err);
            }
        };

        setHasLoaded(false);
        const countdown = setTimeout(() => {
            fetchPosts();
        }, 200);

        return () => {
            clearTimeout(countdown);
        };
    }, [filter, query, pathname]);

    return (
        <>
            <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%', duration: 0.8, ease: [0.4, 1, 0.5, 1] }}
                exit={{ x: window.innerWidth, transition: { duration: 0.75, ease: [0.4, 1, 0.5, 1] } }}
            >
                <Container fluid>
                    <Row noGutters className="h-100">
                        <Col className='py-2 p-0 p-lg-2' lg={8} md={12} sm={12}>
                            <PopularProfiles mobile />
                            <div className={styles.SearchContainer}>
                                <Form
                                    className={styles.SearchBar}
                                    onSubmit={(event) => event.preventDefault()}
                                >
                                    <Form.Control
                                        value={query}
                                        onChange={(event) => setQuery(event.target.value)}
                                        type="text"
                                        className="mr-sm-2"
                                        placeholder="Search"
                                    />
                                </Form>
                            </div>

                            {hasLoaded ? (
                                <>
                                    {posts.results.length ? (
                                        <InfiniteScroll
                                            children={posts.results.map((post) => (
                                                <Post key={post.id} {...post} setPosts={setPosts} />
                                            ))}
                                            dataLength={posts.results.length}
                                            loader={<Asset spinner />}
                                            hasMore={!!posts.next}
                                            next={() => fetchMoreData(posts, setPosts)}
                                        />
                                    ) : (
                                        <Container className={appStyles.Content}>
                                            <Asset message={message} />
                                        </Container>
                                    )}
                                </>
                            ) : (
                                <Container className={appStyles.Content}>
                                    <Asset spinner />
                                </Container>
                            )}
                        </Col>
                        <Col lg={4} className='d-none d-lg-block p-0 p-lg-2'>
                            <PopularProfiles />
                        </Col>
                    </Row>
                </Container>
            </motion.div>
        </>
    );
}

export default PostsPage;