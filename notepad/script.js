function formatDoc(cmd, value) {
    document.execCommand(cmd, false, value);
}

document.addEventListener('DOMContentLoaded', function() {
    displayNotes();
    setUpEventListeners();
});

function saveNote() {
    const title = document.getElementById('noteTitle').value.trim();
    const content = document.getElementById('noteArea').innerHTML.trim(); 
    
    if (title && content) {
        const note = { title, content, timestamp: new Date().getTime() };
        localStorage.setItem(`note-${note.timestamp}`, JSON.stringify(note));
        clearNote();
        displayNotes();
    } else {
        alert('Please add both a title and some content to your note.');
    }
}

function openNote(note) {
    document.getElementById('noteTitle').value = note.title;
    document.getElementById('noteArea').innerHTML = note.content; 
}

function displayNotes() {
    const notesList = document.getElementById('notesList');
    notesList.innerHTML = '';
    
    Object.keys(localStorage).forEach(key => {
        if (key.startsWith('note-')) {
            const note = JSON.parse(localStorage.getItem(key));
            const noteElement = document.createElement('li');
            noteElement.textContent = `${note.title}`;

            const openBtn = document.createElement('button');
            openBtn.textContent = 'Open';
            openBtn.classList.add('open-note-btn');
            openBtn.onclick = () => openNote(note);
            noteElement.appendChild(openBtn);

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.classList.add('delete-note-btn');
            deleteBtn.onclick = () => deleteNote(key);
            noteElement.appendChild(deleteBtn);
            
            notesList.appendChild(noteElement);
        }
    });
}

function setUpEventListeners() {
    document.getElementById('saveBtn').addEventListener('click', saveNote);

    document.getElementById('clearBtn').addEventListener('click', clearNote);
}

function deleteNote(noteKey) {
    localStorage.removeItem(noteKey);
    displayNotes();
}

function clearNote() {
    document.getElementById('noteTitle').value = '';
    document.getElementById('noteArea').innerHTML = '';
}

function openNote(note) {
    document.getElementById('noteTitle').value = note.title;
    document.getElementById('noteArea').value = note.content;
}

document.getElementById('clearBtn').addEventListener('click', clearNote);

function clearNote() {
    document.getElementById('noteTitle').value = '';
    document.getElementById('noteArea').value = '';
}

function deleteNote(noteKey) {
    localStorage.removeItem(noteKey);
    displayNotes();
}