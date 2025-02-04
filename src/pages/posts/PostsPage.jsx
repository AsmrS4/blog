import React, { useEffect, useState } from 'react';
import Filter from '../../components/filter/Filter';
import Post from '../../components/post/Post';
import { fetchPosts } from '../../api/post/post';
import './index.scss';
import { ErrorToast } from '../../utils/notifications';

const PostsPage = () => {
    const [posts, setPosts] = useState([]);
    const [pagination, setPagination] = useState({});
    useEffect(() => {
        {
            (async () => {
                const result = await fetchPosts();
                if (result.ok) {
                    const data = await result.json();
                    setPosts(data.posts);
                    setPagination(data.pagination);
                } else {
                    ErrorToast('Oops(');
                }
            })();
        }
        console.log(posts);
        console.log(pagination);
    }, []);
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
                </div>
            </section>
        </>
    );
};
//TODO: подумать над динамической пагинацией//

export default PostsPage;
