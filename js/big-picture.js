const fillBigPicComments = (comments) => {
  const bigPicComments = document.querySelector('.big-picture .social__comments');
  bigPicComments.innerHTML = '';

  const commentsList = comments.reduce((accumulator, currentComment) => {
    accumulator += `<li class="social__comment">
      <img class="social__picture" src="${currentComment.avatar}" alt="${currentComment.name}" width="35" height="35">
      <p class="social__text">${currentComment.message}</p>
    </li>`;
    return accumulator;
  }, '');

  bigPicComments.insertAdjacentHTML('beforeend', commentsList);
};

const renderBigPic = ({url, likes, description, comments}) => {
  const bigPicSection = document.querySelector('.big-picture');

  bigPicSection.querySelector('.social__comment-count').classList.add('hidden');
  bigPicSection.querySelector('.comments-loader').classList.add('hidden');

  const bigPicImg = bigPicSection.querySelector('.big-picture__img img');
  const bigPicLikesCount = bigPicSection.querySelector('.likes-count');
  const bigPicCommentsCount = bigPicSection.querySelector('.comments-count');
  const bigPicCaption = bigPicSection.querySelector('.social__caption');

  bigPicImg.src = url;
  bigPicLikesCount.textContent = likes;
  bigPicCommentsCount.textContent = comments.length;
  bigPicCaption.textContent = description;

  fillBigPicComments(comments);
};

export {renderBigPic};
