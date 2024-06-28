const ctx = canvasElm.getContext("2d");

//元データ定義
const imgDir = "img/";
let itemKinds = [];
// let charLists = [
//     { name: "myName", img: readImg("self_front.png"), x, y, hp, atk, isEne }
// ];
let imgs = {
    "stairs": readImg("stairs.png"),
    "forestWall": readImg("forestWall.png"),
    "soilGround": readImg("soilGround.png"),
};

//プレイ中の情報定義
let pausing = false;
let map = [];
let mapSize = 50;
let floorItems = [];
let floorEnemys = [];
let useChar = [];
let nowX;
let nowY;
let nowFloor = 1;
let rooms = [];
let nowWallName = "forestWall";
let nowGroundName = "soilGround";

//画面情報
let teamSetUpHtml = ``;
let seeArroundHtml = ``;
let nowSceneHtml = teamSetUpHtml;
let tileSize;
const seeRadius = 5;
const seeDiameter = (seeRadius * 2) + 1;

function readImg(imgFilename) {
    const img = new Image();
    img.src = imgDir + imgFilename;
    return img;
}

// 矩形の位置とサイズを表すクラス
function makeRectRange(x1, y1, x2, y2) {
    return {
        x1: x1,
        y1: y1,
        x2: x2,
        y2: y2,
        width: x2 - x1,
        height: y2 - y1,
    }
}

function getWidth(elm) {
    return parseInt(elm.clientWidth)
}

function getHeight(elm) {
    return parseInt(elm.clientHeight)
}

function setWidth(elm, width) {
    elm.style.width = width + "px";
}

function setHeight(elm, height) {
    elm.style.height = height + "px";
}

function setSize(elm, width, height) {
    setWidth(elm, width);
    setHeight(elm, height);
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

function updateTileSize(size) {
    tileSize = Math.min(getWidth(canvasElm), getHeight(canvasElm)) / size;
    tileSize = Math.floor(tileSize);
}

function makeCharInfo(name, img, maxHp, atk, isEnemy) {
    return {
        name: "myName",
        nowDir : "front",
        x: x,
        y: x,
        maxHp: maxHp,
        hp: maxHp,
        atk: atk,
        isEnemy: isEnemy
    }
}




function fillRect(style, startX, startY, endX, endY) {
    ctx.fillStyle = style;
    ctx.fillRect(startX, startY, endX, endY);
}

function roomConnectBr(rect, divLine, hr) {
    if (hr) {
        //rectの左端と境界線までの距離が、rectの左端と境界線までの距離より小さければ、左端が境界線に近い
        const nearSideX = Math.abs(divLine - rect.x1) < Math.abs(divLine - rect.x2) ? rect.x1 : rect.x2;
        const x1 = Math.min(nearSideX, divLine);
        const x2 = Math.max(nearSideX, divLine);

        //境界線までの通路を作成
        const y = getRandomInt(rect.y1, rect.y2);
        for (let x = x1; x <= x2; x++) {
            map[y][x] = "ground";
        }

        return y;
    } else {
        //rectの左端と境界線までの距離が、rectの左端と境界線までの距離より小さければ、左端が境界線に近い
        const nearSideY = Math.abs(divLine - rect.y1) < Math.abs(divLine - rect.y2) ? rect.y1 : rect.y2;
        const y1 = Math.min(nearSideY, divLine);
        const y2 = Math.max(nearSideY, divLine);

        //境界線までの通路を作成
        const x = getRandomInt(rect.x1, rect.x2);
        for (let y = y1; y <= y2; y++) {
            map[y][x] = "ground";
        }

        return x;

    }
}

function connectRoom(rect1, rect2, divLine, hr) {
    if (hr) { //水平に並んでいる場合
        const y1Tmp = roomConnectBr(rect1, divLine, hr);
        const y2Tmp = roomConnectBr(rect2, divLine, hr);
        let y1 = Math.min(y1Tmp, y2Tmp);
        let y2 = Math.max(y1Tmp, y2Tmp);

        for (let y = y1; y <= y2; y++) map[y][divLine] = "ground";
    } else {
        const x1Tmp = roomConnectBr(rect1, divLine, hr);
        const x2Tmp = roomConnectBr(rect2, divLine, hr);
        let x1 = Math.min(x1Tmp, x2Tmp);
        let x2 = Math.max(x1Tmp, x2Tmp);

        for (let x = x1; x <= x2; x++) map[divLine][x] = "ground";

    }
}


function makeRoom(rect) {
    let x1;
    let y1;
    let x2;
    let y2;

    // 指定された領域の中の4点を決定する
    for (let i = 0; i < 50; i++) {
        x1 = getRandomInt(rect.x1 + 1, rect.x2 - 1);
        y1 = getRandomInt(rect.y1 + 1, rect.y2 - 1);
        x2 = getRandomInt(x1 + 1, rect.x2 - 1);
        y2 = getRandomInt(y1 + 1, rect.y2 - 1);

        if ((x2 - x1 > 3) && (y2 - y1 > 3)) break;
    }

    // マップデータに部屋を反映
    for (let i = y1; i < y2; i++) {
        for (let j = x1; j < x2; j++) {
            map[i][j] = "ground";
        }
    }

    // 部屋の矩形領域を返す
    return makeRectRange(x1, y1, x2, y2);
}

// 整数の乱数を取得
function getRandomInt(min = 0, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function fillMapWall() {
    map = [];
    for (let y = 0; y < mapSize; y++) { //フロア全体を壁で塗りつぶす
        let line = [];
        for (let x = 0; x < mapSize; x++) {
            line.push("wall");
        }

        map.push(line);
    }
}

function makeRooms() {
    //9つの部屋作成
    const sectionSize = parseInt(mapSize / 3);
    rooms = [];
    for (let y = 0; y < 3; y++) {
        let line = [];
        for (let x = 0; x < 3; x++) {
            const x1 = x * sectionSize;
            const x2 = x1 + sectionSize;
            const y1 = y * sectionSize;
            line.push(makeRoom(makeRectRange(x1, y1, x2, y1 + sectionSize)));
        }

        rooms.push(line);
    }
}

function connectRooms() {
    //通路を繋げる
    for (let y = 0; y < 3; y++) {
        // 縦を繋げる場所を表現
        let isConnectY;
        for (; ;) {
            isConnectY = [];
            for (let i = 0; i < 3; i++) isConnectY.push(getRandomInt(0, 2) == 1)

            if (isConnectY.includes(true)) break;
        }

        //部屋同士を繋げる
        for (let x = 0; x < 3; x++) {
            if (x < 2) {
                let r1 = rooms[y][x];
                let r2 = rooms[y][x + 1];
                let dl = parseInt((r1.x2 + r2.x1) / 2);
                connectRoom(r1, r2, dl, true);
            }

            if (y < 2) {
                if (isConnectY[x]) {
                    let r1 = rooms[y][x];
                    let r2 = rooms[y + 1][x];
                    let dl = parseInt((r1.y2 + r2.y1) / 2);
                    connectRoom(r1, r2, dl, false);
                }
            }
        }
    }
}

function makeFloorMap() {
    fillMapWall();
    makeRooms();
    connectRooms();


    const pos = getRandomPos();
    setNowPos(pos[0], pos[1]);
    deployStairs();

    drawMoveFloor();
}

function drawMap() {
    for (let y = 0; y < map.length; y++) {
        const line = map[y];
        for (let x = 0; x < line.length; x++) {
            const x1Pos = x * tileSize;
            const y1Pos = y * tileSize;


            drawTile(line[x], x1Pos, y1Pos)
        }
    }

}

function getRandomPos() {
    for (; ;) {
        const x = getRandomInt(0, mapSize);
        const y = getRandomInt(0, mapSize);
        if (map[y][x] == "ground") {
            return [x, y];
        }
    }
}

function drawArround() {
    // const showMap = [];

    const x1 = nowX - seeRadius;
    const x2 = nowX + seeRadius;
    const y1 = nowY - seeRadius;
    const y2 = nowY + seeRadius;

    for (let y = y1; y <= y2 + 1; y++) {
        const line = map[y];
        for (let x = x1; x <= x2 + 1; x++) {
            const upLeftNotOver = x >= 0 && y >= 0;
            const downRightNotOver = x < mapSize && y < mapSize;
            const x1Pos = (x - x1) * tileSize;
            const y1Pos = (y - y1) * tileSize;

            if (upLeftNotOver && downRightNotOver) {
                drawTile(line[x], x1Pos, y1Pos);
            }

        }
    }

}

function drawTileSizeImg(tileName, xPos, yPos) {
    ctx.drawImage(imgs[tileName], xPos, yPos, tileSize, tileSize);
}

function drawTile(tileName, xPos, yPos) {
    if (tileName == "wall") drawTileSizeImg(nowWallName, xPos, yPos);
    else if (tileName == "ground") drawTileSizeImg(nowGroundName, xPos, yPos);
    else if (tileName == "stairs") {
        drawTileSizeImg(nowGroundName, xPos, yPos);
        drawTileSizeImg(tileName, xPos, yPos);
    }
}


function drawLine(x1, y1, x2, y2) {
    ctx.beginPath();            // 新しいパスを作成
    ctx.lineWidth = 1;      // 線の太さ
    ctx.strokeStyle = "black";    // 線の色
    ctx.moveTo(x1, y1);          // 線の開始座標
    ctx.lineTo(x2, y2);          // 線の終了座標
    ctx.stroke();               // 輪郭を描画
}

function drawSelfChar() {
    const ctxCenterX = canvasElm.width / 2;
    const ctxCenterY = canvasElm.height / 2;
    const x = ctxCenterX - (tileSize / 2);
    const y = ctxCenterY - (tileSize / 2);

    fillRect("red", x, y, tileSize, tileSize);
}

function drawFirstPerson() {
    drawArround();
    drawSelfChar(); //キャラ描画
}

function setNowPos(x = nowX, y = nowY) {
    nowX = x;
    nowY = y;
}

function isCanMove(toX, toY) {
    if (toX < 0 || toY < 0) return false;
    if (toX > map.length - 1 || toY > map.length - 1) return false;
    if (map[toY][toX] == "wall") return false;

    return true;
}

function drawMoveFloor() {
    myDialog(nowFloor + "F", 2000);
}

function deployStairs() {
    for (; ;) {
        const x = getRandomInt(0, mapSize);
        const y = getRandomInt(0, mapSize);

        if (map[y][x] == "ground") {
            map[y][x] = "stairs";
            console.log(x, y);
            return;
        }
    }
}

function main() {
    //キャンバスサイズ調整
    const canvasSize = window.innerHeight * 0.98;
    canvasElm.width = canvasSize;
    canvasElm.height = canvasSize;
    makeFloorMap();

    // updateTileSize(mapSize);
    updateTileSize(seeDiameter);



    //描画更新
    setInterval(() => {
        if (pausing) return;
        ctx.clearRect(0, 0, canvasElm.width, canvasElm.height);
        // drawMap(); //マップを描画
        // drawArround();
        drawFirstPerson();
    }, 33);


}

main();