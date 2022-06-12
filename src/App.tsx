import React from 'react';
import './App.scss';
import {Notes} from "./components/notes/Notes";
import {AddNoteForm} from "./components/addNoteForm/AddNoteForm";


function App() {

    return (
        <div className="App">
            <AddNoteForm/>
            <Notes/>
        </div>
    );
}

export default App;
