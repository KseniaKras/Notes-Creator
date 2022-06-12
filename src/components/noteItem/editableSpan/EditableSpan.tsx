import React, {ChangeEvent, KeyboardEvent, FC, useState} from 'react';
import s from './EditableSpan.module.scss'
import {addNewTag, TagsType} from "../../../redux/reducers/NotesReducer";
import {AddTagHelper} from "../../../utils/AddTagHelper";
import {useDispatch} from "react-redux";


type EditableSpanType = {
    text: string
    updateNote: (text: string) => void
    tags: TagsType[]
    noteId: string
}
export const EditableSpan: FC<EditableSpanType> = ({text, updateNote, tags, noteId}) => {
    const dispatch = useDispatch()
    const [editMode, setEditMode] = useState<boolean>(false)
    let [title, setTitle] = useState(text)

    const onChangeUpdateNote = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setTitle(e.currentTarget.value)
    }

    const updateNoteTitle = () => {
        updateNote(title)
        setEditMode(false)
        let value = AddTagHelper(title.split(' '))
        console.log('valueTag: ', value)
        let s = value.reduce((acc,el) => {
            let filteredTags = tags.filter(t => t.title === el)
            if (filteredTags.length === 0) {
                dispatch(addNewTag(noteId, el))
            }
            console.log('filteredTags: ', filteredTags)
            return acc
        },[])
        console.log('s:  ', s)
        // for (let i = 0; i < tags.length; i++){
        //     debugger
        //     tags[i].title !== value.find(v => v === tags[i].title) ?
        //     array = value.filter(v => v !== tags[i].title.slice(1))
        // }
    }

    const onKeyPressUpdateNote = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter') {
            updateNoteTitle()
        } else if (e.key === ' ') {
            // let value = AddTagHelper(title.split(' '))
            // console.log(value.pop.toString())
            // dispatch(addNewTag(noteId, value.pop.toString()))
        }
    }

    const finalClassName = s.textarea

    if (tags) {
        let array = title.split(' ')
        for (let i = 0; i < array.length; i++) {
            if (array[i].charAt(0) === '#') {
            }
        }
    }

    return (
        <div className={s.editableSpanBlock}>
            {
                editMode
                    ? <>
                    <textarea
                        autoFocus
                        value={title}
                        onChange={onChangeUpdateNote}
                        onBlur={updateNoteTitle}
                        onKeyPress={onKeyPressUpdateNote}
                        className={finalClassName}
                    />
                        <button
                            style={{display: 'block', width: '100%'}}
                            onClick={updateNoteTitle}>
                            Update
                        </button>
                    </>
                    : <>
                    <span
                        className={s.text}>
                        {title.split(' ').map((word, i) => {
                            return <span key={i}>
                                {
                                    word.charAt(0) === '#' ||
                                    tags.some(t => t.title.slice(1).toLowerCase() === word.toLowerCase())
                                        ? <span style={{backgroundColor: 'blue', margin: '3px'}}>{word}</span>
                                        : <span style={{margin: '3px'}}>{word}</span>
                                }
                            </span>

                        })}
                </span>
                        <button
                            style={{display: 'block', width: '100%'}}
                            onClick={() => setEditMode(true)}>
                            Edit
                        </button>
                    </>
            }
        </div>
    );
};