//タイルの定義
draws.background = () => { //背景描画
    fillRect("#aaa", 0, 0, canvasElm.width, canvasElm.width);
}


draws.tile = () => { //ボード描画
    let sideTileNum = 8; //値が8なら8x8のマスが生まれる
    const boardSize = Math.min(canvasElm.width, canvasElm.height) * 0.95;
    const tileSize = boardSize / sideTileNum;
    const startX = (canvasElm.width - boardSize) / 2;
    const startY = (canvasElm.height - boardSize) / 2;
    
    for (let i = 0; i < sideTileNum + 1; i++) {
        const offset = tileSize * i;

        drawLine("#fff", 0, offset, boardSize, offset); //横ラインを描画
        drawLine("#fff", offset, 0, offset, boardSize); //縦ラインを描画     
    }
}