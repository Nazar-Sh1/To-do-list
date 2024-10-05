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

window.addEventListener('click', (event) => {
  const modal = document.getElementById('myModal');
  if (event.target == modal) {
      modal.style.display = 'none';
  }
});

// function performSearch() {
//   const searchInput = document.getElementById('searchInput').value.toLowerCase();
//   const tasks = document.querySelectorAll('.task');

//   tasks.forEach(task => {
//       const taskTitle = task.querySelector('.task__title').innerText.toLowerCase();
//       if (taskTitle.includes(searchInput)) {
//           task.style.display = '';  // Показати завдання
//       } else {
//           task.style.display = 'none';  // Сховати завдання
//       }
//   });
// }

// function showModal(title, image, count) {
//   const modal = document.getElementById("myModal");
//   const modalImage = modal.querySelector(".modal-image");
//   const modalTitle = modal.querySelector("h2");
//   const modalContent = modal.querySelector("p");

//   modal.style.display = "block";
//   modalImage.src = image;
//   modalTitle.innerText = title;
//   modalContent.innerText = `${count} tasks remaining.`;

//   const closeButton = modal.querySelector(".close");
//   closeButton.onclick = function() {
//       modal.style.display = "none";
//   };
//   window.onclick = function(event) {
//       if (event.target === modal) {
//           modal.style.display = "none";
//       }
//   };
// }
