import {isEscapeKey, isMouseClick, toggleClass} from './utils.js';

const COMMENTS_SHOWEN = 5;

const bigPicSection = document.querySelector('.big-picture');
const bigPicCloseButton = bigPicSection.querySelector('.big-picture__cancel');
const bigPicImg = bigPicSection.querySelector('.big-picture__img img');
const bigPicLikesCount = bigPicSection.querySelector('.likes-count');
const bigPicCommentsCount = bigPicSection.querySelector('.comments-count');
const bigPicCaption = bigPicSection.querySelector('.social__caption');
const bigPicComments = bigPicSection.querySelector('.social__comments');
const bigPicCommentsLoader = bigPicSection.querySelector('.social__comments-loader');
const bigPicShowenCommentsCount = bigPicSection.querySelector('.social__comment-count');


let shownCommentsCount = 0;
let totalCommentList = [];
let totalCommentListLength = 0;

const fillBigPicComments = (comments) => {
  bigPicComments.innerHTML = '';

  const commentsList = comments.reduce((accumulator, currentComment) => {
    shownCommentsCount++;
    accumulator += `<li class="social__comment ${shownCommentsCount > COMMENTS_SHOWEN ? 'hidden' : ''}">
      <img class="social__picture" src="${currentComment.avatar}" alt="${currentComment.name}" width="35" height="35">
      <p class="social__text">${currentComment.message}</p>
    </li>`;
    return accumulator;
  }, '');
 bigPicComments.insertAdjacentHTML('beforeend', commentsList);
};

const fillCommentsCount = () => {
  bigPicShowenCommentsCount.innerHTML = `${shownCommentsCount} из <span class="comments-count">${totalCommentListLength}</span> ${totalCommentListLength === 1 ? 'комментария': 'комментариев'}`;
  if(shownCommentsCount === totalCommentListLength) {
    bigPicCommentsLoader.classList.add('hidden');
  }
};

const renderBigPic = ({url, likes, description, comments}) => {
  bigPicImg.src = url;
  bigPicLikesCount.textContent = likes;
  bigPicCommentsCount.textContent = comments.length;
  bigPicCaption.textContent = description;

  fillBigPicComments(comments);
  shownCommentsCount = totalCommentListLength < COMMENTS_SHOWEN ? totalCommentListLength : COMMENTS_SHOWEN;
  fillCommentsCount();
};

const loadMoreCommentHandler = () => {
  const bigPicComment = bigPicComments.querySelectorAll('.social__comment.hidden');
  const commentsForShowCount = bigPicComment.length < COMMENTS_SHOWEN ? bigPicComment.length : COMMENTS_SHOWEN;
  shownCommentsCount += commentsForShowCount;
  for (let i=0; i < commentsForShowCount; i++) {
    bigPicComment[i].classList.remove('hidden');
  }
  fillCommentsCount();
};

const tooglePictureModal = (isHidden) => {
  toggleClass(bigPicSection, 'hidden', !isHidden);
  toggleClass(document.body, 'modal-open', isHidden);
  bigPicComments.innerHTML = '';
};

const closeBigPicModal = (evt) => {
  evt.preventDefault();
  if (isEscapeKey(evt) || isMouseClick(evt)) {
    tooglePictureModal(false);
    document.removeEventListener('keydown', closeBigPicModal);
    bigPicCloseButton.removeEventListener('click', closeBigPicModal);
    bigPicCommentsLoader.removeEventListener('click', loadMoreCommentHandler);
    shownCommentsCount = 0;
    bigPicCommentsLoader.classList.remove('hidden');
  }
};

const openBigPicModal = (element) => {
  bigPicCommentsLoader.addEventListener('click', loadMoreCommentHandler);
  totalCommentList = element.comments;
  totalCommentListLength = totalCommentList.length;
  tooglePictureModal(true);
  renderBigPic(element);
  document.addEventListener('keydown', closeBigPicModal);
  bigPicCloseButton.addEventListener('click', closeBigPicModal);
};

export {openBigPicModal};
