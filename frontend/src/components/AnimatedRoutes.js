import React from 'react';
import styles from '../App.module.css';
import Container from 'react-bootstrap/Container';
import { Switch, Route, useLocation } from 'react-router-dom';
import Register from '../pages/auth/Register';
import Login from '../pages/auth/Login';
import PostCreateForm from '../pages/posts/PostCreateForm';
import PostPage from '../pages/posts/PostPage';
import PostsPage from '../pages/posts/PostsPage';
import { useCurrentUser } from '../contexts/CurrentUserContext';
import PostEditForm from '../pages/posts/PostEditForm';
import ProfilePage from '../pages/profiles/ProfilePage';
import UsernameForm from "../pages/profiles/UsernameForm";
import UserPasswordForm from "../pages/profiles/UserPasswordForm";
import ProfileEditForm from "../pages/profiles/ProfileEditForm";
import PageNotFound from '../components/PageNotFound';
import ContactForm from '../pages/contact/ContactForm';
import { AnimatePresence } from 'framer-motion/dist/framer-motion';

function AnimatedRoutes() {
    const currentUser = useCurrentUser();
    const profile_id = currentUser?.profile_id || "";
    const location = useLocation();

    return (
        <>
            <AnimatePresence mode='wait'>
                <Container className={styles.MainContent}>
                    <Switch location={location} key={location.pathname}>
                        <Route exact path='/' render={() => <PostsPage message='No results found, try again.' />} />
                        <Route
                            exact
                            path='/feed'
                            render={() => (
                                <PostsPage
                                    message='No results found, follow a user.'
                                    filter={`owner__followed__owner__profile=${profile_id}&`}
                                />
                            )}
                        />
                        <Route
                            exact
                            path='/liked'
                            render={() => (
                                <PostsPage
                                    message='No results found, like a post.'
                                    filter={`likes__owner__profile=${profile_id}&ordering=-likes__created_at&`}
                                />
                            )}
                        />
                        <Route exact path='/login' render={() => <Login />} />
                        <Route exact path='/register' render={() => <Register />} />
                        <Route exact path='/posts/create' render={() => <PostCreateForm />} />
                        <Route exact path='/posts/:id/edit' render={() => <PostEditForm />} />
                        <Route exact path='/posts/:id' render={() => <PostPage />} />
                        <Route exact path='/profiles/:id' render={() => <ProfilePage />} />
                        <Route
                            exact
                            path="/profiles/:id/edit/username"
                            render={() => <UsernameForm />}
                        />
                        <Route
                            exact
                            path="/profiles/:id/edit/password"
                            render={() => <UserPasswordForm />}
                        />
                        <Route
                            exact
                            path="/profiles/:id/edit"
                            render={() => <ProfileEditForm />}
                        />
                        <Route exact path="/contact/" render={() => <ContactForm />} />
                        <Route render={() => <PageNotFound />} />
                    </Switch>
                </Container>
            </AnimatePresence >
        </>
    );
}

export default AnimatedRoutes;