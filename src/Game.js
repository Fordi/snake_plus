const ufn = {};
const unimplemented = (name) => {
    if (!ufn[name]) {
        ufn[name] = true;
        console.warn(`${name}() hasn't been implemented.`);
    }
};

export default (canvas, scenes) => {
    const context = window.context = canvas.getContext('2d');
    let currentSheet = null;
    let penColor = [0, 0, 0, 0];
    const pen = (r, g, b, a = 15) => {
        penColor = [
            Math.min(255, r * 17),
            Math.min(255, g * 17),
            Math.min(255, b * 17),
            Math.min(1, a / 15)
        ];
    };
    const alpha = (a) => unimplemented('alpha');
    const clip = (x, y, w, h) => unimplemented('clip');
    const blend = (m) => unimplemented('blend');
    const target = (b) => unimplemented('target');
    const camera = (x, y) => unimplemented('camera');
    const spritesheet = (image) => {
        currentSheet = image;
        game.currentSheet = currentSheet;
    };
    const cursor = (x, y) => unimplemented('cursor');
    const font = (w, h, s, url) => unimplemented('font');
    const clear = () => {
        // context.clearRect(0, 0, canvas.width, canvas.height);
        frect(0, 0, canvas.width, canvas.height);
    };
    const pixel = (x, y) => unimplemented('pixel');
    const rect = (x, y, w, h) => unimplemented('rect');
    const frect = (x, y, w, h) => {
        context.fillColor = `rgba(${penColor.join(', ')})`;
        context.fillRect(x, y, w, h);
    };
    const circle = (x, y, r) => unimplemented('circle');
    const fcircle = (x, y, r) => unimplemented('fcircle');
    const ellipse = (x, y, rx, ry) => unimplemented('ellipse');
    const fellipse = (x, y, rx, ry) => unimplemented('fellipse');
    const poly = (x, y, ...points) => unimplemented('poly');
    const fpoly = (x, y, ...points) => unimplemented('fpoly');
    const line = (x1, y1, x2, y2) => unimplemented('line');
    const hline = (x, y, l) => unimplemented('hline');
    const vline = (x, y, l) => unimplemented('vline');
    const text = (message, x, y, wrap) => unimplemented('text');
    const sprite = (i, x, y, flags = 0) => {
        const sw = currentSheet.width >> 3;
        const flipH = (flags & 1) !== 0;
        const flipV = (flags & 2) !== 0;
        const px = (i % sw) * 8;
        const py = Math.floor(i / sw) * 8;
        const sx = flipH ? canvas.width - px : px;
        const sy = flipV ? canvas.height - py : py;
        if (flipV || flipH) {
            context.save();
            context.translate(flipH ? canvas.width : 0, flipV ? canvas.height : 0);
            context.scale(flipH ? -1 : 1, flipV ? -1 : 1);
        }
        context.drawImage(currentSheet, sx, sy, 8, 8, x, y, 8, 8);
        if (flipV || flipH) {
            context.restore();
        }
    };

    const blit = (source, sx, sy, sw, sh, dx, dy, dw, dh, flags) => unimplemented('blit');
    const voice = (attack, decay, sustain, release, bend, bend_ms, reverb, noise, distort) => unimplemented('voice');
    const play = (voice, frequency, duration, volume) => unimplemented('play');
    const position = () => unimplemented('position');
    const pressed = (b) => unimplemented('pressed');
    const button = (b) => unimplemented('button');
    const battery = () => unimplemented('battery');
    const backlight = (b) => {
        canvas.style.opacity = Math.min(1, b / 15);
    }
    const led = (r, g, b) => unimplemented('led');
    const str = (n, d) => n.toFixed(d).replace(/(\.\d*)0+$/, '$1').replace('/\.$/', '');
    const time = Math.round(performance.now());
    const time_us = Math.round(performance.now() * 1000);
    const sleep = async (d) => new Promise(r => setTimeout(r, d));
    const sleep_us = async (d) => sleep(d / 1000);
    const rgb = (r, g, b, a = 15) => [r, g, b, a];
    const hsv = (h, s, v, a = 15) => unimplemented('hsv');
    const buffer = (w, h, data) => unimplemented('buffer');
    const intersects = (x1, y1, w1, h1, x2, y2, w2, h2) => unimplemented('intersects');
    const intersection = (x1, y1, w1, h1, x2, y2, w2, h2) => unimplemented('intersection');
    const contains = (x1, y1, w1, h1, x2, y2, w2, h2) => unimplemented('contains');
    const measure = (message, w, h, wrap) => unimplemented('measure');
    const fsin = (v) => unimplemented('fsin');
    const fcos = (v) => unimplemented('fcos');
    const mix = (c1, c2, m) => unimplemented('mix');

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
        game.currentScene?.update?.(tick);
        game.currentScene?.draw?.(tick);
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
    const game = {
        setScene,
        loadImage,
        start,
        stop,
        pen,
        alpha,
        clip,
        blend,
        target,
        camera,
        spritesheet,
        cursor,
        font,
        clear,
        pixel,
        rect,
        frect,
        circle,
        fcircle,
        ellipse,
        fellipse,
        poly,
        fpoly,
        line,
        hline,
        vline,
        text,
        sprite,
        blit,
        voice,
        play,
        position,
        pressed,
        button,
        battery,
        backlight,
        led,
        str,
        time,
        time_us,
        sleep,
        sleep_us,
        rgb,
        hsv,
        buffer,
        intersects,
        intersection,
        contains,
        measure,
        fsin,
        fcos,
        mix,
        step,
    };
    return game;
};
