const SCALE_MIN = 25;
const SCALE_MAX = 100;
const SCALE_STEP = 25;

const scaleControls = document.querySelectorAll('[type=\'button\'].scale__control');
const scaleControlValue = document.querySelector('.scale__control--value');
const pictureUploadPreview = document.querySelector('.img-upload__preview img');

scaleControls.forEach((element) => {
  element.addEventListener('click', () => {
    let scaleValue = parseInt(scaleControlValue.value, 10);
    if (scaleValue < SCALE_MAX && element.classList.contains('scale__control--bigger')) {scaleValue += SCALE_STEP;}
    if (scaleValue > SCALE_MIN && element.classList.contains('scale__control--smaller')) {scaleValue -= SCALE_STEP;}

    scaleControlValue.value = `${scaleValue}%`;
    pictureUploadPreview.style.cssText += `transform:scale(${0.01 * scaleValue})`;
  });
});
