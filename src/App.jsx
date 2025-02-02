import Header from './components/header/Header';
import * as React from 'react';
import './styles/index.scss';
import LoginPage from './pages/login/LoginPage';
import Footer from './components/footer/Footer';

function App() {
    return (
        <div className='app-wrapper'>
            <Header />
            <LoginPage />
            {/* <Footer /> */}
        </div>
    );
}

export default App;
