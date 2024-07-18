let boardOffsetX = 0;
let boardOffsetY = 0;
let boardDrawInfo; 

updates.background = () =>{
    // drawImage();
};

updates.board = () => {
    let oneSidePx = Math.min(window.innerWidth, window.innerHeight) * 0.90;
    boardDrawInfo = newDrawInfo((window.innerWidth - oneSidePx) / 2, (window.innerHeight - oneSidePx) / 2, oneSidePx, oneSidePx);
    
    tileSize = Math.min(boardDrawInfo.width, boardDrawInfo.height) / 9;

    for (let y = 0; y < boardSize; y++) {
        for (let x = 0; x < boardSize; x++) drawImage(imgDir+"黄タイル.png", boardDrawInfo.x1 + x * tileSize, boardDrawInfo.y1 + y * tileSize, tileSize, tileSize);
    }
};

updates.pieces = () => {
    for (let y = 0; y < nowBoard.length; y++) {
        for (let x = 0; x < nowBoard.length; x++) {
            const onSpace = nowBoard[y][x]
            if (onSpace == "") continue;

            const imgPath = imgDir + onSpace.kind + ".png";
            
            const drawDir = onSpace.isEnemy ? "up" : "down";
            const drawX = boardDrawInfo.x1+x*tileSize;
            const drawY = boardDrawInfo.y1+y*tileSize;
            
            drawImage(imgPath, drawX, drawY, tileSize*0.95, tileSize*0.95, dir=drawDir);


            //クールタイム表示
            onSpace.coolDown -= cycle;
            if(onSpace.coolDown <= 0) onSpace.coolDown = pieceStatus[onSpace.kind].coolDown;
            fillText(parseInt(onSpace.coolDown / 1000), drawX, drawY);
            // console.log(onSpace.coolDown / 1000);
        }
    }
};

updates.canMoveTiles = ()=>{
    for(let canMove of canMoves) fillRect("rgba(135, 206, 250, 0.5)", boardDrawInfo.x1+canMove[0]*tileSize, boardDrawInfo.y1+canMove[1]*tileSize, tileSize, tileSize);
};
