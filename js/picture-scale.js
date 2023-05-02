const SCALE_MIN = 25;
const SCALE_MAX = 100;
const SCALE_STEP = 25;

const scaleControlsElement = document.querySelectorAll('[type=\'button\'].scale__control');
const scaleControlValueElement = document.querySelector('.scale__control--value');
const pictureUploadPreviewElement = document.querySelector('.img-upload__preview img');

scaleControlsElement.forEach((element) => {
  element.addEventListener('click', () => {
    let scaleValue = parseInt(scaleControlValueElement.value, 10);
    if (scaleValue < SCALE_MAX && element.classList.contains('scale__control--bigger')) {scaleValue += SCALE_STEP;}
    if (scaleValue > SCALE_MIN && element.classList.contains('scale__control--smaller')) {scaleValue -= SCALE_STEP;}

    scaleControlValueElement.value = `${scaleValue}%`;
    pictureUploadPreviewElement.style.cssText += `transform:scale(${0.01 * scaleValue})`;
  });
});
