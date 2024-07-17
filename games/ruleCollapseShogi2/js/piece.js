//駒の移動範囲を定義
//桂馬は動きは特殊だから定義しない
const pieceStatus = {
    "歩兵": {
        move : { "up": 1},
        coolDown : 3,
    },
    "金将": {
        move : { "up": 1, "down": 1, "left": 1, "right": 1, "leftUp": 1, "rightUp": 1},
        coolDown : 4,
    },
    "銀将": {
        move : { "up": 1, "leftUp": 1, "rightUp": 1, "leftDown": 1, "rightDown": 1},
        coolDown : 4,
    },
    "飛車": {
        move : { "up": 8, "down": 8, "left": 8, "right": 8},
        coolDown : 5,
    },
    "龍王": {
        move : { "up": 8, "down": 8, "left": 8, "right": 8, "leftUp": 1, "rightUp": 1, "leftDown": 1, "rightDown": 1},
        coolDown : 5,
    },
    "角行": {
        move : { "leftUp": 8, "rightUp": 8, "leftDown": 8, "rightDown": 8},
        coolDown : 5,
    },
    "龍馬": {
        move : {"up": 1, "down": 1, "left": 1, "right": 1, "leftUp": 8, "rightUp": 8, "leftDown": 8, "rightDown": 8},
        coolDown : 5,
    },
    "王将": {
        move : {"up": 1, "down": 1, "left": 1, "right": 1, "leftUp": 1, "rightUp": 1, "leftDown": 1, "rightDown": 1},
        coolDown : 5,
    },
    "桂馬": {
        move : {},
        coolDown : 4,
    },
    "香車": {
        move : { "up": 8},
        coolDown : 4,
    }
}

function newPiece(kind, x, y){
    let piece = {
        kind : kind,
        x : x,
        y : y,
        xPos : x * tileSize,
        yPos : y * tileSize,
        coolDown : 0,
    }
}