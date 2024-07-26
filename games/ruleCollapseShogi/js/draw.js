let boardOffsetX = 0;
let boardOffsetY = 0;
let boardDrawInfo;

updates.background = () => {
    // let endX = parseInt(window.innerWidth / tileSize + 1);
    // let endY = parseInt(window.innerHeight / tileSize + 1);
    // let imgPath = imgDir + "青タイル2.png";
    // readImg(imgPath);
    // imgs[imgPath]
    // let imageSize = { width: imgs[imgPath].width, height: imgs[imgPath].height }
    // for (let y = 0; y < endY; y++) {
    //     let posY = y * tileSize;

    //     for (let x = 0; x < endX; x++) {
    //         let posX = x * tileSize;

    //         drawImage(imgPath, posX, posY, imageSize.width, imageSize.height);
    //     }

    // }
};

updates.board = () => {
    let oneSidePx = Math.min(window.innerWidth, window.innerHeight) * 0.90;
    boardDrawInfo = newDrawInfo((window.innerWidth - oneSidePx) / 2, (window.innerHeight - oneSidePx) / 2, oneSidePx, oneSidePx);

    tileSize = Math.min(boardDrawInfo.width, boardDrawInfo.height) / 9;

    // for (let y = 0; y < boardSize; y++) {
    //     for (let x = 0; x < boardSize; x++) drawImage(imgDir + "黄タイル.png", boardDrawInfo.x1 + x * tileSize, boardDrawInfo.y1 + y * tileSize, tileSize, tileSize);
    // }

    let bdi = boardDrawInfo;
    fillRect("#ffebcd", bdi.x1, bdi.y1, bdi.width, bdi.height);
    for (let y = 0; y < boardSize+1; y++) {
        let yPos = bdi.y1 + (y * tileSize);
        lineTo(bdi.x1, yPos, bdi.x2, yPos);
    }

    for (let x = 0; x < boardSize+1; x++) {
        let xPos = bdi.x1 + (x * tileSize);
        lineTo(xPos, bdi.y1, xPos, bdi.y2);
    }

};

updates.pieces = () => {
    for (let y = 0; y < nowBoard.length; y++) {
        for (let x = 0; x < nowBoard.length; x++) {
            const onSpace = nowBoard[y][x]
            if (onSpace == "") continue;

            const imgPath = imgDir + onSpace.kind + ".png";

            const drawDir = onSpace.isEnemy ? "up" : "down";
            const drawX = boardDrawInfo.x1 + x * tileSize;
            const drawY = boardDrawInfo.y1 + y * tileSize;

            drawImage(imgPath, drawX, drawY, tileSize * 0.95, tileSize * 0.95, dir = drawDir);


            //クールタイム表示
            if (!pausing) onSpace.coolDown -= cycle;;
            if (onSpace.coolDown > 0) fillText(String(parseInt(onSpace.coolDown / 1000)), drawX, drawY, tileSize / 3);
        }
    }
};

updates.canMoveTiles = () => {
    for (let canMove of canMoves) fillRect("rgba(135, 206, 250, 0.5)", boardDrawInfo.x1 + canMove[0] * tileSize, boardDrawInfo.y1 + canMove[1] * tileSize, tileSize, tileSize);
};
