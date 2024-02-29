document.addEventListener('DOMContentLoaded', function() {
    displayNotes();
});

document.getElementById('saveBtn').addEventListener('click', function() {
    const title = document.getElementById('noteTitle').value.trim();
    const content = document.getElementById('noteArea').value.trim();
    
    if (title && content) {
        saveNote(title, content);
        document.getElementById('noteTitle').value = '';
        document.getElementById('noteArea').value = '';
    } else {
        alert('Please add both a title and some content to your note.');
    }
});

function saveNote(title, content) {
    const note = { title, content, timestamp: new Date().getTime() };
    localStorage.setItem(`note-${note.timestamp}`, JSON.stringify(note));
    displayNotes();
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
            
            notesList.appendChild(noteElement);
        }
    });
}

function openNote(note) {
    document.getElementById('noteTitle').value = note.title;
    document.getElementById('noteArea').value = note.content;
}