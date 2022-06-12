import React, {useEffect, useState} from 'react';
import {NoteItem} from "../noteItem/NoteItem";
import s from './Notes.module.scss'
import {useSelector} from "react-redux";
import {selectNotes} from "../../redux/selectors/NotesSelector";
import {SearchForm} from "../searchForm/SearchForm";
import {NoteType} from "../../redux/reducers/NotesReducer";


export const Notes = () => {
    const notes = useSelector(selectNotes)
    const [notesForRender, setNotesForRender] = useState<NoteType[]>(notes)

    useEffect(() => {
        setNotesForRender(notes)
    }, [notes])

    const onSearch = (tag: string) => {
        if (tag === '') {
            setNotesForRender(notes)
        } else {
            let newNotes = notes.filter(note => note.tags
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
                        />
                    })}
            </div>
        </>
    );
};