#include <stdint.h>
#include "./hud.hpp"
#include "picosystem.hpp"
using namespace picosystem;


void hud_t::draw(state_t state, uint32_t score) {
    hline(
        board->scale->x / 2,
        board->scale->y * 2,
        SCREEN->w - board->scale->x
    );
    text(
        str(score),
        board->scale->x / 2,
        board->scale->y / 2
    );

    if (state == GAME_OVER) {
        text(
            "Press A to restart",
            board->scale->x / 2 + 24,
            board->scale->y / 2
        );
    }
}