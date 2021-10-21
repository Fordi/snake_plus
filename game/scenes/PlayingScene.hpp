#ifndef PLAYING_STATE_HPP
#define PLAYING_STATE_HPP

#include "../IGameScene.hpp"
#include "../vec.hpp"
#include "../state.hpp"
#include "../game_objects/board.hpp"
#include "../game_objects/snake.hpp"
#include "../game_objects/apple.hpp"
#include "../game_objects/hud.hpp"

constexpr uint32_t MIN_TICKS = 8;
constexpr uint32_t INIT_TICKS = 25;

class PlayingScene: public IGameScene {
  public:
    PlayingScene(game_t* game);
    void init();
    void update(uint32_t tick);
    void draw(uint32_t tick);

  protected:
    void update_playing(uint32_t tick);
    void update_game_over(uint32_t tick);

    state_t state = PLAYING;
    vec_t bounds = {};
    vec_t scale = {};
    board_t board  = {};
    snake_t snake = {};
    apple_t apple = {};
    apple_t pumpkin = {};
    hud_t hud = {};
    uint32_t ticks_per_update = INIT_TICKS;
    uint32_t score = 0;
    uint32_t last_tick = 0;
    game_t* game;
};

#endif