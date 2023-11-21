import NavBar from './components/NavBar';
import styles from './App.module.css';
import Container from 'react-bootstrap/Container';
import { Switch, Route } from 'react-router-dom';
import './api/axiosDefault';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import Post from './pages/posts/Post';
import Community from './pages/community/Community';
import PostPage from './pages/posts/PostPage';
import HomePage from './pages/home/Home';
import { useCurrentUser } from './contexts/CurrentUserContext';

function App() {
    const currentUser = useCurrentUser();
    const profile_id = currentUser?.profile_id || "";

    return (
        <div className={styles.App}>
            <NavBar />
            <Container className={styles.MainContent}>
                <Switch>
                    <Route
                        exact
                        path='/'
                        render={() => (
                            <HomePage message='No results found, try again.' />
                        )}
                    />
                    <Route
                        exact
                        path='/feed'
                        render={() => (
                            <HomePage message='No results found, follow a user or adjust your search.'
                                filter={`owner__followed__owner__profile=${profile_id}&`} />
                        )}
                    />
                    <Route
                        exact
                        path='/liked'
                        render={() => (
                            <HomePage message='No results found, like a post or adjust your search.'
                                filter={`likes__owner__profile=${profile_id}&ordering=-likes__created_at&`} />
                        )}
                    />
                    <Route exact path='/login' render={() => <Login />} />
                    <Route exact path='/register' render={() => <Register />} />
                    <Route exact path='/posts/create' render={() => <Post />} />
                    <Route exact path='/posts/:id' render={() => <PostPage />} />
                    <Route exact path='/community/:id' render={() => <Community />} />
                    <Route render={() => <p>Page not found</p>} />
                </Switch>
            </Container>
        </div>
    );
}

export default App;