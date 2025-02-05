import React from 'react';
import { transformDate, transformDateJson } from '../../utils/converter';

import './index.scss';

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
                            <div className='post__post-image'></div>
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
                        <div className='post__comment-count'>{commentsCount}</div>
                        <div className='post__like-count'>{likes}</div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Post;
