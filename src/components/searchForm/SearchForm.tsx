import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';

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
        <div style={{textAlign: 'center'}}>
            <span>Search by tag: </span>
            <input
                type={'text'}
                value={title}
                onChange={onChangeSetTitle}
                onKeyPress={searchNotes}
                placeholder={'Enter your tag'}
                style={{border: '1px solid black', width: '150px', height: '30px', padding: '0 10px'}}
            />
        </div>
    );
};
