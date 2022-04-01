#ifndef APPLE_HPP
#define APPLE_HPP

#include "./board.hpp"
#include "./snake.hpp"
#include "../vec.hpp"

struct apple_t {
    board_t* board;
    snake_t* snake;
    uint32_t sprite_id;
    bool alive = true;
    vec_t pos;

    // Place the apple in a new random location, but avoid the snake
    void place(vec_t other);

    // returns true if the apple is colliding with `other`
    bool collides(vec_t other);

    // Draw the apple
    void draw();

    
};

#endif