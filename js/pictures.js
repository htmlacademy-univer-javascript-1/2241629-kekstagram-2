import {openBigPicModal} from './big-picture.js';

const addPictures = (photosArray) => {
  const picturesElement = document.querySelector('.pictures');
  const picturesLinkElement = picturesElement.querySelectorAll('.picture');

  picturesLinkElement.forEach((element) => element.remove());

  const picturesTemplate = document.querySelector('#picture').content.querySelector('.picture');
  const fragment = document.createDocumentFragment();

  photosArray.forEach((element) => {
    const pictureTemplate = picturesTemplate.cloneNode(true);
    const pictureImgElement = pictureTemplate.querySelector('.picture__img');
    const pictureLikesElement = pictureTemplate.querySelector('.picture__likes');
    const pictureCommentsElement = pictureTemplate.querySelector('.picture__comments');

    pictureImgElement.src = element.url;
    pictureLikesElement.textContent = element.likes;
    pictureCommentsElement.textContent = element.comments.length;

    pictureTemplate.addEventListener('click', () => {
      openBigPicModal(element);
    });

    fragment.append(pictureTemplate);
  });

  picturesElement.appendChild(fragment);
};

export {addPictures};
