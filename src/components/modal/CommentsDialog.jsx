import * as React from 'react';
import Dialog from '@mui/material/Dialog';

import List from '@mui/material/List';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import CommentItem from '../comments/CommentItem';
import { fetchConcretePost } from '../../api/post/post';
import { TextField, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction='up' ref={ref} {...props} />;
});

export default function CommentsDialog({ open, setOpen, postId }) {
    const [comments, setComments] = React.useState([]);
    React.useEffect(() => {
        (async () => {
            const result = await fetchConcretePost(postId);
            if (result.ok) {
                const data = await result.json();
                setComments(data.comments);
            } else {
                console.log('error');
            }
        })();
    }, [postId]);
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
                sx={{
                    boxSizing: 'border-box',
                }}
            >
                <AppBar sx={{ position: 'relative', top: 0 }}>
                    <Toolbar>
                        <IconButton
                            edge='start'
                            color='inherit'
                            onClick={handleClose}
                            aria-label='close'
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant='h6' component='div'>
                            Комментарии к посту
                        </Typography>
                    </Toolbar>
                </AppBar>
                <List
                    sx={{
                        flex: 1,
                        overflowY: 'scroll',
                        scrollbarWidth: 'none',
                        '&::-webkit-scrollbar': { width: 0, background: ' transparent' },
                    }}
                >
                    {comments.map((comment) => {
                        return <CommentItem key={comment.id} {...comment} />;
                    })}
                    {console.log(comments)}
                </List>
                <AppBar
                    sx={{
                        position: 'relative',
                        bottom: 0,
                        height: 'auto',
                        backgroundColor: 'inherit',
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '8px',
                        boxSizing: 'border-box',
                    }}
                >
                    <TextField sx={{ flex: 1 }} />
                    <Button
                        sx={{
                            width: 'auto',
                            height: '100%',
                            borderRadius: '50%',
                            marginLeft: '12px',
                        }}
                    >
                        <SendIcon />
                    </Button>
                </AppBar>
            </Dialog>
        </>
    );
}
