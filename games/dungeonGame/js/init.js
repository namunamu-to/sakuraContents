const ctx = canvasElm.getContext("2d");

//元データ定義
const imgDir = "img/";
let itemKinds = [];
let imgs = {
    "stairs": readImg("stairs.png"),
    "forestWall": readImg("forestWall.png"),
    "soilGround": readImg("soilGround.png"),
    "self0": readImg("self0.png"),
    "self1": readImg("self1.png"),
    "slime0": readImg("slime0.png"),
    "slime1": readImg("slime1.png"),
};
const charNames = {
    "self": "私",
    "slime": "ナメクジスライム"
};

//プレイ中の情報定義
let pausing = false;
let spawnedNum = 0;
// let map = [];
let mapSize = 50;
let map = [];
let thingsOnMap = [];
let floorItems = [];
let selfChar;
let nowFloor = 1;
let rooms = [];
let nowWallName = "forestWall";
let nowGroundName = "soilGround";
let nowFloorChars = [];
let nowGold = 0;
let needExp = 5;
let log = [];
let enemySpawnCount = 30;
let animating = false;

//画面情報
let tileSize = 0;
const seeRadius = 5;
const seeDiameter = (seeRadius * 2) + 1;

//方向表すもの
const dirKeys = ["up", "down", "left", "right", "upLeft", "upRight", "downLeft", "downRight"];
const dirs = {
    "up": [0, -1],
    "down": [0, 1],
    "left": [-1, 0],
    "right": [1, 0],
    "upLeft": [-1, -1],
    "upRight": [1, -1],
    "downLeft": [-1, 1],
    "downRight": [1, 1],
}

const digs = {
    "up": 180,
    "down": 0,
    "left": 90,
    "right": 270,
    "upLeft": 135,
    "upRight": 225,
    "downLeft": 45,
    "downRight": 315,
}

function getCharIdxById(id) {
    for (let i = 0; i < nowFloorChars.length; i++) {
        if (id == nowFloorChars[i].id) return i;
    }

    return -1;
}

function getDir(x, y) {
    let dirX = 0;
    let dirY = 0;
    if (x != 0) dirX = x / Math.abs(x);
    if (y != 0) dirY = y / Math.abs(y);

    for (let key of dirKeys) {
        const val = dirs[key];
        if (val[0] == dirX && val[1] == dirY) return key;
    }
}

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
    return parseInt(elm.clientWidth);
}

function getHeight(elm) {
    return parseInt(elm.clientHeight);
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