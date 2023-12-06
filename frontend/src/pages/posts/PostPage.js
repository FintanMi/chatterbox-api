import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import appStyles from "../../App.module.css";
import { useParams } from "react-router";
import { axiosReq } from '../../api/axiosDefault';
import Post from "./Post";
import CommentCreateForm from "../comments/CommentCreateForm";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Comment from '../comments/Comment';
import InfiniteScroll from 'react-infinite-scroll-component';
import { fetchMoreData } from '../../utils/utils';
import Asset from '../../components/Asset';
import PopularProfiles from "../profiles/PopularProfiles";
import { motion } from 'framer-motion/dist/framer-motion';

function PostPage() {
    const { id } = useParams();
    const [post, setPost] = useState({ results: [] });

    const currentUser = useCurrentUser();
    const profile_image = currentUser?.profile_image;
    const [comments, setComments] = useState({ results: [] });

    useEffect(() => {
        const handleMount = async () => {
            try {
                const [{ data: post }, { data: comments }] = await Promise.all([
                    axiosReq.get(`/posts/${id}`),
                    axiosReq.get(`/comments/?post=${id}`)
                ]);
                setPost({ results: [post] });
                setComments(comments);
            } catch (err) {
                console.log(err);
            }
        };

        handleMount();
    }, [id]);

    return (
        <motion.div
            initial={{ width: '0%' }}
            animate={{ width: '100%', duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
            exit={{ x: window.innerWidth, transition: { duration: 0.1, ease: [0.25, 1, 0.5, 1] } }}
        >
            <Row className="h-100">
                <Col className="py-2 p-0 p-lg-2" lg={10}>
                    <PopularProfiles mobile />
                    <Post {...post.results[0]} setPosts={setPost} postPage />
                    <Container className={appStyles.CommentContainer}>
                        {currentUser ? (
                            <CommentCreateForm
                                profile_id={currentUser.profile_id}
                                profileImage={profile_image}
                                post={id}
                                setPost={setPost}
                                setComments={setComments}
                                className={appStyles.CommentSection}
                            />
                        ) : comments.results.length ? (
                            "Comments"
                        ) : null}
                        {comments.results.length ? (
                            <InfiniteScroll
                                children={
                                    comments.results.map(comment => (
                                        <Comment key={comment.id} {...comment}
                                            setPost={setPost} setComments={setComments}
                                        />
                                    ))
                                }
                                dataLength={comments.results.length}
                                loader={<Asset spinner />}
                                hasMore={!!comments.next}
                                next={() => fetchMoreData(comments, setComments)}
                            />
                        ) : currentUser ? (
                            <span className={appStyles.CommentInfo}>No comments yet, be the first!</span>
                        ) : (
                            <span className={appStyles.CommentInfo}>Still waiting on someone to comment!</span>
                        )}
                    </Container>
                </Col>
            </Row>
        </motion.div>
    );
}

export default PostPage;