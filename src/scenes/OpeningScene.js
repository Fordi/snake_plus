let timer = 0;
let state = 'FADING_IN';
let game = null;

export const init = async (g) => {
  game = g;
  const { backlight, spritesheet, loadImage } = game;
  backlight(0);
  timer = 0;
  state = 'FADING_IN';
  spritesheet(await loadImage('./assets/opening.png'));
};

export const update = (tick) => {
  const { pressed, setState } = game;
  if (state === 'FADING_IN') {
    timer++;
  }
  if (timer === 75) {
    state = 'HOLDING';
  }
  if (pressed('A')) {
    state = 'FADING_OUT';
  }
  if (state === 'FADING_OUT') {
    timer--;
    if (timer == -15) {
      setState('PlayingScene');
    }
  }
};

export const draw = (tick) => {
  const {
    backlight,
    pen,
    text,
    sprite,
    clear,
  } = game;
  pen(0, 0, 0);
  clear();
  if (!(state == 'FADING_OUT' && timer <= 0)) {
    for (let i = 0; i < 225; i++) {
      let x = (i % 15) * 8;
      let y = Math.floor(i / 15) * 8;
      sprite(i, x, y);
    }
    pen(15, 15, 15, 15);
    text("Press A to start", 0, 0);
  }
  if (state == 'FADING_IN' || state == 'FADING_OUT') {
    backlight(timer < 0 ? 0 : timer);
  }
};

