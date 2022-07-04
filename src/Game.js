const ufn = {};
const unimplemented = (name) => {
  if (!ufn[name]) {
    ufn[name] = true;
    console.warn(`${name}() hasn't been implemented.`);
  }
};

const { min, max, round, floor } = Math;

export default (canvas, scenes) => {
  const context = window.context = canvas.getContext('2d');
  const keyboardState = {};
  window.keyboardState = keyboardState;
  const onKeyDown = ({ key }) => {
    if (!running) return;
    if (!keyboardState[key]) keyboardState[key] = {};
    keyboardState[key].down = true;
    return false;
  };
  const onKeyUp = ({ key }) => {
    if (!running) return;
    if (!keyboardState[key]) keyboardState[key] = {};
    keyboardState[key].up = true;
    return false;
  };
  const onFrameStart = () => {
    Object.keys(keyboardState).forEach(key => {
      const { down, up } = keyboardState[key];
      keyboardState[key] = { down, up, held: down && !up, pressed: down };
    });
  };
  const onFrameEnd = () => {
    Object.keys(keyboardState).forEach(key => {
      keyboardState[key] = { down: keyboardState[key].held };
    });
  };
  window.addEventListener('keydown', onKeyDown);
  window.addEventListener('keyup', onKeyUp);

  const setScene = async (name) => {
    game.currentScene?.teardown?.();
    game.currentScene = await (await scenes[name]()).default(game);
    await game.currentScene?.init?.();
  };
  let running = false;
  const stop = () => {
    running = false;
  }
  const step = (tick = 1000 / 60) => {
    onFrameStart();
    game.currentScene?.update?.(tick);
    game.currentScene?.draw?.(tick);
    onFrameEnd();
  };

  const pressed = key => {
    return (keyboardState[key] || {}).pressed;
  };

  const start = async (scene) => new Promise(async resolve => {
    if (scene) {
      await setScene(scene);
    }
    running = true;
    const frame = (tick) => {
      if (running) {
        step(tick);
        requestAnimationFrame(frame);
      } else { resolve(); }
    };
    requestAnimationFrame(frame);
  });
  const loadImage = async (src) => new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Couldn't load ${src}`));
    img.src = src;
  });
  const fonts = {};
  const loadFont = async (src) => {
    if (fonts[src]) {
      return fonts[src];
    }
    const id = `font_${Math.random().toString(36).substring(2)}`;
    fonts[src] = new Promise(async (resolve, reject) => {
      const data = await fetch(src).then(r => r.arrayBuffer());
      const blob = new Blob([data], { type: 'application/font-woff2' });
      const reader = new FileReader();
      reader.onload = event => {
        const sheet = document.createElement('style');
        sheet.innerHTML = `
          @font-face {
            font-family: '${id}';
            src: url(${event.target.result}) format('woff2');
            font-weight: normal;
            font-style: normal;
          }
        `;
        document.body.appendChild(sheet);
        fonts[src] = id;
        console.log(id);
        resolve(id);
      };
      reader.readAsDataURL(blob);
    });
    return fonts[src];
  };
  const game = {
    setScene,
    loadImage,
    loadFont,
    start,
    stop,
    context,
    canvas,
    pressed,
  };
  return game;
};
