#include "picosystem.hpp"
#include "./board.hpp"

using namespace picosystem;

vec_t board_t::size() {
    return {
        .x = scale->x * (bounds->x + 1),
        .y = scale->y * (bounds->y + 1)
    };
}

vec_t board_t::pos() {
    vec_t s = size();
    int32_t hud_height = scale->y * 2;

    return {
        // Horizontally centered
        .x = ((int32_t) SCREEN->w - s.x) / 2,
        // Vertically centered in the space left by the HUD
        .y = (((int32_t) SCREEN->h - hud_height) - s.y ) / 2 + hud_height
    };
}

void board_t::draw() {
    vec_t p = pos();
    vec_t s = size();
    
    rect(p.x, p.y, s.x, s.y);
}

bool board_t::out_of_bounds(vec_t p) {
    return (
        p.x < 0
        || p.x >= bounds->x
        || p.y < 0
        || p.y >= bounds->y
    );
}

// convert a map coordinate into its position on the screen
vec_t board_t::transform(vec_t v) {
    vec_t p = pos();
    return {
        .x = v.x * scale->x + p.x + scale->x / 2,
        .y = v.y * scale->y + p.y + scale->y / 2
    };
}
