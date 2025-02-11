import Header from './components/header/Header';
import * as React from 'react';
import './styles/index.scss';
import { BrowserRouter, Routes, Route } from 'react-router';
import LoginPage from './pages/login/LoginPage';
import RegisterPage from './pages/register/RegisterPage';
import ProfilePage from './pages/profile/ProfilePage';
import PostsPage from './pages/posts/PostsPage';
import PostPageCreate from './pages/posts/PostPageCreate';

function App() {
    return (
        <div className='app-wrapper'>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path={'/login'} element={<LoginPage />} />
                    <Route path={'/registration'} element={<RegisterPage />} />
                    <Route path={'/profile'} element={<ProfilePage />} />
                    <Route path={'/'} element={<PostsPage />} />
                    <Route path={'/post/create'} element={<PostPageCreate />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
