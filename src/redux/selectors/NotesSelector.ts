import {AppRootStateType} from "../store";
import {NoteType, TagsType} from "../reducers/NotesReducer";

export const selectNotes = (state: AppRootStateType): NoteType[] => {
    return state.notes
}

export const selectNoteItem = (state: AppRootStateType | any, noteId: string): NoteType=> {
    return state.notes.filter((n: { id: string; }) => n.id === noteId)[0]
}

export const selectNoteText = (state: any, noteId: string): string => {
    return selectNoteItem(state, noteId)?.text
}

export const selectNoteTags = (state: any, noteId: string): TagsType[] => {
    return selectNoteItem(state, noteId)?.tags
}