#include "picosystem.hpp"

using namespace picosystem;

#include "../state.hpp"
#include "../game_objects/board.hpp"
#include "../game_objects/snake.hpp"
#include "../game_objects/apple.hpp"
#include "../game_objects/hud.hpp"
#include "../assets/snakesheet.hpp"
#include "../snakesheet_ids.hpp"
#include "PlayingScene.hpp"
#include "../vec.hpp"
#include "../snakesheet_ids.hpp"

voice_t chomp = voice(
    0, // attack ms
    0, // decay ms
    100, // sustain %
    50, // release ms

    -100, // bend hz
    100, // bend time ms

    300, // reverb ms
    100, // noise
    100 // distort
);

voice_t thud = voice(
    0, // attack ms
    0, // decay ms
    100, // sustain %
    0, // release ms

    -0, // bend hz
    0, // bend time ms
    
    250, // reverb ms
    100, // noise
    0 // distort
);

PlayingScene::PlayingScene(game_t* g) {
    game = g;
    state = PLAYING;
    bounds.x = 13;
    bounds.y = 12;
    scale.x = 8;
    scale.y = 8;
    board.bounds = &bounds;
    board.scale = &scale;
    snake.board = &board;

    apple.board = &board;
    apple.snake = &snake;
    apple.sprite_id = snakesheet_ids::APPLE;
    apple.alive = true;

    pumpkin.board = &board;
    pumpkin.snake = &snake;
    pumpkin.sprite_id = snakesheet_ids::PUMPKIN;
    pumpkin.alive = false;

    hud.board = &board;
};

void PlayingScene::init() {
    // Reset the game state
    state = PLAYING;
    score = 0;
    ticks_per_update = INIT_TICKS;


    // Reset the snake
    snake.reset();

    // Place a new apple
    apple.place(pumpkin.pos);
    apple.alive = true;
    pumpkin.place(apple.pos);
    pumpkin.alive = false;
    use_snakesheet();
    backlight(75);
}

void PlayingScene::update(uint32_t tick) {
    switch (state) {
        case PLAYING:
            update_playing(tick);
            break;
        case GAME_OVER:
            update_game_over(tick);
            break;
    }
}

void PlayingScene::update_playing(uint32_t tick) {
    // Check input, and update the snake's direction
    snake.update_input(button(UP), button(DOWN), button(LEFT), button(RIGHT));

    // First loop, just set last_tick
    if (last_tick == 0) last_tick = tick;

    // Move snake only after necessary number of ticks
    if (tick - last_tick < ticks_per_update) return;
    last_tick = tick;

    // Get the snake's future position
    vec_t next = snake.next();
    
    // Check for game over states
    if (
        board.out_of_bounds(next)
        || snake.collides(next)
    ) {
        state = GAME_OVER;
        play(thud, 50, 250, 100);
        return;
    }
    bool ateApple = apple.collides(next);
    bool atePumpkin = pumpkin.collides(next);
    bool ate = ateApple || atePumpkin;
    // Check if the snake has collected an apple
    if (ate) {
        // Play the "chomp" sound
        play(chomp, 1000, 50, 100);
        // The snake eats the apple, growing
        snake.length++;
        // Add to the player's score
        score++;
        if (ateApple) {
            // Make the snake faster, but don't go faster than an update per MIN_TICKS
            ticks_per_update = std::max(ticks_per_update - 1, MIN_TICKS);
            // Place a new apple
            apple.place(pumpkin.pos);
            // Check if it's time to add a pumpkin
            if (!pumpkin.alive && (score % 10) == 0) {
                play(thud, 50, 250, 100);
                pumpkin.place(apple.pos);
            }
        }
        if (atePumpkin) {
            // Pumpkins are big and heavy.
            // Make the snake slower
            ticks_per_update = INIT_TICKS;
            // Hide the pumpkin
            pumpkin.alive = false;
        }
    }
    // Advance the snake, indicating whether it ate or not.
    snake.advance(ate);
}

void PlayingScene::update_game_over(uint32_t tick) {
    if (pressed(A)) init();
}

void PlayingScene::draw(uint32_t tick) {
    pen(0, 0, 0);
    clear();
    
    pen(15, 15, 15, 15);
    hud.draw(state, score);
    board.draw();
    apple.draw();
    pumpkin.draw();

    if (
        state == PLAYING
        || (
            state == GAME_OVER
            && ((time() / 250) % 2) == 0
        ) 
    ) {
        vec_t next = snake.next();
        snake.draw(
            apple.collides(next)
            || pumpkin.collides(next)
        );
    }
}
