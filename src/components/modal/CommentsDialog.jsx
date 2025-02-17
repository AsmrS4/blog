import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import List from '@mui/material/List';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TextField, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

import CommentItem from '../comments/CommentItem';
import { fetchConcretePost } from '../../api/post/post';
import { createComment } from '../../api/comment/comment';
import { useInput } from '../../hooks/useInput';
import { ErrorToast, WarningToast } from '../../utils/notifications';
import { ERROR_401, ERROR_500 } from '../../utils/statusCodes';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction='up' ref={ref} {...props} />;
});

export default function CommentsDialog({ open, setOpen, postId }) {
    const [comments, setComments] = React.useState([]);
    const userComment = useInput('', { isEmpty: true });
    const token = localStorage.getItem('token');
    const fetchComments = async () => {
        const result = await fetchConcretePost(postId);
        if (result.ok) {
            const data = await result.json();
            setComments(data.comments);
        } else {
            ErrorToast(ERROR_500);
        }
    };
    React.useEffect(() => {
        fetchComments();
    }, [postId]);
    const handleClose = () => {
        setOpen(false);
    };
    const sendComment = async () => {
        const result = await createComment(postId, {
            content: userComment.value,
            parentId: null,
        });
        if (result.ok) {
            userComment.setValue('');
            await fetchComments();
        } else {
            if (result.status === 401) {
                WarningToast(ERROR_401);
            } else {
                ErrorToast(ERROR_500);
            }
        }
    };

    return (
        <>
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
                sx={{
                    marginTop: '10%',
                    boxSizing: 'border-box',
                }}
            >
                <AppBar sx={{ position: 'relative', top: 0 }}>
                    <Toolbar>
                        <Typography sx={{ ml: 1, flex: 1 }} variant='h6' component='div'>
                            Комментарии
                        </Typography>
                        <IconButton
                            edge='end'
                            color='inherit'
                            onClick={handleClose}
                            aria-label='close'
                        >
                            <CloseIcon />
                        </IconButton>
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
                    {comments.length > 0 ? (
                        <>
                            {comments.map((comment) => {
                                return <CommentItem key={comment.id} {...comment} />;
                            })}
                            {console.log(comments)}
                        </>
                    ) : (
                        <div className='empty_content'>
                            <span>{'Комментариев пока нет'}</span>
                        </div>
                    )}
                </List>
                {token && (
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
                        <TextField
                            sx={{ flex: 1 }}
                            value={userComment.value}
                            onChange={(e) => {
                                userComment.onChange(e);
                            }}
                        />
                        <Button
                            sx={{
                                width: 'auto',
                                height: '100%',
                                borderRadius: '50%',
                                marginLeft: '12px',
                            }}
                            onClick={sendComment}
                            disabled={userComment.isEmpty}
                        >
                            <SendIcon />
                        </Button>
                    </AppBar>
                )}
            </Dialog>
        </>
    );
}
