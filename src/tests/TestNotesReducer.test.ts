import {
    addNewNote,
    addNewTag,
    deleteNote,
    deleteTag,
    notesReducer,
    NoteType,
    updateNote
} from "../redux/reducers/NotesReducer";

test('correct note should be added to correct array', () => {
    const startState: NoteType[] = [
        {
            "id": "1",
            "text": "Lorem #Ipsum is simply dummy text of the printing and typesetting #industry.",
            "tags": [
                {
                    "id": "151",
                    "title": "#Ipsum"
                },
                {
                    "id": "868",
                    "title": "#book"
                },
                {
                    "id": "4512",
                    "title": "#react"
                }
            ]
        },
    ]

    const action = addNewNote('text test text', ['#react', '#redux', '#test'])

    const endState = notesReducer(startState, action)

    expect(endState.length).toBe(2)
    expect(endState[0].text).toBe('text test text')
    // @ts-ignore
    expect(endState[0].tags[1].title).toBe('#redux')
})

test('correct note should be updated to correct array', () => {
    const startState: NoteType[] = [
        {
            "id": "1",
            "text": "Lorem #Ipsum is simply dummy text of the printing and typesetting #industry.",
            "tags": [
                {
                    "id": "151",
                    "title": "#Ipsum"
                },
                {
                    "id": "868",
                    "title": "#book"
                },
                {
                    "id": "4512",
                    "title": "#react"
                }
            ]
        },
    ]

    const action = updateNote('1', 'Check of correct updating note')

    const endState = notesReducer(startState, action)

    expect(endState.length).toBe(1)
    expect(endState[0].text).toBe('Check of correct updating note')
    expect(endState[0].id).toBe('1')
})

test('correct note should be deleted to correct array', () => {
    const startState: NoteType[] = [
        {
            "id": "1",
            "text": "Lorem #Ipsum is simply dummy text of the printing and typesetting #industry.",
            "tags": [
                {
                    "id": "151",
                    "title": "#Ipsum"
                },
                {
                    "id": "868",
                    "title": "#book"
                },
                {
                    "id": "4512",
                    "title": "#react"
                }
            ]
        },
        {
            "id": "2",
            "text": "Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem #Ipsum has been the industry's #standard dummy text ever since the 1500s, ",
            "tags": [
                {
                    "id": "878",
                    "title": "#Ipsum"
                },
                {
                    "id": "123",
                    "title": "#standard"
                },
                {
                    "id": "855",
                    "title": "#Redux"
                }
            ]
        }
    ]

    const action = deleteNote('1')

    const endState = notesReducer(startState, action)

    expect(endState.length).toBe(1)
    expect(endState[0].text).toBe('Lorem Ipsum is simply dummy text of the printing and ' +
        'typesetting industry.Lorem #Ipsum has been ' +
        'the industry\'s #standard dummy text ever since the 1500s, ')
    expect(endState[0].tags?.length).toBe(3)
})

test('correct note should add new tag to correct array', () => {
    const startState: NoteType[] = [
        {
            "id": "1",
            "text": "Lorem #Ipsum is simply dummy text of the printing and typesetting #industry.",
            "tags": [
                {
                    "id": "151",
                    "title": "#Ipsum"
                },
                {
                    "id": "868",
                    "title": "#book"
                },
                {
                    "id": "4512",
                    "title": "#react"
                }
            ]
        },
        {
            "id": "2",
            "text": "Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem #Ipsum has been the industry's #standard dummy text ever since the 1500s, ",
            "tags": [
                {
                    "id": "878",
                    "title": "#Ipsum"
                },
                {
                    "id": "123",
                    "title": "#standard"
                },
                {
                    "id": "855",
                    "title": "#Redux"
                }
            ]
        }
    ]

    const action = addNewTag('1', '#like')

    const endState = notesReducer(startState, action)

    expect(endState.length).toBe(2)
    expect(endState[0].tags?.length).toBe(4)
    expect(endState[1].tags?.length).toBe(3)
    // @ts-ignore
    expect(endState[0].tags[3].title).toBe('#like')
})

test('correct note should delete correct tag in correct array', () => {
    const startState: NoteType[] = [
        {
            "id": "1",
            "text": "Lorem #Ipsum is simply dummy text of the printing and typesetting #industry.",
            "tags": [
                {
                    "id": "151",
                    "title": "#Ipsum"
                },
                {
                    "id": "868",
                    "title": "#book"
                },
                {
                    "id": "4512",
                    "title": "#react"
                }
            ]
        },
        {
            "id": "2",
            "text": "Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem #Ipsum has been the industry's #standard dummy text ever since the 1500s, ",
            "tags": [
                {
                    "id": "878",
                    "title": "#Ipsum"
                },
                {
                    "id": "123",
                    "title": "#standard"
                },
                {
                    "id": "855",
                    "title": "#Redux"
                }
            ]
        }
    ]

    const action = deleteTag('1', '868')

    const endState = notesReducer(startState, action)

    expect(endState.length).toBe(2)
    expect(endState[0].tags?.length).toBe(2)
    expect(endState[1].tags?.length).toBe(3)
    // @ts-ignore
    expect(endState[0].tags[1].title).toBe('#react')
})