import {combineReducers, createStore} from "redux";
import {notesReducer} from "./reducers/NotesReducer";

const rootReducer = combineReducers({
    notes: notesReducer
})

export const store = createStore(rootReducer)
export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch