import {stopEscPropagation} from './utils.js';

const HASHTAGS_MAX_COUNT = 5;
const HASHTAGS_MIN_SYMBOLS = 2;
const HASHTAGS_MAX_SYMBOLS = 20;
const HASHTAGS_REGEX = /^#[A-Za-zА-Яа-яЕё0-9]{1,19}$/;
const DESCRIPTION_MAX_LENGTH = 140;

const pictureUploadForm = document.querySelector('.img-upload__form');
const pictureUploadHashtags = pictureUploadForm.querySelector('.text__hashtags');
const pictureUploadDescr = pictureUploadForm.querySelector('.text__description');

const splitHashtags = ((HashtagsString) =>
  HashtagsString.trim().toLowerCase().split(' ').filter((element) => element !== '')
);

const validTagOnlyHash = ((value) =>
  !(splitHashtags(value).some((element) => (element.charAt(0) === '#' && element.length === 1)))
);

const validTagFromHash = ((value) =>
  splitHashtags(value).every((element) => element.startsWith('#'))
);

const validTagsOverflow = ((value) =>
  splitHashtags(value).length <= HASHTAGS_MAX_COUNT
);

const validTagsDublicate = ((value) =>
  !(splitHashtags(value).some((element, index, arr) => arr.lastIndexOf(element) !== index))
);

const validTagsLengthMinMax = ((value) =>
  splitHashtags(value).every((element) => element.length >= HASHTAGS_MIN_SYMBOLS && element.length <= HASHTAGS_MAX_SYMBOLS)
);

const validTagsRegExp = ((value) =>
  splitHashtags(value).every((element) => element.match(HASHTAGS_REGEX))
);
const validDescrLength = ((value) =>
  value.length <= DESCRIPTION_MAX_LENGTH
);

const pristine = new Pristine(pictureUploadForm, {
  classTo: 'text__label',
  errorClass: 'text__label--invalid',
  successClass: 'text__label--valid',
  errorTextParent: 'text__label',
  errorTextTag: 'div',
  errorTextClass: 'text__error'
});

pristine.addValidator(pictureUploadHashtags, validTagOnlyHash, 'ХешТег не должен состоять только из #.');
pristine.addValidator(pictureUploadHashtags, validTagFromHash, 'ХешТег должен состоять из # и хотя бы одного символа.');
pristine.addValidator(pictureUploadHashtags, validTagsOverflow, `Максимальное кол-во хештегов ${HASHTAGS_MAX_COUNT} штук.`);
pristine.addValidator(pictureUploadHashtags, validTagsDublicate, 'Все хештеги должны быть уникальными.');
pristine.addValidator(pictureUploadHashtags, validTagsLengthMinMax, `Длина хештега должна быть больше ${HASHTAGS_MIN_SYMBOLS} и меньше ${HASHTAGS_MAX_SYMBOLS} символов.`);
pristine.addValidator(pictureUploadHashtags, validTagsRegExp, 'Хештег должен состоять только из букв и цифр');
pristine.addValidator(pictureUploadDescr, validDescrLength, `Длина описания не должна превышать ${DESCRIPTION_MAX_LENGTH} символов`);

pictureUploadForm.addEventListener('submit', (evt) => {
  if(!pristine.validate()) {evt.preventDefault();}
});

pictureUploadHashtags.addEventListener('keydown', stopEscPropagation);
pictureUploadDescr.addEventListener('keydown', stopEscPropagation);

export {pristine};
