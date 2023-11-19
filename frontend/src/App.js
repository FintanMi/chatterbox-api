import NavBar from './components/NavBar';
import styles from './App.module.css';
import { Container } from 'react-bootstrap';
import { Switch, Route } from 'react-router-dom';
import './api/axiosDefault';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import Post from './pages/posts/Post';

function App() {

    return (
        <div className={styles.App}>
            <NavBar />
            <Container className={styles.MainContent}>
                <Switch>
                    <Route exact path='/' render={() => <p>home</p>} />
                    <Route exact path='/login' render={() => <Login />} />
                    <Route exact path='/register' render={() => <Register />} />
                    <Route exact path='/posts/create' render={() => <Post />} />
                    <Route render={() => <p>Page not found</p>} />
                </Switch>
            </Container>
        </div>
    );
}

export default App;