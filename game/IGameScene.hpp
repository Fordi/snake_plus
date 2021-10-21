#ifndef GAME_STATE_HPP
#define GAME_STATE_HPP

#include <stdint.h>

class IGameScene {
  public:
    IGameScene* currentScene;
    virtual void init() = 0;
    virtual void update(uint32_t tick) = 0;
    virtual void draw(uint32_t tick) = 0;
};

struct game_t {
  IGameScene* currentScene;
  IGameScene* opening;
  IGameScene* playing;
  inline void setState(IGameScene* state) {
    currentScene = state;
    state->init();
  }
};

#endif
