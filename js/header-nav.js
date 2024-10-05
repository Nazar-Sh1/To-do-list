const burger = document.querySelector('.burger');
const navList = document.querySelector('.nav__list');

burger.addEventListener('click', function () {
  burger.classList.toggle('burger--active');
  navList.classList.toggle('nav__list--active');
  
  setTimeout(() => {
    navList.classList.toggle('show');
  }, 10);
});
