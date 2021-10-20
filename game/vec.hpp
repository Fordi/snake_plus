#ifndef VEC_HPP
#define VEC_HPP

#include <stdint.h>

// simple 2d vector
struct vec_t {
    int32_t x, y;
    // Check if another vector is equal to this one.
    bool equals(vec_t other);
};

#endif