import React, {ChangeEvent, KeyboardEvent, FC, useState} from 'react';
import s from './EditableSpan.module.scss'
import {addNewTag} from "../../../redux/reducers/NotesReducer";
import {AddTagHelper} from "../../../utils/AddTagHelper";
import {useDispatch, useSelector} from "react-redux";
import {selectNoteTags, selectNoteText} from "../../../redux/selectors/NotesSelector";
import {Button} from "../../button/Button";


type EditableSpanType = {
    updateNote: (text: string) => void
    noteId: string
}
export const EditableSpan: FC<EditableSpanType> = ({updateNote, noteId}) => {
    const dispatch = useDispatch()

    const text = useSelector(state => selectNoteText(state, noteId))
    const tags = useSelector(state => selectNoteTags(state, noteId))

    const [editMode, setEditMode] = useState<boolean>(false)
    let [title, setTitle] = useState(text)

    const onChangeUpdateNote = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setTitle(e.currentTarget.value)
    }

    const updateNoteTitle = () => {
        updateNote(title)
        setEditMode(false)
        let valueTags = AddTagHelper(title.split(' '))
        console.log('valueTag: ', valueTags)
        valueTags.reduce((acc, el) => {
            let filteredTags = tags.filter(t => t.title === el)
            if (filteredTags.length === 0) {
                dispatch(addNewTag(noteId, el))
            }
            console.log('filteredTags: ', filteredTags)
            return acc
        }, [])
    }

    const onKeyPressUpdateNote = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter') {
            updateNoteTitle()
        }
    }

    const contentElements = title && title.split(' ').map((word, i) => {
        return <span key={i}>
            {
                tags && tags.some(t => t.title.slice(1).toLowerCase() === word.toLowerCase()
                    || tags.some(t => t.title.toLowerCase() === word.toLowerCase()))
                    ? <span className={s.hoverWord}>{word}</span>
                    : <span className={s.word}>{word}</span>
            }
           </span>
    })

    return (
        <div className={s.editableSpanBlock}>
            {
                editMode
                    ? <>
                        <textarea
                            autoFocus
                            value={title}
                            onChange={onChangeUpdateNote}
                            onBlur={() => setEditMode(false)}
                            onKeyPress={onKeyPressUpdateNote}
                            className={s.textarea}
                        />
                        <Button
                            name={'Update'}
                            onClickHandler={updateNoteTitle}
                        />
                    </>
                    : <>
                        <div className={s.text}>
                            <span className={s.content}>
                                {contentElements}
                             </span>
                        </div>
                        <Button
                            name={'Edit'}
                            onClickHandler={() => setEditMode(true)}
                        />
                    </>
            }
        </div>
    );
};