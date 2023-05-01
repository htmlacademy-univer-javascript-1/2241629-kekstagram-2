import {openBigPicModal} from './big-picture.js';

const addPictures = (photosArray) => {
  const pictures = document.querySelector('.pictures');
  const picturesElement = pictures.querySelectorAll('.picture');
  picturesElement.forEach((element) => element.remove());
  const picturesTemplate = document.querySelector('#picture').content.querySelector('.picture');
  const fragment = document.createDocumentFragment();

  photosArray.forEach((element) => {
    const pictureTemplate = picturesTemplate.cloneNode(true);
    const pictureImg = pictureTemplate.querySelector('.picture__img');
    const pictureLikes = pictureTemplate.querySelector('.picture__likes');
    const pictureComments = pictureTemplate.querySelector('.picture__comments');

    pictureImg.src = element.url;
    pictureLikes.textContent = element.likes;
    pictureComments.textContent = element.comments.length;

    pictureTemplate.addEventListener('click', () => {
      openBigPicModal(element);
    });

    fragment.append(pictureTemplate);
  });

  pictures.appendChild(fragment);
};

export {addPictures};
