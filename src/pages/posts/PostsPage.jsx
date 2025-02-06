import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './index.scss';
import Filter from '../../components/filter/Filter';
import Post from '../../components/post/Post';

import { getPosts } from '../../api/post/post';
import { ErrorToast } from '../../utils/notifications';
import { setPagination } from '../../store/actions/pagination';
import { getQueryString } from '../../utils/converter';

const PostsPage = () => {
    const dispatch = useDispatch();
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

    useEffect(() => {
        setPosts([]);
        setCurrentPage(1);
        (async () => {
            const query = getQueryString(filters);
            const result = await getPosts(query);
            if (result.ok) {
                let data = await result.json();
                setCurrentPage((prev) => prev + 1);
                setPosts(data.posts);
                dispatch(setPagination(data.pagination));
            } else {
                ErrorToast('Oops...');
            }
        })();
    }, [filters]);

    useEffect(() => {
        if (isLoading) {
            (async () => {
                const query = getQueryString(filters, currentPage);
                const result = await getPosts(query);
                if (result.ok) {
                    let data = await result.json();
                    setCurrentPage((prev) => prev + 1);
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
    console.log(posts);
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
            </section>
        </>
    );
};

export default PostsPage;
