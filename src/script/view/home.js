import NotesApi from "../data/remote/notes-api.js";

const home = () => {
  const notesForm = document.querySelector(".notes-form");
  const notesListContainer = document.getElementById("notesListContainer");
  const notesList = notesListContainer.querySelector("notes-list");
  const tabButtons = document.querySelectorAll(".tab-btn");

  const loadingIndicator = document.querySelector("loading-indicator");
  
  let currentTab = "active";

  const showLoading = () => {
    loadingIndicator.show();
  };

  const hideLoading = () => {
    loadingIndicator.hide();
  };

  const addNote = async (title, body) => {
    showLoading();
    await NotesApi.addNotes(title, body);
    hideLoading();

    displayNotes();
  };

  const displayNotes = async () => {
    showLoading();

    let responseJson;
    if (currentTab === "active") {
      responseJson = await NotesApi.getNotes();
      notesList.setAttribute("empty-message", "Tidak ada catatan tersimpan. Mulai menulis catatan pertama!");
    } else {
      responseJson = await NotesApi.getArchivedNotes();
      notesList.setAttribute("empty-message", "Tidak ada catatan yang diarsipkan.");
    }
    
    notesList.notes = responseJson;
    hideLoading();
  };

  const archiveNote = async (id) => {
    showLoading();
    await NotesApi.archiveNote(id);
    hideLoading();
    displayNotes();
  };

  const deleteNote = async (id) => {
    showLoading();
    await NotesApi.deleteNote(id);
    hideLoading();

    displayNotes();
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const titleElement = document.querySelector("input-title");
    const bodyElement = document.querySelector("input-detail");

    const titleInput = titleElement.shadowRoot.getElementById("noteTitle");
    const bodyInput = bodyElement.shadowRoot.getElementById("noteBody");

    const title = titleInput.value.trim();
    const body = bodyInput.value.trim();

    if (title && body) {
      addNote(title, body);
      titleInput.value = "";
      bodyInput.value = "";
    }
  };

  notesForm.addEventListener("submit", handleFormSubmit);

  notesList.addEventListener("delete-note", (event) => {
    const noteId = event.detail.id;
    deleteNote(noteId);
  });

  notesList.addEventListener("archive-note", (event) => {
    const noteId = event.detail.id;
    archiveNote(noteId);
  });

  tabButtons.forEach(button => {
    button.addEventListener("click", (event) => {
      const tab = event.target.getAttribute("data-tab");
      
      tabButtons.forEach(btn => btn.classList.remove("active"));
      event.target.classList.add("active");
      
      currentTab = tab;
      displayNotes();
    });
  });

  displayNotes();
};

export default home;
