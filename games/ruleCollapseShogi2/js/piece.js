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

function checkCanMoveTo(piece, toX, toY) {
    if (toX >= boardSize || toX < 0 || toY >= boardSize || toY < 0) return false;
    let onSpace = nowBoard[toY][toX];
    if (onSpace == "") return true;
    if (piece.isEnemy == onSpace.isEnemy) return false;
    else return true;
}

function getCanMoves(piece, nowX, nowY) {
    let canMoves = [];
    if (piece.coolDown > 0) return canMoves;

    let moves = pieceStatus[piece.kind].move;
    let moveKeys = Object.keys(moves);

    if (piece.kind == "桂馬") {
        moves = [[-1, -2], [1, -2]];
        if (piece.isEnemy) {
            moves[0][1] *= -1;
            moves[1][1] *= -1;
        }

        const toX1 = moves[0][0] + nowX;
        const toY1 = moves[0][1] + nowY;
        const toX2 = moves[1][0] + nowX;
        const toY2 = moves[1][1] + nowY;
        if (checkCanMoveTo(piece, toX1, toY1)) canMoves.push([toX1, toY1]);
        if (checkCanMoveTo(piece, toX2, toY2)) canMoves.push([toX2, toY2]);

        return canMoves;
    }

    //桂馬以外の場合の移動
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
    const piece = nowBoard[fromY][fromX];

    piece.coolDown = pieceStatus[piece.kind].coolDown;
    nowBoard[fromY][fromX] = "";
    if (nowBoard[toY][toX].kind == "王将") {
        pausing = true;
        showVsResult(!piece.isEnemy);
    }

    nowBoard[toY][toX] = piece;
    const reversed = reversePiece(piece, toX, toY);
}

function reversePiece(piece, x, y) {
    if (piece.isEnemy && y < 6) return false;
    if (!piece.isEnemy && y >= 3) return false;

    let doReverse = true;
    if (!piece.isEnemy) doReverse = confirm("成りますか");
    if (!doReverse) return false;

    let toPieceKind = piece.kind;
    if (piece.kind == "角行") toPieceKind = "龍馬";
    else if (piece.kind == "飛車") toPieceKind = "龍王";
    else if (piece.kind == "歩兵" || piece.kind == "銀将" || piece.kind == "桂馬" || piece.kind == "香車") toPieceKind = "金将";

    nowBoard[y][x].kind = toPieceKind;
    return true;
}