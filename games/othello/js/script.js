let board = makeTwoDimList(8, "");
board[3][3] = "黒";
board[4][4] = "黒";
board[3][4] = "白";
board[4][3] = "白";

//背景描画
draws.background = () => {
    fillRect("#aaa", 0, 0, canvasElm.width, canvasElm.width);
}

draws.board = () => { //ボード描画
    let sideTileNum = 8; //値が8なら8x8のマスが生まれる
    const boardSize = Math.min(canvasElm.width, canvasElm.height) * 0.95;
    const tileSize = boardSize / sideTileNum;
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


draws.stone = () => {
    // readImg("img/self0.png", "self0");
    for (let y = 0; y < board.length; y++) {
        for (let x = 0; x < board.length; x++) {
            // console.log("aaa");
            // if (board[y][x] == "黒") console.log("黒", x, y);
            // if (board[y][x] == "白") console.log("白", x, y);
            if (board[y][x] == "黒") drawImg("img/黒石.png", canvasElm.width * x, canvasElm.width * y, canvasElm.width / 8, canvasElm.height / 8);
            if (board[y][x] == "白") drawImg("img/白石.png", canvasElm.width * x, canvasElm.width * y, canvasElm.width / 8, canvasElm.height / 8);
        }
    }

    // console.log(imgs);
} 