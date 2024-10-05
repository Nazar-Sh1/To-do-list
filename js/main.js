function updateTimeAndDate() {
  const timeLabel = document.querySelector(".nav__time-label");
  const dataLabel = document.querySelector(".nav__data-label");

  const now = new Date();
  const optionsTime = { hour: "2-digit", minute: "2-digit", second: "2-digit" };
  const optionsDate = { year: "numeric", month: "2-digit", day: "2-digit" };

  timeLabel.textContent = now.toLocaleTimeString("en-US", optionsTime);
  dataLabel.textContent = now.toLocaleDateString("en-US", optionsDate);
}

setInterval(updateTimeAndDate, 1000);

updateTimeAndDate();

const tasks = document.querySelectorAll('.task');

tasks.forEach((task) => {
  task.addEventListener('click', () => {
    const taskTitle = task.querySelector('.task__title').textContent;
    const taskImage = task.querySelector('.task__image').src;

    document.querySelector('.modal-content h2').textContent = taskTitle;

    const modalImage = document.createElement('img');
    modalImage.src = taskImage;
    modalImage.alt = taskTitle;
    modalImage.style.width = '10%';
    modalImage.style.height = 'auto';
    modalImage.style.marginBottom = '20px';

    const existingImage = document.querySelector('.modal-content img');
    if (existingImage) {
      existingImage.remove();
    }

    document.querySelector('.modal-content').insertBefore(modalImage, document.querySelector('.modal-content h2'));

    const existingNotesContainer = document.querySelector('.notes-container');
    if (existingNotesContainer) {
      existingNotesContainer.remove();
    }

    const notesContainer = document.createElement('div');
    notesContainer.classList.add('notes-container');
    notesContainer.style.marginTop = '20px';

    const notesTextArea = document.createElement('textarea');
    notesTextArea.placeholder = 'Add a new note...';
    notesTextArea.classList.add('notes-textarea');
    notesTextArea.style.width = '100%';
    notesTextArea.style.height = '100px';
    notesTextArea.style.marginBottom = '10px';

    const addNoteButton = document.createElement('button');
    addNoteButton.textContent = 'Add Note';
    addNoteButton.classList.add('add-note-button');
    addNoteButton.style.width = '100%';
    addNoteButton.style.height = '30px';
    addNoteButton.style.marginBottom = '10px';

    const notesList = document.createElement('ul');
    notesList.classList.add('notes-list');
    notesList.style.listStyle = 'none';
    notesList.style.padding = '0';
    notesList.style.margin = '0';

    const existingNotes = JSON.parse(localStorage.getItem(taskTitle)) || [];
    existingNotes.forEach((note) => {
      const noteItem = document.createElement('li');
      noteItem.classList.add('note-item');
      noteItem.style.marginBottom = '10px';
      
      const noteContentContainer = document.createElement('div');
      noteContentContainer.classList.add('note-content-container');

      const buttonsContainer = document.createElement('div');
      buttonsContainer.classList.add('note-buttons');
      
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = note.completed;
      checkbox.classList.add('note-checkbox');
      checkbox.style.marginRight = '10px';

      const noteText = document.createElement('span');
      noteText.textContent = note.text;
      noteText.style.marginRight = 'auto';

      const editButton = document.createElement('button');
      editButton.textContent = 'Edit';
      editButton.classList.add('edit-note-button');

      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.classList.add('delete-note-button');

      checkbox.addEventListener('change', () => {
        note.completed = checkbox.checked;
        localStorage.setItem(taskTitle, JSON.stringify(existingNotes));
      });

      editButton.addEventListener('click', () => {
        const editText = prompt('Enter new text for the note:');
        if (editText) {
          note.text = editText;
          localStorage.setItem(taskTitle, JSON.stringify(existingNotes));
          noteText.textContent = editText;
        }
      });

      deleteButton.addEventListener('click', () => {
        existingNotes.splice(existingNotes.indexOf(note), 1);
        localStorage.setItem(taskTitle, JSON.stringify(existingNotes));
        noteItem.remove();
      });

      noteContentContainer.appendChild(checkbox);
      noteContentContainer.appendChild(noteText);

      buttonsContainer.appendChild(editButton);
      buttonsContainer.appendChild(deleteButton);

      noteItem.appendChild(noteContentContainer);
      noteItem.appendChild(buttonsContainer);

      notesList.appendChild(noteItem);
    });

    addNoteButton.addEventListener('click', () => {
      const newText = notesTextArea.value.trim();
      if (newText) {
        const newNote = { text: newText, completed: false };
        existingNotes.push(newNote);
        localStorage.setItem(taskTitle, JSON.stringify(existingNotes));

        const newNoteItem = document.createElement('li');
        newNoteItem.classList.add('note-item');
        newNoteItem.style.marginBottom = '10px';
        
        const noteContentContainer = document.createElement('div');
        noteContentContainer.classList.add('note-content-container');
        
        const buttonsContainer = document.createElement('div');
        buttonsContainer.classList.add('note-buttons');
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = newNote.completed;
        checkbox.classList.add('note-checkbox');
        checkbox.style.marginRight = '10px';

        const noteText = document.createElement('span');
        noteText.textContent = newText;
        noteText.style.marginRight = 'auto';

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.classList.add('edit-note-button');

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-note-button');

        checkbox.addEventListener('change', () => {
          newNote.completed = checkbox.checked;
          localStorage.setItem(taskTitle, JSON.stringify(existingNotes));
        });

        editButton.addEventListener('click', () => {
          const editText = prompt('Enter new text for the note:');
          if (editText) {
            newNote.text = editText;
            localStorage.setItem(taskTitle, JSON.stringify(existingNotes));
            noteText.textContent = editText;
          }
        });

        deleteButton.addEventListener('click', () => {
          existingNotes.splice(existingNotes.indexOf(newNote), 1);
          localStorage.setItem(taskTitle, JSON.stringify(existingNotes));
          newNoteItem.remove();
        });

        noteContentContainer.appendChild(checkbox);
        noteContentContainer.appendChild(noteText);

        buttonsContainer.appendChild(editButton);
        buttonsContainer.appendChild(deleteButton);

        newNoteItem.appendChild(noteContentContainer);
        newNoteItem.appendChild(buttonsContainer);

        notesList.appendChild(newNoteItem);
        notesTextArea.value = ''; 
      }
    });

    notesContainer.appendChild(notesTextArea);
    notesContainer.appendChild(addNoteButton);
    notesContainer.appendChild(notesList);
    document.querySelector('.modal-content').appendChild(notesContainer);

    document.getElementById('myModal').style.display = 'block';
  });
});

document.querySelector('.close').addEventListener('click', () => {
  document.getElementById('myModal').style.display = 'none';
});

function changeAvatarImage(src) {
  console.log('changeAvatarImage called with src:', src);
  const avatarLink = document.getElementById('avatar-link');
  if (avatarLink) {
    console.log('avatarLink found');
    const img = avatarLink.querySelector('img');
    if (img) {
      console.log('img found');
      img.src = src;
    } else {
      console.error('No img element found inside avatar-link');
    }
  } else {
    console.error('No element with id avatar-link found');
  }
}

const charactersImages = document.querySelectorAll('.characters__image');

window.addEventListener('load', function() {
  console.log('window load event fired');
  charactersImages.forEach((image) => {
    console.log('processing image:', image);
    if (image && image.getAttribute('src')) {
      console.log('image has src attribute');
      image.addEventListener('click', () => {
        console.log('image clicked');
        changeAvatarImage(image.getAttribute('src'));
      });
    } else {
      console.error('Image element or src attribute not found');
    }
  });
});

// Оновлює кількість завдань у розділі
const taskCountElement = task.querySelector('.task__count');
taskCountElement.textContent = `${existingNotes.length} Tasks`;

deleteButton.addEventListener('click', () => {
  existingNotes.splice(existingNotes.indexOf(note), 1);
  localStorage.setItem(taskTitle, JSON.stringify(existingNotes));
  noteItem.remove();
  taskCountElement.textContent = `${existingNotes.length} Tasks`;
});


addNoteButton.addEventListener('click', () => {
  const newText = notesTextArea.value.trim();
  if (newText) {
    const newNote = { text: newText, completed: false };
    existingNotes.push(newNote);
    localStorage.setItem(taskTitle, JSON.stringify(existingNotes));
    taskCountElement.textContent = `${existingNotes.length} Tasks`;
  }
});

const openModalButton = document.querySelector('.open-modal');
openModalButton.addEventListener('click', () => {
  const taskTitle = 'Personal'; // Замість цього можна підставити реальну назву завдання
  const existingNotes = JSON.parse(localStorage.getItem(taskTitle)) || [];

  const notesContainer = document.createElement('div');
  notesContainer.classList.add('notes-container');

  const notesTextArea = document.createElement('textarea');
  notesTextArea.placeholder = 'Add a new note...';

  const addNoteButton = document.createElement('button');
  addNoteButton.textContent = 'Add Note';

  const notesList = document.createElement('div');
  notesList.classList.add('notes-list');

  addNoteButton.addEventListener('click', () => {
    const newText = notesTextArea.value.trim();
    if (newText) {
      const newNote = { text: newText, completed: false };
      existingNotes.push(newNote);
      localStorage.setItem(taskTitle, JSON.stringify(existingNotes));

      const newNoteItem = document.createElement('div');
      newNoteItem.classList.add('note-item');

      const newNoteContentContainer = document.createElement('div');
      newNoteContentContainer.classList.add('note-content-container');

      const newCheckbox = document.createElement('input');
      newCheckbox.type = 'checkbox';
      newCheckbox.checked = false;
      newCheckbox.classList.add('note-checkbox');
      newCheckbox.style.marginRight = '10px';

      const newNoteText = document.createElement('span');
      newNoteText.textContent = newText;
      newNoteText.style.marginRight = 'auto';

      const newEditButton = document.createElement('button');
      newEditButton.textContent = 'Edit';
      newEditButton.classList.add('edit-note-button');

      const newDeleteButton = document.createElement('button');
      newDeleteButton.textContent = 'Delete';
      newDeleteButton.classList.add('delete-note-button');

      newCheckbox.addEventListener('change', () => {
        newNote.completed = newCheckbox.checked;
        localStorage.setItem(taskTitle, JSON.stringify(existingNotes));
      });

      newEditButton.addEventListener('click', () => {
        const editText = prompt('Enter new text for the note:');
        if (editText) {
          newNote.text = editText;
          localStorage.setItem(taskTitle, JSON.stringify(existingNotes));
          newNoteText.textContent = editText;
        }
      });

      newDeleteButton.addEventListener('click', () => {
        existingNotes.splice(existingNotes.indexOf(newNote), 1);
        localStorage.setItem(taskTitle, JSON.stringify(existingNotes));
        newNoteItem.remove();
      });

      newNoteContentContainer.appendChild(newCheckbox);
      newNoteContentContainer.appendChild(newNoteText);

      const buttonsContainer = document.createElement('div');
      buttonsContainer.appendChild(newEditButton);
      buttonsContainer.appendChild(newDeleteButton);

      newNoteItem.appendChild(newNoteContentContainer);
      newNoteItem.appendChild(buttonsContainer);

      notesList.appendChild(newNoteItem);

      notesTextArea.value = '';
    }
  });

  notesContainer.appendChild(notesTextArea);
  notesContainer.appendChild(addNoteButton);
  notesContainer.appendChild(notesList);

  document.querySelector('.modal-content').appendChild(notesContainer);

  document.getElementById('myModal').style.display = 'block';
});

const modalCloseButton = document.querySelector('.close');
modalCloseButton.addEventListener('click', () => {
  document.getElementById('myModal').style.display = 'none';
});

window.addEventListener('click', (event) => {
  if (event.target == document.getElementById('myModal')) {
    document.getElementById('myModal').style.display = 'none';
  }
});

// function searchNotes() {
//   const searchInput = document.getElementById('searchInput');
//   const searchQuery = searchInput.value.trim().toLowerCase();
//   const notesList = document.querySelector('.notes-list');
//   const notesItems = notesList.children;
//   const tasks = document.querySelectorAll('.task');
//   let hasMatch = false;

//   for (let i = 0; i < notesItems.length; i++) {
//     const noteItem = notesItems[i];
//     const noteText = noteItem.querySelector('span').textContent.toLowerCase();

//     if (noteText.includes(searchQuery)) {
//       noteItem.style.display = 'block';
//       hasMatch = true;

//       // Отримуємо батьківський елемент нотатки (task)
//       const task = noteItem.closest('.task');

//       // Відображаємо батьківський елемент (task)
//       task.style.display = 'block';
//     } else {
//       noteItem.style.display = 'none';
//     }
//   }

//   // Приховуємо всі завдання, які не містять збіг у нотатках
//   tasks.forEach((task) => {
//     const notes = task.querySelectorAll('.note-item');
//     let taskHasMatch = false;

//     notes.forEach((note) => {
//       const noteText = note.querySelector('span').textContent.toLowerCase();
//       if (noteText.includes(searchQuery)) {
//         taskHasMatch = true;
//       }
//     });

//     if (!taskHasMatch) {
//       task.style.display = 'none';
//     }
//   });

//   // Виводимо повідомлення, якщо не знайдено жодного збігу
//   if (!hasMatch) {
//     const searchResults = document.getElementById('searchResults');
//     searchResults.textContent = 'Нічого не знайдено';
//     searchResults.style.display = 'block';
//   } else {
//     const searchResults = document.getElementById('searchResults');
//     searchResults.style.display = 'none';
//   }
// }

// // Додаємо обробник події для поля пошуку
// const searchInput = document.getElementById('searchInput');
// searchInput.addEventListener('input', searchNotes);