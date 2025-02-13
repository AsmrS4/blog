import * as React from 'react';

import {
    AppBar,
    Box,
    Button,
    Container,
    IconButton,
    Menu,
    MenuItem,
    Toolbar,
    Typography,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router';
import { logoutUser } from '../../api/user/user';

function Header() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [isAuthorized, setIsAuthorized] = React.useState(false);

    const navigate = useNavigate();

    const handleLogout = async () => {
        await logoutUser();
        localStorage.clear();
        navigate('/login');
    };

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleLogin = async () => {
        navigate('/login');
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    React.useEffect(() => {
        let token = localStorage.getItem('token');
        if (token) {
            setIsAuthorized(true);
        }
    }, []);

    return (
        <AppBar position='static'>
            <Container maxWidth='xl'>
                <Toolbar disableGutters>
                    <Typography
                        variant='h6'
                        noWrap
                        component='a'
                        sx={{
                            mr: 6,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.1rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        БЛОГ №123
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size='large'
                            aria-label='account of current user'
                            aria-controls='menu-appbar'
                            aria-haspopup='true'
                            onClick={handleOpenNavMenu}
                            color='inherit'
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id='menu-appbar'
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{ display: { xs: 'block', md: 'none' } }}
                        >
                            <MenuItem
                                onClick={() => {
                                    navigate('/');
                                }}
                            >
                                <Typography sx={{ textAlign: 'center' }}>{'Главная'}</Typography>
                            </MenuItem>
                            <MenuItem
                                onClick={() => {
                                    navigate('/profile');
                                }}
                            >
                                <Typography sx={{ textAlign: 'center' }}>{'Профиль'}</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>

                    <Typography
                        variant='h5'
                        noWrap
                        component='a'
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.1rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        БЛОГ №123
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <Button
                            onClick={() => {
                                navigate('/');
                            }}
                            sx={{ my: 2, fontSize: '14px', color: 'white', display: 'block' }}
                        >
                            {'Главная'}
                        </Button>
                        {isAuthorized && (
                            <Button
                                onClick={() => {
                                    navigate('/profile');
                                }}
                                sx={{ my: 2, fontSize: '14px', color: 'white', display: 'block' }}
                            >
                                {'Профиль'}
                            </Button>
                        )}
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        {isAuthorized && <LogoutIcon />}
                        <Button
                            onClick={isAuthorized ? handleLogout : handleLogin}
                            sx={{ my: 2, fontSize: '14px', color: 'white', display: 'block' }}
                        >
                            {isAuthorized ? 'Выйти' : 'Войти'}
                        </Button>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default Header;
