import React, {FC} from 'react';
import s from './Tags.module.scss'
import {useDispatch} from "react-redux";
import {addNewTag, deleteTag, TagsType} from "../../redux/reducers/NotesReducer";
import deleteicon from '../../assets/deleteicon.png'
import {AddTagForm} from "./addTagForm/AddTagForm";

type TagsPropsType = {
    tags: TagsType[]
    noteId: string
}
export const Tags: FC<TagsPropsType> = ({tags, noteId}) => {
    const dispatch = useDispatch()

    const onClickDeleteTag = (tagId: string) => {
        dispatch(deleteTag(noteId, tagId))
    }

    const addTag = (text: string) => {
        // dispatch(addNewTag(noteId, text))
    }

    return (
        <ul className={s.tagsBlock}>
            {tags && tags.map(tag => {
                return <div key={tag.id} className={s.tagItem} >
                    <li className={s.title}>{tag.title}</li>
                    <div onClick={() => onClickDeleteTag(tag.id)} className={s.button}>
                        <img src={deleteicon} alt={'Delete'} className={s.icon}/>
                    </div>
                </div>
            })}
            <AddTagForm addTag={addTag}/>
        </ul>
    );
};
