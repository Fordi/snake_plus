import Font from '../Font.js';

export default async ({
  loadImage,
  canvas,
  context,
  pressed,
  setScene,
}) => {
  let timer = 0;
  let state = 'FADING_IN';
  let [
    openingScreen,
    arcadeFontSheet,
  ] = await Promise.all([
      loadImage('./assets/opening.png'),
      loadImage('./assets/text.png'),
  ]);
  const font = Font(arcadeFontSheet, 8, 8, ' !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~␡');

  const init = () => {
    canvas.style.opacity = 0;
    timer = 0;
    state = 'FADING_IN';
  };

  const update = (tick) => {
    if (state === 'FADING_IN') {
      timer++;
    }
    if (timer === 75) {
      state = 'HOLDING';
    }
    if (pressed('a')) {
      state = 'FADING_OUT';
    }
    if (state === 'FADING_OUT') {
      timer--;
      if (timer == -15) {
        setScene('playing');
      }
    }
  };

  const draw = (tick) => {
    context.fillColor = `#000`;
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.drawImage(openingScreen, 0, 0, openingScreen.width, openingScreen.height);

    if (!(state == 'FADING_OUT' && timer <= 0)) {
      font.draw(context, 'Press A', 4, 4);
    }
    if (state == 'FADING_IN' || state == 'FADING_OUT') {
      canvas.style.opacity = timer < 0 ? 0 : (timer / 15);
    }
  };

  return { init, update, draw };
};