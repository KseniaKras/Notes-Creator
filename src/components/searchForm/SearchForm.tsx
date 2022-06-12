import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';
import s from './SearchForm.module.scss';

type SearchFormType = {
    onSearch: (tag: string) => void
}
export const SearchForm: FC<SearchFormType> = ({onSearch}) => {
    const [title, setTitle] = useState<string>('')

    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const searchNotes = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onSearch(title)
        }
    }

    return (
        <div className={s.searchBlock}>
            <span>Search by tag: </span>
            <input
                type={'text'}
                value={title}
                onChange={onChangeSetTitle}
                onKeyPress={searchNotes}
                placeholder={'Enter your tag and press "Enter"'}
            />
        </div>
    );
};
