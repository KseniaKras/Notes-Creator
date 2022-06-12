import {AppRootStateType} from "../redux/store";
import {NoteType} from "../redux/reducers/NotesReducer";

export const selectNotes = (state: AppRootStateType):NoteType[] => {
    return state.notes
}