export default class HeadsUpDisplay {
    constructor({ board, game: { screen, hline, text } }) {
        Object.assign(this, { screen, board, hline, text });
        this.score = 0;
        this.state = 'PLAYING';
    }
    draw(tick) {
        const { hline, screen, board, text, state, score } = this;
        hline(
            board.scale.x / 2,
            board.scale.y * 2,
            screen.x - board.scale.x
        );
        text(
            score.toString(),
            board.scale.x / 2,
            board.scale.y / 2,
        );
        if (state === 'GAME_OVER') {
            text(
                "Press A to restart",
                board.scale.x / 2 + 24,
                board.scale.y / 2,
            );
        }
    }
}
