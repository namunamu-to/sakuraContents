//タイルの定義
draws.background = () => { //背景描画
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

        drawLine("#fff", baseX, baseY+offset, baseX+boardSize, baseY+offset); //横ラインを描画
        drawLine("#fff", baseX+offset, baseY, baseX+offset, baseY+boardSize); //縦ラインを描画     
    }
}