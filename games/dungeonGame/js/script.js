function updateTileSize(size = seeDiameter) {
    tileSize = Math.min(getWidth(canvasElm), getHeight(canvasElm)) / size;
    tileSize = Math.floor(tileSize);
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

function makeMapSizeList(fillElm) {
    list = [];
    for (let i = 0; i < mapSize; i++) list.push(new Array(50).fill(fillElm));
    return list;
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

function moveChar(char, moveX, moveY) {
    char.dir = getDir(moveX, moveY);
    char.x += moveX;
    char.y += moveY;
}

function moveToChar(char, toX, toY) {
    const moveX = toX - char.x;
    const moveY = toY - char.y;

    moveChar(char, moveX, moveY);
}

function makeFloorMap() {
    map = makeMapSizeList("wall");
    thingsOnMap = makeMapSizeList("");
    makeRooms();
    connectRooms();
    nowFloorChars = [selfChar];

    //味方配置
    let pos = getRandomPos();
    selfChar.x = pos[0];
    selfChar.y = pos[1];

    //敵配置
    for (let i = 0; i < getRandomInt(5, 10); i++) {
        spawnEnemy();
    }

    //キャラのフレーム切り替え
    for (let char of nowFloorChars) {
        setInterval(() => {
            char.nowFrame += 1;
            if (char.nowFrame >= char.frames.length) char.nowFrame = 0;
        }, char.duration);
    }

    deployStairs(); //階段配置
    myDialog(nowFloor + "F", 2000); //階層移動表示
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

function isCanMove(toX, toY) {
    if (toX < 0 || toY < 0) return false;
    if (toX >= mapSize || toY >= mapSize) return false;
    if (map[toY][toX] == "wall") return false;

    for (let char of nowFloorChars) {
        if (char.x == toX && char.y == toY) return false;
    }

    return true;
}

function lvUp(char){
    char.lv += 1;
    char.maxHp += getRandomInt(3, 5);
    char.hp = char.maxHp;
    char.atk += getRandomInt(1, 3);
}

function spawnEnemy(){
    pos = getRandomPos();
    const enemy = makeChar("slime", pos[0], pos[1], 5, 2, "down", 500, true, [imgs.slime0, imgs.slime1]);
    for(let i=0; i<nowFloor-1; i++) lvUp(enemy); //階層に応じて強くする
    nowFloorChars.push(enemy);
}

function deployStairs() {
    for (; ;) {
        const x = getRandomInt(0, mapSize);
        const y = getRandomInt(0, mapSize);

        if (map[y][x] == "ground") {
            map[y][x] = "stairs";
            return;
        }
    }
}

function refresh() {
    if (pausing) return;
    ctx.clearRect(0, 0, canvasElm.width, canvasElm.height);
    drawArround();
    drawStatus();
    drawPrompt();
}

function makeChar(kind, x, y, maxHp, atk, dir, duration, isEnemy, frames = []) {
    return {
        kind: kind,
        name: charNames[kind],
        x: x,
        y: y,
        offsetX: 0,
        offsetY: 0,
        maxHp: maxHp,
        hp: maxHp,
        atk: atk,
        dir: dir,
        duration: duration,
        isEnemy: isEnemy,
        frames: frames,
        nowFrame: 0,
        lv: 1,
        id: spawnedNum++,
    };
}

function main() {
    //キャンバスサイズ調整
    const canvasSize = window.innerHeight * 0.98;
    canvasElm.width = canvasSize;
    canvasElm.height = canvasSize;
    updateTileSize();

    selfChar = makeChar("self", 0, 0, 20, 2, "down", 500, false, [imgs.self0, imgs.self0]);

    makeFloorMap();

    setInterval(refresh, 33);
}

main();