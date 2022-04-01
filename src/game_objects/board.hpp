#ifndef BOARD_HPP
#define BOARD_HPP

#include "../vec.hpp"

// Board object
struct board_t {
    vec_t* bounds;
    vec_t* scale;

    // Calculate the size of the board in pixels
    vec_t size();

    // Calculate the position of the board in pixels
    vec_t pos();

    // Draw the board
    void draw();

    // returns true if a passed vector is out of bounds
    bool out_of_bounds(vec_t p);

    // convert a map coordinate into its position on the screen
    vec_t transform(vec_t v);
};

#endif
