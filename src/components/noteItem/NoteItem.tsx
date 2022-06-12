import React, {FC} from 'react';
import {Tags} from "../tags/Tags";
import s from './NoteItem.module.scss'
import {EditableSpan} from "./editableSpan/EditableSpan";
import {useDispatch} from "react-redux";
import {deleteNote, updateNote} from "../../redux/reducers/NotesReducer";
import {Button} from "../button/Button";


type NoteItemType = {
    id: string
}
export const NoteItem: FC<NoteItemType> = ({id}) => {
    const dispatch = useDispatch()

    const updateNoteText = (text: string) => {
        dispatch(updateNote(id, text))
    }
    const deleteNoteItem = () => {
        dispatch(deleteNote(id))
    }

    return (
        <div className={s.noteBlock}>
            <Button
                name={'Delete'}
                onClickHandler={deleteNoteItem}
            />
            <EditableSpan
                updateNote={updateNoteText}
                noteId={id}
            />
            <Tags noteId={id}/>
        </div>
    );
};