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
const tasks = document.querySelectorAll('.task');

// Add event listener to each task element
tasks.forEach((task) => {
  task.addEventListener('click', () => {
    // Get the task title and image
    const taskTitle = task.querySelector('.task__title').textContent;
    const taskImage = task.querySelector('.task__image').src;

    // Update the modal window's header with the task title
    document.querySelector('.modal-content h2').textContent = taskTitle;

    // Add the task image to the modal window
    const modalImage = document.createElement('img');
    modalImage.src = taskImage;
    modalImage.alt = taskTitle;
    modalImage.style.width = '10%';
    modalImage.style.height = 'auto';
    modalImage.style.marginBottom = '20px';

    // Remove any existing image from the modal window
    const existingImage = document.querySelector('.modal-content img');
    if (existingImage) {
      existingImage.remove();
    }

    // Add the task image to the modal window
    document.querySelector('.modal-content').insertBefore(modalImage, document.querySelector('.modal-content h2'));

    // Toggle the modal window visibility
    document.getElementById('myModal').style.display = 'block';
  });
});

// Add event listener to the close button
document.querySelector('.close').addEventListener('click', () => {
  document.getElementById('myModal').style.display = 'none';
});