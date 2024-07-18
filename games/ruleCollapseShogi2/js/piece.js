//駒の移動範囲を定義
//桂馬は動きは特殊だから定義しない
const pieceStatus = {
    "歩兵": {
        move: { "up": 1 },
        coolDown: 3000,
    },
    "金将": {
        move: { "up": 1, "down": 1, "left": 1, "right": 1, "upLeft": 1, "upRight": 1 },
        coolDown: 4000,
    },
    "銀将": {
        move: { "up": 1, "upLeft": 1, "upRight": 1, "downLeft": 1, "downRight": 1 },
        coolDown: 4000,
    },
    "飛車": {
        move: { "up": 8, "down": 8, "left": 8, "right": 8 },
        coolDown: 5000,
    },
    "龍王": {
        move: { "up": 8, "down": 8, "left": 8, "right": 8, "upLeft": 1, "upRight": 1, "downLeft": 1, "downRight": 1 },
        coolDown: 5000,
    },
    "角行": {
        move: { "upLeft": 8, "upRight": 8, "downLeft": 8, "downRight": 8 },
        coolDown: 5000,
    },
    "龍馬": {
        move: { "up": 1, "down": 1, "left": 1, "right": 1, "upLeft": 8, "upRight": 8, "downLeft": 8, "downRight": 8 },
        coolDown: 5000,
    },
    "王将": {
        move: { "up": 1, "down": 1, "left": 1, "right": 1, "upLeft": 1, "upRight": 1, "downLeft": 1, "downRight": 1 },
        coolDown: 5000,
    },
    "桂馬": {
        move: {},
        coolDown: 4000,
    },
    "香車": {
        move: { "up": 8 },
        coolDown: 4000,
    }
}

function newPiece(kind, isEnemy) {
    let piece = {
        isEnemy: isEnemy,
        kind: kind,
        coolDown: 0,
        offsetX: 0,
        offsetY: 0,
    }

    return piece
}

function getCanMoves(piece, nowX, nowY) {
    let canMoves = [];
    const moves = pieceStatus[piece.kind].move;
    let moveKeys = Object.keys(moves);

    for (let dir of moveKeys) {
        let moveAmmount = moves[dir];
        for (let i = 1; i <= moveAmmount; i++) {
            let moveX = dirs[dir][0] * i;
            let moveY = dirs[dir][1] * i;
            moveY = piece.isEnemy ? -moveY : moveY;
            const toX = nowX + moveX;
            let toY = nowY + moveY;

            if (toX >= boardSize || toX < 0 || toY >= boardSize || toY < 0) break;

            let onSpace = nowBoard[toY][toX];
            if (onSpace != "") {

                if (piece.isEnemy != onSpace.isEnemy) canMoves.push([toX, toY]);
                
                break
            }

            canMoves.push([toX, toY])
        }
    }

    return canMoves;
}

function movePiece(fromX, fromY, toX, toY) {
    // if (toX >= boardSize || toX < 0 || toY >= boardSize || toY < 0) return;
    const piece = nowBoard[fromY][fromX];
    piece.coolDown = pieceStatus[piece.kind].coolDown;
    nowBoard[fromY][fromX] = "";
    nowBoard[toY][toX] = piece;
}