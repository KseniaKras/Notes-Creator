import React, {FC} from 'react';
import s from './Tags.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {addNewTag, deleteTag} from '../../redux/reducers/NotesReducer';
import deleteicon from '../../common/assets/deleteicon.png'
import {AddTagForm} from './addTagForm/AddTagForm';
import {selectNoteTags} from '../../redux/selectors/NotesSelector';

type TagsPropsType = {
    noteId: string
}
export const Tags: FC<TagsPropsType> = ({noteId}) => {

    const dispatch = useDispatch()
    const tags = useSelector(state => selectNoteTags(state, noteId))

    const onClickDeleteTag = (tagId: string) => {
        dispatch(deleteTag(noteId, tagId))
    }

    const addTag = (text: string) => {
        dispatch(addNewTag(noteId, text))
    }

    const tagsElements = tags && tags.map(tag => {
        return <div key={tag.id} className={s.tagItem}>
            <li className={s.title}>
                {tag.title}
            </li>
            <div onClick={() => onClickDeleteTag(tag.id)} className={s.button}>
                <img src={deleteicon} alt={'Delete'} className={s.icon}/>
            </div>
        </div>
    })

    return (
        <ul className={s.tagsBlock}>
            {tagsElements}
            <AddTagForm addTag={addTag}/>
        </ul>
    );
};
