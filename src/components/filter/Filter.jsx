import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import TagSelect from '../select/TagSelect';
import TagSlider from '../slider/TagSlider';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

import './index.scss';

const Filter = () => {
    const [authorName, setName] = useState('');
    const [sorting, setSorting] = useState('');
    const [selectedTags, setSelectedTags] = useState([]);
    const [minReadingValue, setReadingMin] = useState(0);
    const [maxReadingValue, setReadingMax] = useState(100);
    const [tags, setTags] = useState([]);
    const [size, setSize] = useState(5);
    const [page, setPage] = useState(1);

    return (
        <>
            <div className='filter'>
                <div className='filter__inner-wrapper'>
                    <div className='filter__filter-title'>
                        <span>Фильтры</span>
                    </div>
                    <div className='filter__filters'>
                        <div className='row-wrapper'>
                            <TextField
                                label='Поиск по автору'
                                value={authorName}
                                onChange={(e) => {
                                    setName(e.target.value);
                                }}
                                type={'text'}
                                sx={{
                                    width: '100%',
                                    maxWidth: '700px',
                                    marginBottom: '20px',
                                    marginX: '5px',
                                }}
                            />
                            <TagSelect
                                value={selectedTags}
                                setValue={setSelectedTags}
                                tags={tags}
                            />
                        </div>
                        <div className='row-wrapper'>
                            <FormControl
                                sx={{
                                    marginBottom: '20px',
                                    marginX: '5px',
                                    maxWidth: '700px',
                                    width: '100%',
                                }}
                            >
                                <InputLabel id='select-label'>Параметры сортировки</InputLabel>
                                <Select
                                    labelId='select-label'
                                    id='sorting-simple-select'
                                    value={sorting}
                                    label='Параметры сортировки'
                                    onChange={(e) => {
                                        setSorting(e.target.value);
                                    }}
                                >
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                            <TagSlider />
                        </div>
                        <div className='row-wrapper'>
                            <div className='reading-time-wrapper'>
                                <TextField
                                    label='Мин. время'
                                    value={minReadingValue}
                                    onChange={(e) => {
                                        setReadingMin(e.target.value);
                                    }}
                                    type={'number'}
                                    sx={{
                                        boxSizing: 'border-box',
                                        width: '49%',
                                        marginBottom: '10px',
                                    }}
                                />
                                <TextField
                                    label='Макс. время'
                                    value={maxReadingValue}
                                    onChange={(e) => {
                                        setReadingMax(e.target.value);
                                    }}
                                    type={'number'}
                                    sx={{
                                        boxSizing: 'border-box',
                                        width: '49%',
                                        marginBottom: '10px',
                                    }}
                                />
                            </div>
                            <Button
                                className='filter-button'
                                variant='contained'
                                sx={{
                                    boxSizing: 'border-box',
                                    maxWidth: '700px',
                                    width: '100%',
                                    height: '50px',
                                    margin: '5px 5px 20px 5px',
                                }}
                            >
                                {'Применить'}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Filter;
