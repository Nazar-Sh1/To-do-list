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

// Get all task elements
// Отримуємо всі елементи завдань
const tasks = document.querySelectorAll('.task');

// Додаємо обробник подій для кожного завдання
tasks.forEach((task) => {
  task.addEventListener('click', () => {
    // Отримуємо заголовок завдання та зображення
    const taskTitle = task.querySelector('.task__title').textContent;
    const taskImage = task.querySelector('.task__image').src;

    // Оновлюємо заголовок модального вікна з назвою завдання
    document.querySelector('.modal-content h2').textContent = taskTitle;

    // Додаємо зображення завдання до модального вікна
    const modalImage = document.createElement('img');
    modalImage.src = taskImage;
    modalImage.alt = taskTitle;
    modalImage.style.width = '10%';
    modalImage.style.height = 'auto';
    modalImage.style.marginBottom = '20px';

    // Видаляємо існуюче зображення з модального вікна
    const existingImage = document.querySelector('.modal-content img');
    if (existingImage) {
      existingImage.remove();
    }

    // Вставляємо зображення перед заголовком у модальне вікно
    document.querySelector('.modal-content').insertBefore(modalImage, document.querySelector('.modal-content h2'));

    // Перевіряємо, чи вже існує контейнер для нотаток, і видаляємо його перед додаванням нового
    const existingNotesContainer = document.querySelector('.notes-container');
    if (existingNotesContainer) {
      existingNotesContainer.remove();
    }

    // Створюємо контейнер для нотаток
    const notesContainer = document.createElement('div');
    notesContainer.classList.add('notes-container');
    notesContainer.style.marginTop = '20px';

    // Створюємо текстове поле для додавання нових нотаток
    const notesTextArea = document.createElement('textarea');
    notesTextArea.placeholder = 'Add a new note...';
    notesTextArea.classList.add('notes-textarea');
    notesTextArea.style.width = '100%';
    notesTextArea.style.height = '100px';
    notesTextArea.style.marginBottom = '10px';

    // Створюємо кнопку для додавання нових нотаток
    const addNoteButton = document.createElement('button');
    addNoteButton.textContent = 'Add Note';
    addNoteButton.classList.add('add-note-button');
    addNoteButton.style.width = '100%';
    addNoteButton.style.height = '30px';
    addNoteButton.style.marginBottom = '10px';

    // Створюємо список для існуючих нотаток
    const notesList = document.createElement('ul');
    notesList.classList.add('notes-list');
    notesList.style.listStyle = 'none';
    notesList.style.padding = '0';
    notesList.style.margin = '0';

    // Додаємо існуючі нотатки до списку
    const existingNotes = JSON.parse(localStorage.getItem(taskTitle)) || [];
    existingNotes.forEach((note) => {
      const noteItem = document.createElement('li');
      noteItem.classList.add('note-item');
      noteItem.style.marginBottom = '10px';
      
      // Контейнер для кнопок та чекбокса з текстом
      const noteContentContainer = document.createElement('div');
      noteContentContainer.classList.add('note-content-container');

      // Контейнер для кнопок
      const buttonsContainer = document.createElement('div');
      buttonsContainer.classList.add('note-buttons');
      
      // Створюємо checkbox для позначення виконання нотатки
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = note.completed;
      checkbox.classList.add('note-checkbox');
      checkbox.style.marginRight = '10px';

      // Створюємо спан для тексту нотатки
      const noteText = document.createElement('span');
      noteText.textContent = note.text;
      noteText.style.marginRight = 'auto';

      // Створюємо кнопку для редагування
      const editButton = document.createElement('button');
      editButton.textContent = 'Edit';
      editButton.classList.add('edit-note-button');

      // Створюємо кнопку для видалення
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.classList.add('delete-note-button');

      // Додаємо обробники подій для checkbox, редагування та видалення
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

      // Додаємо чекбокс і текст до контейнера контенту нотатки
      noteContentContainer.appendChild(checkbox);
      noteContentContainer.appendChild(noteText);

      // Додаємо кнопки до контейнера кнопок
      buttonsContainer.appendChild(editButton);
      buttonsContainer.appendChild(deleteButton);

      // Додаємо контейнер з контентом і кнопки до елемента нотатки
      noteItem.appendChild(noteContentContainer);
      noteItem.appendChild(buttonsContainer);

      // Додаємо нотатку до списку
      notesList.appendChild(noteItem);
    });

    // Додаємо обробник події для кнопки додавання нотатки
    addNoteButton.addEventListener('click', () => {
      const newText = notesTextArea.value.trim();
      if (newText) {
        const newNote = { text: newText, completed: false };
        existingNotes.push(newNote);
        localStorage.setItem(taskTitle, JSON.stringify(existingNotes));

        // Створюємо новий елемент для нотатки
        const newNoteItem = document.createElement('li');
        newNoteItem.classList.add('note-item');
        newNoteItem.style.marginBottom = '10px';
        
        // Контейнер для контенту та кнопок
        const noteContentContainer = document.createElement('div');
        noteContentContainer.classList.add('note-content-container');
        
        // Контейнер для кнопок
        const buttonsContainer = document.createElement('div');
        buttonsContainer.classList.add('note-buttons');
        
        // Checkbox для нової нотатки
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = newNote.completed;
        checkbox.classList.add('note-checkbox');
        checkbox.style.marginRight = '10px';

        // Створюємо спан для тексту нотатки
        const noteText = document.createElement('span');
        noteText.textContent = newText;
        noteText.style.marginRight = 'auto';

        // Кнопка для редагування нової нотатки
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.classList.add('edit-note-button');

        // Кнопка для видалення нової нотатки
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-note-button');

        // Обробники для нової нотатки
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

        // Додаємо чекбокс і текст до контейнера контенту
        noteContentContainer.appendChild(checkbox);
        noteContentContainer.appendChild(noteText);

        // Додаємо кнопки до контейнера кнопок
        buttonsContainer.appendChild(editButton);
        buttonsContainer.appendChild(deleteButton);

        // Додаємо контент і кнопки до нового елемента нотатки
        newNoteItem.appendChild(noteContentContainer);
        newNoteItem.appendChild(buttonsContainer);

        // Додаємо нову нотатку до списку
        notesList.appendChild(newNoteItem);
        notesTextArea.value = ''; // Очищуємо текстове поле
      }
    });

    // Додаємо textarea, кнопку та список нотаток до контейнера
    notesContainer.appendChild(notesTextArea);
    notesContainer.appendChild(addNoteButton);
    notesContainer.appendChild(notesList);
    document.querySelector('.modal-content').appendChild(notesContainer);

    // Відкриваємо модальне вікно
    document.getElementById('myModal').style.display = 'block';
  });
});

// Закриття модального вікна
document.querySelector('.close').addEventListener('click', () => {
  document.getElementById('myModal').style.display = 'none';
});
