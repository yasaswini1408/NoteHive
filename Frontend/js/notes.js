const API = 'https://notehive-qi1d.onrender.com'
let editingNoteId = null

const token = localStorage.getItem('token')
if (!token) window.location.href = 'index.html'

const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
}

function formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString('en-US', {
        day: 'numeric', month: 'short', year: 'numeric'
    })
}

async function loadNotes() {
    try {
        const res = await fetch(`${API}/notes`, { headers })
        const data = await res.json()
        renderNotes(data.notes)
    } catch (err) {
        console.error('Error loading notes', err)
    }
}

function renderNotes(notes) {
    const grid = document.getElementById('notesGrid')

    if (notes.length === 0) {
        grid.innerHTML = `
            <div class="empty">
                <span>🐝</span>
                No notes yet. Add your first one!
            </div>`
        return
    }

    grid.innerHTML = notes.map(note => `
        <div class="note-card">
            <div class="note-name">${note.name}</div>
            <div class="note-date">${formatDate(note.createdAt)}</div>
            <div class="note-actions">
                <button class="edit-btn" onclick="openModal('${note._id}', '${note.name}')">✏️ Edit</button>
                <button class="delete-btn" onclick="deleteNote('${note._id}')">🗑️ Delete</button>
            </div>
        </div>
    `).join('')
}

async function createNote() {
    const input = document.getElementById('noteInput')
    const name = input.value.trim()

    if (!name) return

    try {
        const res = await fetch(`${API}/notes`, {
            method: 'POST',
            headers,
            body: JSON.stringify({ name })
        })

        if (res.ok) {
            input.value = ''
            loadNotes()
        }
    } catch (err) {
        console.error('Error creating note', err)
    }
}

async function deleteNote(id) {
    if (!confirm('Delete this note?')) return

    try {
        const res = await fetch(`${API}/notes/${id}`, {
            method: 'DELETE',
            headers
        })

        if (res.ok) loadNotes()
    } catch (err) {
        console.error('Error deleting note', err)
    }
}

function openModal(id, name) {
    editingNoteId = id
    document.getElementById('editInput').value = name
    document.getElementById('modalOverlay').classList.add('open')
}

function closeModal() {
    editingNoteId = null
    document.getElementById('modalOverlay').classList.remove('open')
}

async function saveEdit() {
    const name = document.getElementById('editInput').value.trim()
    if (!name) return

    try {
        const res = await fetch(`${API}/notes/${editingNoteId}`, {
            method: 'PUT',
            headers,
            body: JSON.stringify({ name })
        })

        if (res.ok) {
            closeModal()
            loadNotes()
        }
    } catch (err) {
        console.error('Error updating note', err)
    }
}

function logout() {
    localStorage.removeItem('token')
    window.location.href = 'index.html'
}

loadNotes()