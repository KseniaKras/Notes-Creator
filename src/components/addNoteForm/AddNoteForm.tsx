import React, {KeyboardEvent, useState, ChangeEvent} from 'react';
import s from './AddNoteForm.module.scss'
import {AddTagHelper} from "../../utils/AddTagHelper";
import {useDispatch} from "react-redux";
import {addNewNote} from "../../redux/reducers/NotesReducer";


export const AddNoteForm = () => {
    const dispatch = useDispatch()
    const [note, setNote] = useState('')
    const [tags, setTags] = useState<string[]>([])

    const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let value = e.currentTarget.value.split(/(#[a-z\d-]+)/ig);
        setTags(AddTagHelper(value))
        setNote(e.currentTarget.value)
    }

    const addNoteHandler = () => {
        if (note.trim() !== '') {
            dispatch(addNewNote(note, tags))
            setNote('')
            setTags([])
        }
    }
    const onKeyPressAddNote = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter') {
            addNoteHandler()
        }
    }

    return (
        <div className={s.addItemForm}>
            <textarea
                value={note}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressAddNote}
                className={s.textarea}
                placeholder={'Enter new note'}
            />
            <button
                onClick={addNoteHandler}
                className={s.button}
            >
                Add Note
            </button>
        </div>
    );
};