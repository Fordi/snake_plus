#ifndef OPENING_SCENE_HPP
#define OPENING_SCENE_HPP

#include "../IGameScene.hpp"

enum substate_t {
  FADING_IN,
  HOLDING,
  FADING_OUT
};

class OpeningScene: public IGameScene {
  public:
    OpeningScene(game_t* game);
    void init();
    void update(uint32_t tick);
    void draw(uint32_t tick);

  protected:
    game_t* game;
    substate_t state = FADING_IN;
    int32_t timer = 0;
};

#endif