import {v1} from "uuid";
import Data from '../../data/db.json';

enum NOTES {
    ADD_NEW_NOTE = 'ADD_NEW_NOTE',
    UPDATE_NOTE = 'UPDATE_NOTE',
    DELETE_NOTE = 'DELETE_NOTE',
    ADD_TAG = 'ADD_TAG',
    DELETE_TAG = 'DELETE_TAG',
    // SET_NOTES_BY_TAG = 'SET_NOTES_BY_TAG',
}

export type TagsType = {
    id: string
    title: string
}
export type NoteType = {
    id: string
    text: string
    tags: TagsType[]
}

const initialState: NoteType[] = Data.notes

export const notesReducer = (state = initialState, action: NotesReducerType) => {
    switch (action.type) {
        case NOTES.ADD_NEW_NOTE:
            return [
                {
                    id: v1(),
                    text: action.payload.text,
                    tags: action.payload.tags.map(tag => ({id: v1(), title: tag}))
                },
                ...state
            ]
        case NOTES.UPDATE_NOTE:
            return state.map(note => note.id === action.payload.noteId ? {...note, text: action.payload.text} : note)
        case NOTES.DELETE_NOTE:
            let copyState = state.map(note => note.id === action.payload.noteId ? {...note, tags: null} : note)
            return copyState.filter(note => note.id !== action.payload.noteId)
        case NOTES.ADD_TAG:
            return state.map(note => note.id === action.payload.noteId
                ? {
                    ...note,
                    tags: [
                        ...note.tags,
                        {id: v1(), title: action.payload.tagTitle}
                    ]
                }
                : note)
            // return state.map(note => note.id === action.payload.noteId
            //     ? {
            //         ...note,
            //         tags: action.payload.tags
            //     }
            //     : note)
        case NOTES.DELETE_TAG:
            return state.map(note => note.id === action.payload.noteId
                ? {...note, tags: note.tags.filter(tag => tag.id !== action.payload.tagId)}
                : note)
        // case NOTES.SET_NOTES_BY_TAG:
        //     let stateCopy = [...state]
        //     debugger
        //     if (action.payload.tagTitle === '') {
        //         return [...state]
        //     } else {
        //         return stateCopy.filter(note => note.tags
        //             .some(t => t.title.slice(1).toLowerCase() === action.payload.tagTitle.toLowerCase()))
        //     }
        default:
            return state
    }
}


export const addNewNote = (text: string, tags: string[]) => ({
    type: NOTES.ADD_NEW_NOTE,
    payload: {
        text,
        tags,
    }
} as const)
export const updateNote = (noteId: string, text: string) => ({
    type: NOTES.UPDATE_NOTE,
    payload: {
        noteId,
        text,
    }
} as const)
export const deleteNote = (noteId: string) => ({
    type: NOTES.DELETE_NOTE,
    payload: {
        noteId,
    }
} as const)
export const addNewTag = (noteId: string, tagTitle: string) => ({
    type: NOTES.ADD_TAG,
    payload: {
        noteId,
        tagTitle,
    }
} as const)
// export const addNewTag = (noteId: string, tags: string[]) => ({
//     type: NOTES.ADD_TAG,
//     payload: {
//         noteId,
//         tags,
//     }
// } as const)
export const deleteTag = (noteId: string, tagId: string) => ({
    type: NOTES.DELETE_TAG,
    payload: {
        noteId,
        tagId,
    }
} as const)
// export const setNotesByTag = (tagTitle: string) => ({
//     type: NOTES.SET_NOTES_BY_TAG,
//     payload: {
//         tagTitle,
//     }
// } as const)


type NotesReducerType =
    | ReturnType<typeof addNewNote>
    | ReturnType<typeof updateNote>
    | ReturnType<typeof deleteNote>
    | ReturnType<typeof addNewTag>
    | ReturnType<typeof deleteTag>
// | ReturnType<typeof setNotesByTag>