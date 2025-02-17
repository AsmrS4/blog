import React, { useState } from 'react';
import { FavoriteBorder, Favorite } from '@mui/icons-material';
import { Checkbox } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';

import './index.scss';
import { addLike, removeLike } from '../../api/post/post';

import { ErrorToast } from '../../utils/notifications';
import { transformDate } from '../../utils/converter';
import CommentsDialog from '../modal/CommentsDialog';

const Post = ({
    id = '',
    createTime = '',
    title = '',
    description = '',
    image = '',
    author = '',
    hasLike = false,
    likes = 0,
    readingTime = 0,
    commentsCount = 0,
    tags = [],
}) => {
    const [isLiked, setLiked] = useState(hasLike);
    const [likesCount, setCount] = useState(likes);
    const [postId, setId] = useState(id);
    const [open, setOpen] = useState(false);
    const handleCommentsClick = () => {
        setOpen(true);
    };
    const handleLikeClick = async () => {
        if (isLiked) {
            const response = await removeLike(id);
            if (response.ok) {
                setCount((prev) => prev - 1);
                setLiked(false);
            }
        }
        if (!isLiked) {
            const resposne = await addLike(id);
            if (resposne.ok) {
                setCount((prev) => prev + 1);
                setLiked(true);
            } else {
                resposne.status === 401 ? ErrorToast('Вы не авторизованы') : ErrorToast(ERROR_500);
            }
        }
    };
    return (
        <>
            <div className='post-container'>
                <div className='post__inner-wrapper'>
                    <div className='post__post-title'>
                        <div className='post-title__info'>
                            <span>{author}</span>
                            <span>{transformDate(createTime)}</span>
                        </div>
                        <h2 className='post-title__name'>{title}</h2>
                    </div>
                    <div className='post__post-content'>
                        <div className='post__post-image-wrapper'>
                            {image && (
                                <img className='post__post-image' src={image} alt={'Photo'}></img>
                            )}
                        </div>
                        <div className='post__post-description'>{description}</div>
                        <div className='post__post-info'>
                            <div className='post__tags-wrapper'>
                                {tags.map((tag) => {
                                    return `#${tag.name} `;
                                })}
                            </div>
                            <span className='post__post-reading-time'>
                                {`Время чтения: ${Math.max(readingTime, 0)} мин.`}
                            </span>
                        </div>
                    </div>
                    <div className='post__post-footer'>
                        <div className='post__comment-count' onClick={handleCommentsClick}>
                            <ChatIcon
                                sx={{ marginRight: '5px', color: '#336caf', cursor: 'pointer' }}
                            />

                            {Math.max(commentsCount, 0)}
                        </div>
                        <div className='post__like-count'>
                            {likesCount}
                            <Checkbox
                                sx={{ margin: '0px', padding: '5px', cursor: 'pointer' }}
                                icon={<FavoriteBorder />}
                                checkedIcon={<Favorite sx={{ color: 'red' }} />}
                                onClick={handleLikeClick}
                                checked={isLiked}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <CommentsDialog open={open} setOpen={setOpen} postId={postId} />
        </>
    );
};

export default Post;
