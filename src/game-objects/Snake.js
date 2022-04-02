import Vector from '../Vector.js';
import s from '../snakesheet.js';


export default class Snake {
    constructor() {
        this.pos = [];
        this.full = false;
        this.dir = new Vector(0, 0);
        this.newDir = new Vector(0, 0);
        this.length = 1;
        this.body = [new Vector(0, 0)];
    }
    next() {
        const { body, newDir } = this;
        return new Vector(
            body[0].x + newDir.x,
            body[0].y + newDir.y,
        );
    }
    advance(full) {
        const head = Object.assign(this.next(), { full });
        this.body.unshift(head);
        this.dir = new Vector(...this.newDir);
        if (this.body.length > this.length) {
            this.body.pop();
        }
    }
    collides(other) {
        // Loop through all the segments; skip the tail
        // Raasoning: collision detection is done before the tail
        // is popped off the stack.
        return this.body.slice(0, this.body.length - 1).reduce((collided, part) => {
            return collided || part.collides(other);
        }, false);
    }
    getHeadSprite(open) {
        const { dir } = this;
        if (dir.y == 0) {
            if (dir.x == 1) {
                return open ? s.HEAD_RIGHT_OPEN : s.HEAD_RIGHT;
            }
            return open ? s.HEAD_LEFT_OPEN : s.HEAD_LEFT;
        }
        if (dir.y == 1) {
            return open ? s.HEAD_DOWN_OPEN : s.HEAD_DOWN;
        }
        return open ? s.HEAD_UP_OPEN : s.HEAD_UP;                    
    }
}

#define CORNER(h, v, p, n) (p.x == h && p.y == 0 && n.x == 0 && n.y == v) || (p.x == 0 && p.y == -(v) && n.x == -(h) && n.y == 0)

uint32_t snake_t::get_body_sprite(uint32_t index) {
    part_t part = body[index];
    vec_t prev = body[index - 1].pos;
    vec_t nxt = body[index + 1].pos;
    vec_t dp = {
        .x = prev.x - part.pos.x,
        .y = prev.y - part.pos.y
    };
    vec_t np = {
        .x = part.pos.x - nxt.x,
        .y = part.pos.y - nxt.y
    };
    // If travelling in a straight line...
    if (dp.x == np.x && dp.y == np.y) {
        if (dp.y == 0) {
            if (dp.x == 1) {
                return part.full ? BODY_RIGHT_FULL : BODY_RIGHT;
            }
            return part.full ? BODY_LEFT_FULL : BODY_LEFT;
        }
        if (dp.y == 1) {
            return part.full ? BODY_DOWN_FULL : BODY_DOWN;
        }
        return part.full ? BODY_UP_FULL : BODY_UP;
    }
    if (CORNER(1, -1, dp, np)) {
        return part.full ? BODY_NW_FULL : BODY_NW;
    }
    if (CORNER(-1, -1, dp, np)) {
        return part.full ? BODY_NE_FULL : BODY_NE;
    }
    if (CORNER(-1, 1, dp, np)) {
        return part.full ? BODY_SE_FULL : BODY_SE;
    } 
    if (CORNER(1, 1, dp, np)) {
        return part.full ? BODY_SW_FULL : BODY_SW;
    }
    return BLANK1;
}

uint32_t snake_t::get_tail_sprite() {
    uint32_t last = body.size() - 1;
    vec_t tail = body[last].pos;
    vec_t prev = body[last - 1].pos;
    vec_t d = {
        .x = prev.x - tail.x,
        .y = prev.y - tail.y
    };
    if (d.y == 0) {
        if (d.x == 1) {
            return TAIL_RIGHT;
        }
        return TAIL_LEFT;
    }
    if (d.y == 1) {
        return TAIL_DOWN;
    }
    return TAIL_UP;
}

void snake_t::draw(bool open) {
    int32_t w = board->scale->x;
    int32_t h = board->scale->y;
    // Loop through all the segments
    for (uint32_t i = 0; i < body.size(); i++) {
        uint32_t sprite_id;
        vec_t p = board->transform(body[i].pos);
        if (i == 0) {
            sprite_id = get_head_sprite(open);
        } else if (i == body.size() - 1) {
            sprite_id = get_tail_sprite();
        } else {
            sprite_id = get_body_sprite(i);
        }
        sprite(sprite_id, p.x, p.y);
    }
}

void snake_t::reset() {
    // Clear out the snake's body, and add a new "head", setting the length to 1
    body.clear();
    length = 3;
    body.push_back({
        .pos = {
            .x = board->bounds->x / 2,
            .y = board->bounds->y / 2
        },
        .full = false
    });
    // Start moving to the right
    dir.x = 1;
    dir.y = 0;
    newdir.x = 1;
    newdir.y = 0;
}

void snake_t::update_input(bool up, bool down, bool left, bool right) {
    // The `dir.y == 0` part is to make sure the snake can only make
    // 90 degree turns during one move, as a 180 will set the snake
    //  to move onto its own body
    if (up && dir.y == 0) {
        newdir.x = 0;
        newdir.y = -1;
    } else if (down && dir.y == 0) {
        newdir.x = 0;
        newdir.y = 1;
    } else if (left && dir.x == 0) {
        newdir.x = -1;
        newdir.y = 0;
    } else if (right && dir.x == 0) {
        newdir.x = 1;
        newdir.y = 0;
    }
}
