import React, { useState } from 'react';
import Filter from '../../components/filter/Filter';
import Post from '../../components/post/Post';

import './index.scss';

const PostsPage = () => {
    const [posts, setPosts] = useState([]);

    return (
        <>
            <section className='content'>
                <div className='container'>
                    <Filter />
                    <div className='posts-wrapper'>
                        <Post />
                        <Post />
                        <Post />
                    </div>
                    <div className='pagination-wrapper'></div>
                </div>
            </section>
        </>
    );
};

export default PostsPage;
