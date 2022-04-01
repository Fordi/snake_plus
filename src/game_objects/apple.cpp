#include <stdlib.h>
#include "./apple.hpp"
#include "picosystem.hpp"

using namespace picosystem;

void apple_t::place(vec_t other) {
    do {
        pos.x = std::rand() % board->bounds->x;
        pos.y = std::rand() % board->bounds->y;
    } while(snake->collides(pos) && !collides(other));
    alive = true;
}

bool apple_t::collides(vec_t other) {
    return alive && pos.equals(other);
}

void apple_t::draw() {
    if (!alive) return;
    vec_t p = board->transform(pos);
    sprite(sprite_id, p.x, p.y);
}
