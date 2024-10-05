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