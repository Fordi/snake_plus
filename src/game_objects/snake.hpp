#ifndef SNAKE_HPP
#define SNAKE_HPP

#include <stdint.h>
#include <vector>
#include "../vec.hpp"
#include "./board.hpp"

struct part_t {
    vec_t pos;
    bool full;
};

// snake object
struct snake_t {
    board_t* board;

    // Snake's current direction
    vec_t dir;

    // Snake's new direction
    // The reason we do this is that we can change directions as often as the user presses buttons,
    //  but we don't want to accidentally let the user do a 180 without moving.
    vec_t newdir;

    // Length of the snake
    uint32_t length;

    // Positions of the body pieces
    std::vector<part_t> body;

    // Return the next position of the snake's head based on its current direction
    vec_t next();

    // Advance the snake by one square in dir
    // This only gets called after `next()` has been vetted by the game's logic
    void advance(bool ate);

    // Returns true if any part of the snake collides with `other`.
    bool collides(vec_t other);

    // Draw the snake's segments.  "open" for an open mouth
    void draw(bool open);
    
    // Make the snake how it should be when the game starts
    void reset();

    // given bools for direction inputs, update the snake's newdir
    void update_input(bool up, bool down, bool left, bool right);

    uint32_t get_head_sprite(bool open);
    uint32_t get_tail_sprite();
    uint32_t get_body_sprite(uint32_t index);
};

#endif
