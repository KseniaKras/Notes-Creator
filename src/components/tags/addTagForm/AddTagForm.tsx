import React, {ChangeEvent, KeyboardEvent, FC, useState} from 'react';
import s from './AddTagForm.module.scss';

type AddTagFormType = {
    addTag: (text: string) => void
}
export const AddTagForm: FC<AddTagFormType> = ({addTag}) => {
    const [title, setTitle] = useState<string>('')

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const checkFirstChar = (value: string) => {
        if (value.charAt(0) === '#') {
            addTag(value)
        } else {
            addTag(`#${value}`)
        }
        setTitle('')
    }

    const addNewTag = (e: KeyboardEvent<HTMLInputElement>) => {
        let newTitle = title.trim()
        if (newTitle !== '' && e.key === ' ') {
            checkFirstChar(newTitle)
        } else if (newTitle !== '' && e.key === 'Enter') {
            checkFirstChar(newTitle)
        }
    }

    return (
        <input
            type={'text'}
            value={title}
            onChange={onChangeHandler}
            onKeyPress={addNewTag}
            placeholder={'Enter one or more tag and press "Enter"'}
            className={s.input}
        />
    );
};
