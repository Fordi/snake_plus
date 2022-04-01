import Game from './Game.js';

const game = Game(
    document.querySelector('#game'),
    {
        opening: () => import('./scenes/OpeningScene.js'),
        playing: () => import('./scenes/PlayingScene.js'),
    },
);
window.game = game;
game.start('opening');