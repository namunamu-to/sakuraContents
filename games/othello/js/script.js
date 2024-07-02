let board = makeTwoDimList(8, "");
let boardSize;
let sideTileNum; //値が8なら8x8のマスが生まれる
let tileSize;


board[3][3] = "黒";
board[4][4] = "黒";
board[3][4] = "白";
board[4][3] = "白";

//背景描画
draws["background"] = function() {
    fillRect("#aaa", 0, 0, canvasElm.width, canvasElm.width);
}

draws["board"] = function() { //ボード描画
    boardSize = Math.min(canvasElm.width, canvasElm.height) * 0.95;
    sideTileNum = 8; //値が8なら8x8のマスが生まれる
    tileSize = boardSize / sideTileNum;

    const baseX = (canvasElm.width - boardSize) / 2;
    const baseY = (canvasElm.height - boardSize) / 2;

    fillRect("green", baseX, baseY, boardSize, boardSize); //ボードの背景描画

    //マス目描画
    for (let i = 0; i < sideTileNum + 1; i++) {
        const offset = tileSize * i;

        drawLine("#fff", baseX, baseY + offset, baseX + boardSize, baseY + offset); //横ラインを描画
        drawLine("#fff", baseX + offset, baseY, baseX + offset, baseY + boardSize); //縦ラインを描画     
    }
}


draws["stone"] = function() {
    baseX = (canvasElm.width - boardSize) / 2;
    baseY = (canvasElm.height - boardSize) / 2;
    for (let y = 0; y < board.length; y++) {
        for (let x = 0; x < board.length; x++) {
            let posX = baseX + tileSize * x;
            let posY = baseY + tileSize * y;
            if (board[y][x] == "黒") drawImg("img/黒石.png", posX, posY, tileSize, tileSize);
            if (board[y][x] == "白") drawImg("img/白石.png", posX, posY, tileSize, tileSize);
        }
    }
} 