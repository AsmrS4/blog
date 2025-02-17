import { ListItem, Divider } from '@mui/material';
import React from 'react';
import { transformDateHHMM } from '../../utils/converter';

import './index.scss';
const CommentItem = ({ author, content, createTime }) => {
    return (
        <>
            <ListItem sx={{ width: 1, height: 'auto', minHeight: '80px' }}>
                <div className='comment'>
                    <div className='comment__header'>{author}</div>
                    <div className='comment__content'>
                        {content === '' ? (
                            <div className='deleted'>{`[Комментарий удален]`}</div>
                        ) : (
                            content
                        )}
                    </div>
                    <div className='comment__date'>{transformDateHHMM(createTime)}</div>
                </div>
            </ListItem>
            <Divider />
        </>
    );
};

export default CommentItem;
