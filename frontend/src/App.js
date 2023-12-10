import NavBar from './components/NavBar';
import styles from './App.module.css';
import './api/axiosDefault';
import AnimatedRoutes from './components/AnimatedRoutes';

function App() {



    return (
        <div className={styles.App}>
            <NavBar />

            <AnimatedRoutes />

        </div>
    );
}

export default App;