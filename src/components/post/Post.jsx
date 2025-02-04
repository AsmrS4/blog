import React from 'react';

import './index.scss';

const Post = () => {
    return (
        <>
            <div className='post-container'>
                <div className='post__inner-wrapper'>
                    <div className='post__post-title'>
                        <div className='post-title__info'>
                            <span>Автор</span>
                            <span>12/07/2023</span>
                        </div>
                        <h2 className='post-title__name'>Тестовый пост</h2>
                    </div>
                    <div className='post__post-content'></div>
                </div>
            </div>
        </>
    );
};

export default Post;
