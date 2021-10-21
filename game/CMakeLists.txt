cmake_minimum_required(VERSION 3.13)

project(game)

# Define the entry point
picosystem_executable(
  game
  main.cpp
  vec.cpp
  game_objects/board.cpp
  game_objects/snake.cpp
  game_objects/apple.cpp
  game_objects/hud.cpp
  scenes/OpeningScene.cpp
  scenes/PlayingScene.cpp
)

pixel_double(game)

# Comment the next line to see the PicoSystem logo at start
disable_startup_logo(game)
no_spritesheet(game)
