import Game from './Game.js';
const canvas = Object.assign(document.createElement('canvas'), {
    width: 120,
    height: 120,
});
document.body.appendChild(canvas);
const game = Game(
    canvas,
    {
        opening: () => import('./scenes/OpeningScene.js'),
        playing: () => import('./scenes/PlayingScene.js'),
    },
);
window.game = game;
game.start('opening');