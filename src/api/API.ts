import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost3001/',
    headers: {
        'Content-Type': 'application/json; charset=utf-8'
    }
})

export const notesAPI = {
    getNotes(){
        return instance.get('notes')
    }
}

type GetNotesResponseType = {
    // notes: Note[]
}