import NotesApi from "../data/remote/notes-api.js";

const home = () => {
    const notesForm = document.querySelector('.notes-form');
    const notesListContainer = document.getElementById('notesListContainer');
    const notesList = notesListContainer.querySelector('notes-list');

    const addNote = ({title, body}) => {
        NotesApi.addNotes({title, body})
        .then((response) => {
            const responseJson = response.json;
        })
        .then((responseJson) => {
            notesList.notes = responseJson;
            console.log('Catatan berhasil ditambahkan:', responseJson);
        })
        .catch((error) => {
            console.error('Gagal menambahkan catatan:', error.message);
        });
        
        displayNotes();
    };

    const displayNotes = () => {
        NotesApi.getNotes()
        .then((response) => {
            const responseJson = response.json;
        })    
        .then((responseJson) => {
            notesList.notes = responseJson;
        })
        .catch((error) => {
            console.error('Gagal memuat catatan:', error.message);
        });
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        
        const titleElement = document.querySelector('input-title');
        const bodyElement = document.querySelector('input-detail');
        
        const titleInput = titleElement.shadowRoot.getElementById('noteTitle');
        const bodyInput = bodyElement.shadowRoot.getElementById('noteBody');
        
        const title = titleInput.value.trim();
        const body = bodyInput.value.trim();
        
        if (title && body) {
            addNote({ title, body });
            titleInput.value = '';
            bodyInput.value = '';
        }
    };

    notesForm.addEventListener('submit', handleFormSubmit);
    displayNotes();
};

export default home;
