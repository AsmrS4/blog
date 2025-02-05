import React from 'react';

import ChatIcon from '@mui/icons-material/Chat';
import { transformDate } from '../../utils/converter';
import './index.scss';
import { FavoriteBorder, Favorite } from '@mui/icons-material';
import { Checkbox } from '@mui/material';

const Post = ({
    id = '',
    createTime = '',
    title = '',
    description = '',
    image = '',
    authorId = '',
    author = '',
    hasLike = false,
    likes = 0,
    readingTime = 0,
    commentsCount = 0,
    tags = [],
}) => {
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
                            <div className='post__tags-wrapper'></div>
                            <span className='post__post-reading-time'>
                                {`Время чтения: ${Math.max(readingTime, 0)} мин.`}
                            </span>
                        </div>
                    </div>
                    <div className='post__post-footer'>
                        <div className='post__comment-count'>
                            <ChatIcon sx={{ marginRight: '5px', color: '#336caf' }} />

                            {Math.max(commentsCount, 0)}
                        </div>
                        <div className='post__like-count'>
                            {likes}
                            <Checkbox
                                sx={{ margin: '0px', padding: '5px' }}
                                icon={<FavoriteBorder />}
                                checkedIcon={<Favorite sx={{ color: 'red' }} />}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Post;
