const columns = document.querySelectorAll('.column-content');
const addNoteForm = document.getElementById('add-note-form');
const noteTitle = document.getElementById('note-title');
const noteText = document.getElementById('note-text');
const noteStatus = document.getElementById('note-status');

let draggedNote = null;

function updateDragControls() {
  document.querySelectorAll('.note').forEach(note => {
    note.addEventListener('dragstart', () => {
      draggedNote = note;
      note.classList.add('dragging');
    });

    note.addEventListener('dragend', () => {
      draggedNote = null;
      note.classList.remove('dragging');
    });
  });
}

function createNoteElement(title, text) {
  const note = document.createElement('article');
  note.className = 'note';
  note.draggable = true;
  note.innerHTML = `
    <div>
      <h3>${title}</h3>
      <p>${text}</p>
    </div>
    <div class="note-actions">
      <small>Arraste para mover</small>
      <button type="button" class="delete-note">Excluir</button>
    </div>
  `;

  note.querySelector('.delete-note').addEventListener('click', () => {
    note.remove();
  });

  return note;
}

function initializeColumns() {
  columns.forEach(column => {
    column.addEventListener('dragover', event => {
      event.preventDefault();
      column.classList.add('drag-over');
    });

    column.addEventListener('dragleave', () => {
      column.classList.remove('drag-over');
    });

    column.addEventListener('drop', event => {
      event.preventDefault();
      column.classList.remove('drag-over');
      if (!draggedNote) return;
      column.appendChild(draggedNote);
    });
  });
}

addNoteForm.addEventListener('submit', event => {
  event.preventDefault();

  const title = noteTitle.value.trim();
  const text = noteText.value.trim();
  const status = noteStatus.value;

  if (!title || !text) {
    return;
  }

  const note = createNoteElement(title, text);
  document.getElementById(`${status}-column`).appendChild(note);
  updateDragControls();

  addNoteForm.reset();
});

initializeColumns();
updateDragControls();
