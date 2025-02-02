import Header from './components/header/Header';
import * as React from 'react';
import './styles/index.scss';

import LoginPage from './pages/login/LoginPage';
import RegisterPage from './pages/register/RegisterPage';

function App() {
    return (
        <div className='app-wrapper'>
            <Header />
            <LoginPage />
            {/* <RegisterPage /> */}
            {/* <Footer /> */}
        </div>
    );
}

export default App;
