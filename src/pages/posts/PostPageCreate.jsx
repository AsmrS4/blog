import { useState, useEffect } from 'react';
import { TextField, Button } from '@mui/material';
import { ToastContainer } from 'react-toastify';

import './index.scss';
import { delay } from '../../utils/delay';
import { useInput } from '../../hooks/useInput';
import TagSelect from '../../components/select/TagSelect';
import { fetchTags } from '../../api/post/tags';
import { createPost } from '../../api/post/post';
import { ErrorToast, SuccessToast, WarningToast } from '../../utils/notifications';
import { ERROR_400, ERROR_401, ERROR_500 } from '../../utils/statusCodes';

const PostPageCreate = () => {
    const title = useInput('', { isEmpty: true });
    const text = useInput('', { isEmpty: true });

    const readingTime = useInput('', { isEmpty: true });
    const [isFormError, setIsError] = useState(true);
    const [imageURL, setImage] = useState('');
    const [tags, setTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        let postTags = [];
        setIsLoading(true);
        await delay(500);
        for (let i = 0; i < selectedTags.length; i++) {
            postTags.push(selectedTags[i].id);
        }

        const result = await createPost({
            title: title.value,
            description: text.value,
            readingTime: readingTime.value,
            tags: postTags,
            image: imageURL ? imageURL : null,
        });

        if (result.ok) {
            SuccessToast('Пост успешно создан');
            title.setValue('');
            text.setValue('');
            readingTime.setValue(0);
            setImage('');
            setSelectedTags([]);
        } else {
            if (result.status === 401) {
                WarningToast(ERROR_401);
            } else if (result.status === 400) {
                ErrorToast(ERROR_400);
            } else {
                ErrorToast(ERROR_500);
            }
        }
        setIsLoading(false);
    };
    useEffect(() => {
        if (title.isEmpty || text.isEmpty || selectedTags.isEmpty || readingTime.isEmpty) {
            setIsError(true);
        } else {
            setIsError(false);
        }
    }, [title.isEmpty, text.isEmpty, selectedTags.isEmpty, readingTime.isEmpty]);

    useEffect(() => {
        (async () => {
            let result = await fetchTags();
            if (result.ok) {
                let data = await result.json();
                setTags(data);
            } else {
                setTags([]);
            }
        })();
    }, []);
    return (
        <>
            <section className='content'>
                <div className='container'>
                    <form className='create-post-form' onSubmit={handleSubmit}>
                        <div className='title-wrapper'>
                            <h1 className='create-post-form__title'>{'Создание поста'}</h1>
                        </div>
                        <div className='inputs-wrapper'>
                            <TextField
                                label='Название поста'
                                value={title.value}
                                onChange={(e) => title.onChange(e)}
                                sx={{ width: '90%', marginBottom: '24px' }}
                                placeholder={'Введите заголовок поста'}
                                required
                            />
                            <TextField
                                label='Ссылка на картинку'
                                value={imageURL}
                                onChange={(e) => setImage(e.target.value)}
                                sx={{ width: '90%', marginBottom: '24px' }}
                                placeholder={'Вставьте URL-адрес'}
                            />

                            <div className='row-wrapper-post'>
                                <TagSelect
                                    marginX='0px'
                                    value={selectedTags}
                                    setValue={setSelectedTags}
                                    tags={tags}
                                />
                                <TextField
                                    label='Время чтения'
                                    value={readingTime.value}
                                    onChange={(e) => readingTime.onChange(e)}
                                    className={'ml-0'}
                                    type={'number'}
                                    sx={{
                                        maxWidth: '200px',
                                        width: '100%',
                                        marginLeft: '20px',
                                        marginBottom: '24px',
                                    }}
                                    required
                                />
                            </div>
                            <TextField
                                label='Текст'
                                multiline
                                sx={{ width: '90%', height: 'auto' }}
                                value={text.value}
                                onChange={(e) => text.onChange(e)}
                                error={text.error}
                                required
                            />
                        </div>
                        <Button
                            variant='contained'
                            sx={{ width: '90%', marginBottom: '10px', height: '48px' }}
                            type={'sumbit'}
                            loading={isLoading}
                            loadingIndicator={'Отправка...'}
                            disabled={isFormError}
                        >
                            {'Создать пост'}
                        </Button>
                    </form>
                </div>
            </section>
            <ToastContainer />
        </>
    );
};

export default PostPageCreate;
