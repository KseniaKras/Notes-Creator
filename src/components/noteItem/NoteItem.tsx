import React, {FC} from 'react';
import {Tags} from "../tags/Tags";
import s from './NoteItem.module.scss'
import {EditableSpan} from "./editableSpan/EditableSpan";
import {useDispatch} from "react-redux";
import {deleteNote, TagsType, updateNote} from "../../redux/reducers/NotesReducer";

type NoteItemType = {
    text: string
    tags: TagsType[]
    id: string
}
export const NoteItem: FC<NoteItemType> = ({text, tags, id}) => {
    const dispatch = useDispatch()

    const updateNoteText = (text: string) => {
        dispatch(updateNote(id, text))
    }
    const deleteNoteItem = () => {
        dispatch(deleteNote(id))
    }

    return (
        <div className={s.noteBlock}>
            <div className={s.buttonsBlock}>
                <button onClick={deleteNoteItem}>
                    Delete
                </button>
            </div>

            <EditableSpan
                text={text}
                updateNote={updateNoteText}
                tags={tags}
                noteId={id}
            />
            <Tags
                tags={tags}
                noteId={id}
            />
        </div>

    );
};

