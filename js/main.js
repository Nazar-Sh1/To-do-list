function updateTimeAndDate() {
    const timeLabel = document.querySelector('.nav__time-label');
    const dataLabel = document.querySelector('.nav__data-label');
    
    const now = new Date();
    const optionsTime = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
    const optionsDate = { year: 'numeric', month: '2-digit', day: '2-digit' };
    
    timeLabel.textContent = now.toLocaleTimeString('en-US', optionsTime);
    dataLabel.textContent = now.toLocaleDateString('en-US', optionsDate);
  }
  
  setInterval(updateTimeAndDate, 1000);
  
  updateTimeAndDate();
  