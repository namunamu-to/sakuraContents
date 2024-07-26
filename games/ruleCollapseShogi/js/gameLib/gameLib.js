document.body.innerHTML += `<div style="position: relative;"><canvas id="canvasElm"></canvas><div>`;
let ctx = canvasElm.getContext("2d");
let updates = {};
let exes = [];
let imgs = {};
let cycledTime = Date.now();
let cycle;
let cycleCnt = 0;
let clicked = {
    x: -1,
    y: -1,
};
let jenerateId = 0;



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

function getRandomInt(min, max) {
    const result = Math.floor(Math.random(new Date()) * (max - min) + min)
    return result;
}

function exeInterval(func, interval) {
    let coolTime = interval;
    updates[jenerateId] = () => {
        coolTime -= cycle;
        if (coolTime < 0) {
            coolTime = interval;
            func();
        }
    };
}

function isPointInRange(checkX, checkY, rangeX1, rangeY1, rangeWidth, rangeHeight) {
    if (checkX < rangeWidth && checkY < rangeHeight && checkX > rangeX1 && checkY > rangeHeight) return true;
    return false;
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

function newDrawInfo(x1, y1, width, height) {
    let drawInfo = {
        x1: x1,
        y1: y1,
        x2: x1 + width,
        y2: y1 + height,
        width: width,
        height: height,
    };

    return drawInfo;
}

function ctxLoop() {
    const nowDate = Date.now();
    cycle = nowDate - cycledTime;
    cycleCnt += cycle;
    cycledTime = nowDate;

    ctx.clearRect(0, 0, canvasElm.width, canvasElm.height);
    let keys = Object.keys(updates);
    for (let key of keys) {
        updates[key]();
    }


    for (let i = 0; i < exes.length; i++) {
        exes[0]();
        exes.splice(0, 1);
    }

    if (cycleCnt > 1000) cycleCnt -= 1000;
    window.requestAnimationFrame(ctxLoop);
}

function newTwoList(ySize, xSize, fillElm) {
    list = [];
    for (let i = 0; i < ySize; i++) list.push(new Array(xSize).fill(fillElm));
    return list;
}

//yesNoダイアログを表示
function showYesNoDialog(msg) {
    yesNoMsg.innerHTML = msg;

    yesNoDialog.style.display = "inline";

    let input = true
    noBtn.addEventListener("click", () => {
        input = false;
        yesNoDialog.style.display = "none";
    });

    yesBtn.addEventListener("click", () => {
        yesNoDialog.style.display = "none";
    });

    return input;
}

function fillRect(color, fromX, fromY, toX, toY) {
    ctx.fillStyle = color;
    ctx.fillRect(fromX, fromY, toX, toY);
}

function lineTo(x1, y1, x2, y2) {
    ctx.beginPath(); // 新しいパスを開始
    ctx.moveTo(x1, y1); // ペンを (30, 50) へ移動
    ctx.lineTo(x2, y2); // 直線を (150, 100) へ描く
    ctx.stroke(); // パスを描画
}

function fillText(text = "", x, y, fontSize = 10) {
    ctx.font = fontSize + "px serif";
    width = fontSize * text.length;
    fillRect("#fff", x, y, width, fontSize);
    ctx.textBaseline = "top";
    ctx.fillStyle = "#000";
    ctx.fillText(text, x + (width / 5), y, width);
}

function readImg(imgPath) {
    if (Object.keys(imgs).includes(imgPath)) return;

    // Canvasに合成したい画像を設定する
    const image = new Image();
    image.src = imgPath;
    imgs[imgPath] = image;
}

function drawImage(imgPath, x1, y1, width, height, dir = "down") {
    readImg(imgPath);
    if (!Object.keys(imgs).includes(imgPath)) return;

    //画像描画
    ctx.save();
    ctx.translate(x1 + width / 2, y1 + height / 2);
    ctx.rotate(Math.PI / 180 * digs[dir]);
    ctx.drawImage(imgs[imgPath], -width / 2, -height / 2, width, height);
    ctx.restore();
}

function makeElm(toElm, tagName, id = "", className = "") {
    const elm = document.createElement(tagName);
    elm.setAttribute("class", className);
    elm.setAttribute("id", id);
    toElm.appendChild(elm);

    return elm;
}

canvasElm.addEventListener("click", (e) => {
    clicked.x = e.offsetX;
    clicked.y = e.offsetY;
});

//処理更新
window.requestAnimationFrame(ctxLoop);

updates.drawCanvas = () => {
    canvasElm.width = window.innerWidth;
    canvasElm.height = window.innerHeight;
};