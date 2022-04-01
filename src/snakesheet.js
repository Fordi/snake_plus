export default ([
    'BODY_NW', 'BODY_RIGHT_FULL', 'BODY_RIGHT', 'BODY_NE', 'BODY_NW_FULL', 'TAIL_LEFT', 'TAIL_RIGHT', 'BODY_NE_FULL',
    'BODY_DOWN', 'HEAD_RIGHT', 'HEAD_RIGHT_OPEN', 'BODY_UP_FULL', 'TAIL_UP', 'HEAD_UP', 'HEAD_UP_OPEN', 'BLANK1',
    'BODY_DOWN_FULL', 'HEAD_LEFT', 'HEAD_LEFT_OPEN', 'BODY_UP', 'TAIL_DOWN', 'HEAD_DOWN', 'HEAD_DOWN_OPEN', 'BLANK2',
    'BODY_SW', 'BODY_LEFT', 'BODY_LEFT_FULL', 'BODY_SE', 'BODY_SW_FULL', 'PUMPKIN', 'APPLE', 'BODY_SE_FULL'
].reduce((obj, name, index) => {
    obj[name] = index;
    return obj;
}, {}));
