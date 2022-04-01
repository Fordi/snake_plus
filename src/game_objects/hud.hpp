#ifndef HUD_HPP
#define HUD_HPP

#include "./board.hpp"
#include "./snake.hpp"
#include "../state.hpp"

struct hud_t {
    board_t* board;
    void draw(state_t state, uint32_t score);
};
#endif