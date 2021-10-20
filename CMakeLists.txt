cmake_minimum_required(VERSION 3.13)

include(pico-sdk/pico_sdk_init.cmake)

project(game)

pico_sdk_init()

include(picosystem/picosystem-config.cmake)

add_subdirectory(game)
