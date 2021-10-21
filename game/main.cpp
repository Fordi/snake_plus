#include "picosystem.hpp"
using namespace picosystem;

#include "IGameScene.hpp"
#include "scenes/PlayingScene.hpp"
#include "scenes/OpeningScene.hpp"


game_t game { 
    .currentScene = nullptr,
    .opening = nullptr,
    .playing = nullptr
};

OpeningScene opening { &game };
PlayingScene playing { &game };


void init() {
    game.opening = &opening;
    game.playing = &playing;

    // Initial state goes here
    game.currentScene = &opening;

    game.currentScene->init();
}

void update(uint32_t tick) {
    game.currentScene->update(tick);
}


void draw(uint32_t tick) {
    game.currentScene->draw(tick);
}
