import Header from './components/header/Header';
import * as React from 'react';
import './styles/index.scss';
import { BrowserRouter, Routes, Route } from 'react-router';
import LoginPage from './pages/login/LoginPage';
import RegisterPage from './pages/register/RegisterPage';

function App() {
    return (
        <div className='app-wrapper'>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path={'/login'} element={<LoginPage />} />
                    <Route path={'/registration'} element={<RegisterPage />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
