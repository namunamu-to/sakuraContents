function getDrawRange() {
    const x1 = selfChar.x - seeRadius;
    const x2 = selfChar.x + seeRadius;
    const y1 = selfChar.y - seeRadius;
    const y2 = selfChar.y + seeRadius;

    return [x1, x2, y1, y2];
}

function getCtxPos(x, y) {
    const [x1, x2, y1, y2] = getDrawRange();

    let xPos = (x - x1) * tileSize;
    let yPos = (y - y1) * tileSize;

    return [xPos, yPos];
}

function drawChar(char) {
    let [posX, posY] = getCtxPos(char.x, char.y);
    if (char.isEnemy == false) { //自身だったら描画座標を真ん中にする
        const ctxCenterX = canvasElm.width / 2;
        const ctxCenterY = canvasElm.height / 2;
        posX = ctxCenterX - (tileSize / 2);
        posY = ctxCenterY - (tileSize / 2);
    }

    //キャラにオフセットがあればずらす
    posX += char.offsetX;
    posY += char.offsetY;

    ctx.save();
    ctx.translate(posX + tileSize / 2, posY + tileSize / 2);
    ctx.rotate(Math.PI / 180 * digs[char.dir]);
    drawTileSizeImg(char.kind + char.nowFrame, -tileSize / 2, -tileSize / 2);
    ctx.restore();
}

function drawTileSizeImg(imgKey, xPos, yPos) {
    const img = imgs[imgKey];
    ctx.drawImage(img, 0, 0, img.width, img.height, xPos, yPos, tileSize, tileSize);
}

function drawArround() {
    const [x1, x2, y1, y2] = getDrawRange();

    for (let y = y1; y <= y2 + 1; y++) {
        for (let x = x1; x <= x2 + 1; x++) {
            const upLeftNotOver = x >= 0 && y >= 0;
            const downRightNotOver = x < mapSize && y < mapSize;

            //地形描画
            if (upLeftNotOver && downRightNotOver) drawTile(map[y][x], x, y);
            else drawTile("wall", x, y);

        }
    }

    //キャラ描画
    for (let char of nowFloorChars) {
        if (char.nowFrame >= char.frames.length) char.nowFrame = 0;
        drawChar(char);
    }
}


function drawTile(tileName, x, y) {
    const [xPos, yPos] = getCtxPos(x, y);
    if (tileName == "wall") drawTileSizeImg(nowWallName, xPos, yPos);
    else if (tileName == "ground") drawTileSizeImg(nowGroundName, xPos, yPos);
    else if (tileName == "stairs") {
        drawTileSizeImg(nowGroundName, xPos, yPos);
        drawTileSizeImg(tileName, xPos, yPos);
    }
}

function drawStatus() {
    const floor = nowFloor + "F";
    const lv = "Lv" + selfChar.lv;
    const next = "必要経験値：" + needExp;
    const hp = "HP" + selfChar.hp + "/" + selfChar.maxHp;
    const gold = nowGold + "G";
    const showText = `${floor}　${lv}　${hp}　${gold}　${next}`;
    ctx.font = "50px sans-serif";
    ctx.fillStyle = "#fff";
    ctx.fillText(showText, 50, 50, 400);
}

function drawPrompt() {
    // ctx.fillStyle = "rgba(169, 169, 112, 0.5)";
    ctx.fillStyle = "rgba(25, 25, 112, 0.7)";
    const x1 = 10;
    const x2 = getWidth(canvasElm) - 20;
    const y1 = getHeight(canvasElm) * 0.75;
    const y2 = getHeight(canvasElm);
    ctx.fillRect(x1, y1, x2, y2);

    //ログ表示
    ctx.font = "20px sans-serif";
    ctx.fillStyle = "#fff";
    let showLog = log;
    if (log.length >= 6) showLog = log.slice(log.length - 5);
    for (let i = 0; i < showLog.length; i++) {
        ctx.fillText(showLog[i], x1 + 30, y1 + 30 + i * 30, x2 - 10);
    }
}

function drawAttackMotion(char) {
    animating = true;

    const [xDir, yDir] = dirs[char.dir];
    let vx = parseInt(tileSize / 10) * xDir;
    let vy = parseInt(tileSize / 10) * yDir;

    let i = 0;
    const intervalId = setInterval(() => {
        i++;
        if (i < 10) { //少しずつ動く
            char.offsetX += vx;
            char.offsetY += vy;
        } else if (i < 20) {
            char.offsetX -= vx;
            char.offsetY -= vy;
        } else { //位置を元に戻し、アニメーションを終了
            char.offsetX = 0; 
            char.offsetY = 0;
            animating = false;
            clearInterval(intervalId);
        }
    }, 5);
}

function myDialog(msg, displayTime = -1, width = getWidth(canvasElm), height = getHeight(canvasElm)) {
    setSize(dialogElm, width, height);
    dialogElm.style.display = "block";
    dialogElm.innerHTML = `<div class="alignCenter">${msg}</div>`;

    if (displayTime > 0) {
        setTimeout(() => {
            dialogElm.style.display = "none";
        }, displayTime);
    }
}