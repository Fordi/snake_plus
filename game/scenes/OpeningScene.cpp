#include "picosystem.hpp"

using namespace picosystem;

#include "../assets/opening.hpp"
#include "OpeningScene.hpp"

OpeningScene::OpeningScene(game_t* g) {
  game = g;
}

void OpeningScene::init() {
  backlight(0);
  timer = 0;
  state = FADING_IN;
  use_opening();
}

void OpeningScene::update(uint32_t tick) {
  if (state == FADING_IN) {
    timer++;
  }
  if (timer == 75) {
    state = HOLDING;
  }
  if (pressed(A)) {
    state = FADING_OUT;
  }
  if (state == FADING_OUT) {
    timer--;
    if (timer == -15) {
      game->setState(game->playing);
    }
  }
}

void OpeningScene::draw(uint32_t tick) {
  pen(0, 0, 0);
  clear();
  if (!(state == FADING_OUT && timer <= 0)) {
    for (uint32_t i = 0; i < 225; i++) {
      uint32_t x = (i % 15) * 8;
      uint32_t y = (i / 15) * 8;
      sprite(i, x, y);
    }
    pen(15, 15, 15, 15);
    text("Press A to start", 0, 0);
  }
  if (state == FADING_IN || state == FADING_OUT) {
    backlight(timer < 0 ? 0 : timer);
  }
}