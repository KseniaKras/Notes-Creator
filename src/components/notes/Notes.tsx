import React, {FC, useEffect, useState} from 'react';
import {NoteItem} from "../noteItem/NoteItem";
import s from './Notes.module.scss'
import {useSelector} from "react-redux";
import {selectNotes} from "../../selectors/NotesSelector";
import {SearchForm} from "../searchForm/SearchForm";
import {NoteType} from "../../redux/reducers/NotesReducer";


type NotesType = {}
export const Notes: FC<NotesType> = () => {
    const notes = useSelector(selectNotes)
    const [notesForRender, setNotesForRender] = useState<NoteType[]>(notes)

    useEffect(() => {
        setNotesForRender(notes)
    }, [notes])

    const onSearch = (tag: string) => {
        if (tag === '') {
            setNotesForRender(notes)
        } else {
            let newNotes = notes
                .filter(note => note.tags
                    .some(t => t.title.slice(1).toLowerCase() === tag.toLowerCase()))
            setNotesForRender(newNotes)
        }
    }

    return (
        <>
            <SearchForm onSearch={onSearch}/>
            <div className={s.notesBlock}>
                {notesForRender &&
                    notesForRender.map(note => {
                        return <NoteItem
                            key={note.id}
                            id={note.id}
                            text={note.text}
                            tags={note.tags}
                        />
                    })}
            </div>
        </>
    );
};