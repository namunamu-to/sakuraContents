//タイルの定義
draws.background = () => { //背景描画
    fillRect("green", 0, 0, canvasElm.width, canvasElm.width);
}


draws.tile = () => { //マス目描画
    let sideTileNum = 8; //値が8なら8x8のマスが生まれる
    const boardSize = Math.min(canvasElm.width, canvasElm.height) * 0.95;
    let tileSize = boardSize / sideTileNum;

    for (let i = 0; i < sideTileNum + 1; i++) {
        drawLine("#fff", 0, tileSize * i, canvasElm.width, tileSize * i); //縦ラインを描画
        drawLine("#fff", tileSize * i, 0, tileSize * i, canvasElm.width); //横ラインを描画     
    }

}

// dialog("テスト");