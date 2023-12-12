import NavBar from './components/NavBar';
import styles from './App.module.css';
import './api/axiosDefault';
import AnimatedRoutes from './components/AnimatedRoutes';
import { Toaster } from 'react-hot-toast';

function App() {

    return (
        <div className={styles.App}>
            <NavBar />
            <Toaster toastOptions={{
                position: 'bottom-left'
            }} />
            <AnimatedRoutes />
        </div>
    );
}

export default App;