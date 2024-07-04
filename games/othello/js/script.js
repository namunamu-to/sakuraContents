let board = makeTwoDimList(8, "");
let boardSize;
let boardRange;
let sideTileNum; //値が8なら8x8のマスが生まれる
let tileSize;
let baseX = 0;
let baseY = 0;
let nextIsBlack = true;
let blackPlayer = "player";
let whitePlayer = "cpu";
let nextPlayer = blackPlayer;

function cpuAction() {
    let canPuts = [];

    for (let y = 0; y < sideTileNum; y++) {
        for (let x = 0; x < sideTileNum; x++) {
            if (checkCanPut(x, y)) {
                canPuts.push([x, y]);
            }
        }
    }

    if (canPuts.length > 0) {
        let canReverseStones = findStoneCanReverse(nextIsBlack, canPuts[0][0], canPuts[0][1]);
        reverseStones(canReverseStones);
        putStone(nextIsBlack, canPuts[0][0], canPuts[0][1]);
    }

    nextTurn();
}

function nextTurn() {
    nextIsBlack = !nextIsBlack;
    if (nextIsBlack) nextPlayer = blackPlayer;
    else nextPlayer = whitePlayer;

}

function gameStart() {
    board = makeTwoDimList(8, "");
    boardSize;
    boardRange;
    sideTileNum; //値が8なら8x8のマスが生まれる
    tileSize;
    baseX = 0;
    baseY = 0;
    nextIsBlack = true;

    putStone(true, 3, 3);
    putStone(true, 4, 4);
    putStone(false, 3, 4);
    putStone(false, 4, 3);
}

gameStart();

function checkGameEnd() {
    let blackNum = 0;
    let whiteNum = 0;

    for (let yLine of board) {
        for (let tile of yLine) {
            if (tile == "") continue;
            else if (tile.isBlack) blackNum++;
            else if (!tile.isBlack) whiteNum++;
        }
    }

    if (whiteNum + blackNum == board.length ** 2) {
        if (whiteNum == blackNum) confirm("引き分け");
        else if (whiteNum < blackNum) confirm(`黒が${blackNum}。白が${whiteNum}。\n$黒の勝利`);
        else if (whiteNum > blackNum) confirm(`黒が${blackNum}。白が${whiteNum}。\n$白の勝利`);

        if (confirm("もう一度プレイしますか？")) {
            gameStart();
        }
    }

}

function putStone(isBlack, x, y) {
    let stone = {
        isBlack: isBlack,
        x: x,
        y: y,
    };

    board[y][x] = stone;
}

function reverseStones(canReverses) {
    if (canReverses.length == 0) return;


    for (let reverseXY of canReverses) {
        board[reverseXY[1]][reverseXY[0]].isBlack = nextIsBlack;
    }
}

function findStoneCanReverse(isBlack, x, y) {
    let canList = [];

    for (let dirKey of dirKeys) {
        let chainEnemyStones = [];
        const dirX = dirs[dirKey][0];
        const dirY = dirs[dirKey][1];
        let i = y;
        let j = x;
        let isSand = false;

        for (; ;) {
            i += dirY;
            j += dirX;

            if (!isInnerTwoDimList(board, j, i)) break; //盤面外

            const tile = board[i][j];
            if (tile == "") break; //石が無い
            else if (tile.isBlack != isBlack) { //相手の石なら
                chainEnemyStones.push([j, i]);
            } else if (tile.isBlack == isBlack) { //自分の石なら
                isSand = true;
                break;
            }
        }

        if (isSand) canList = canList.concat(chainEnemyStones);
    }

    return canList;
}

function checkCanPut(x, y) {
    if (!isInnerTwoDimList(board, x, y)) return false; //盤面外
    else if (board[y][x] != "") return false;

    if (findStoneCanReverse(nextIsBlack, x, y).length > 0) return true

    return false;
}

updates["boardInfo"] = function () {
    boardSize = Math.min(canvasElm.width, canvasElm.height) * 0.95;
    sideTileNum = 8; //値が8なら8x8のマスが生まれる
    tileSize = boardSize / sideTileNum;

    baseX = (canvasElm.width - boardSize) / 2;
    baseY = (canvasElm.height - boardSize) / 2;

    boardRange = newRange(baseX, baseY, baseX + boardSize, baseY + boardSize);
}

//背景描画
updates["background"] = function () {
    fillRect("#aaa", 0, 0, canvasElm.width, canvasElm.height);
}

updates["board"] = function () { //ボード描画


    fillRect("green", baseX, baseY, boardSize, boardSize); //ボードの背景描画

    //マス目描画
    for (let i = 0; i < sideTileNum + 1; i++) {
        const offset = tileSize * i;

        drawLine("#fff", baseX, baseY + offset, baseX + boardSize, baseY + offset); //横ラインを描画
        drawLine("#fff", baseX + offset, baseY, baseX + offset, baseY + boardSize); //縦ラインを描画     
    }
}


updates["stone"] = function () {
    for (let y = 0; y < board.length; y++) {
        for (let x = 0; x < board.length; x++) {
            let stone = board[y][x];
            if (stone == "") continue;

            let posX = baseX + tileSize * stone.x;
            let posY = baseY + tileSize * stone.y;
            if (stone.isBlack) drawImg("img/黒石.png", posX, posY, tileSize, tileSize);
            else drawImg("img/白石.png", posX, posY, tileSize, tileSize);
        }
    }

    checkGameEnd();
}

updates["turnPlayer"] = function () {
    if (nextIsBlack) fillText("black", "黒の番", 0, 0);
    else fillText("black", "白の番", 0, 0);

    if (nextPlayer == "cpu") cpuAction();
}