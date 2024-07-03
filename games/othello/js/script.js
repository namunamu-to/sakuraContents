let board = makeTwoDimList(8, "");
let boardSize;
let boardRange;
let sideTileNum; //値が8なら8x8のマスが生まれる
let tileSize;
let baseX = 0;
let baseY = 0;
let stones = [];
let nextIsBlack = true;

function putStone(isBlack, x, y) {
    let stone = {
        isBlack: isBlack,
        x: x,
        y: y,
    };

    board[y][x] = stone;
    nextIsBlack = !nextIsBlack;
}

putStone(true, 3, 3);
putStone(true, 4, 4);
putStone(false, 3, 4);
putStone(false, 4, 3);


// function getCanPuts(x, y){
//     let canPuts = [];
//     for(let dirKey of dirKeys){
//         for(let i=0; i<sideTileNum.length; i++){
//             let checkX = x + dirs[dirKey][0];
//             let checkY = y + dirs[dirKey][1];
//             if(checkX < 0 || checkY < 0 || checkX >= sideTileNum || checkY >= sideTileNum) continue; //盤面外なら
//             if(checkX < 0) continue;
//         }
//     }
// }

function findStoneCanReverse(x, y, dir){
    let i = y;
    let j = x;

    

}

function checkCanPut(x, y){
    const tile = board[y][x];
    if(x < 0 || y < 0 || x >= sideTileNum || y >= sideTileNum) return false; //盤面外
    else if(tile != "") return true;

    return true;
}

updates["boardInfo"] = function(){
    boardSize = Math.min(canvasElm.width, canvasElm.height) * 0.95;
    sideTileNum = 8; //値が8なら8x8のマスが生まれる
    tileSize = boardSize / sideTileNum;

    baseX = (canvasElm.width - boardSize) / 2;
    baseY = (canvasElm.height - boardSize) / 2;

    boardRange = makeRectRange(baseX, baseY, baseX+boardSize, baseY+boardSize);
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
            if(stone == "") continue;

            let posX = baseX + tileSize * stone.x;
            let posY = baseY + tileSize * stone.y;
            if (stone.isBlack) drawImg("img/黒石.png", posX, posY, tileSize, tileSize);
            else drawImg("img/白石.png", posX, posY, tileSize, tileSize);
        }
    }
}