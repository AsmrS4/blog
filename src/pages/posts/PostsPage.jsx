import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Fab } from '@mui/material';
import { Create } from '@mui/icons-material';

import './index.scss';
import Filter from '../../components/filter/Filter';
import Post from '../../components/post/Post';

import { getPosts } from '../../api/post/post';
import { ErrorToast } from '../../utils/notifications';
import { setPagination } from '../../store/actions/pagination';
import { getQueryString } from '../../utils/converter';
import { useNavigate } from 'react-router';

const PostsPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const { pagination } = useSelector((state) => state.pagination);
    const { filters } = useSelector((state) => state.filters);
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(pagination.current);
    const [isLoading, setLoading] = useState(true);

    const handleScroll = (e) => {
        if (
            e.target.documentElement.scrollHeight -
                (e.target.documentElement.scrollTop + window.innerHeight) <
                5 &&
            currentPage < pagination.count
        ) {
            setLoading(true);
        }
    };

    const handleClick = async () => {
        navigate('/post/create');
    };

    useEffect(() => {
        setPosts([]);
        setCurrentPage(1);
        (async () => {
            const query = getQueryString(filters);
            const result = await getPosts(query);
            if (result.ok) {
                let data = await result.json();
                setCurrentPage((prev) => ++prev);
                setPosts(data.posts);
                dispatch(setPagination(data.pagination));
            } else {
                ErrorToast('Oops...');
            }
        })();
        console.log(filters);
    }, [filters]);

    useEffect(() => {
        if (isLoading) {
            (async () => {
                const query = getQueryString(filters, currentPage);
                const result = await getPosts(query);
                if (result.ok) {
                    let data = await result.json();
                    setCurrentPage((prev) => ++prev);
                    setPosts(posts.concat(data.posts));
                    dispatch(setPagination(data.pagination));
                } else {
                    ErrorToast('Oops...');
                }
                setLoading(false);
            })();
        }
    }, [isLoading]);

    useEffect(() => {
        document.addEventListener('scroll', handleScroll);
        return () => {
            document.removeEventListener('scroll', handleScroll);
        };
    }, [currentPage]);

    return (
        <>
            <section className='content'>
                <div className='container'>
                    <Filter />
                    <div className='posts-wrapper'>
                        {posts.map((post) => {
                            return <Post key={post.id} {...post} />;
                        })}
                    </div>
                </div>
                {token && (
                    <div className='create-new-post'>
                        <Fab
                            onClick={handleClick}
                            sx={{ height: '64px', width: '64px' }}
                            color='primary'
                            aria-label='add'
                        >
                            <Create sx={{ width: '24px', height: '24px' }} />
                        </Fab>
                    </div>
                )}
            </section>
        </>
    );
};

export default PostsPage;
