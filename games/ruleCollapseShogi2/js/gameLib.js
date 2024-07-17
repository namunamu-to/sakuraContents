document.body.innerHTML += `<canvas id="canvasElm"></canvas>`;
let ctx = canvasElm.getContext("2d");
let updates = {};
let imgs = {};

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

//処理更新
setInterval(() => {
    ctx.clearRect(0, 0, canvasElm.width, canvasElm.height);
    let keys = Object.keys(updates);
    for (let key of keys) {
        updates[key]();
    }
}, 1000 / 60);

updates.drawCanvas = () => {
    canvasElm.width = window.innerWidth;
    canvasElm.height = window.innerHeight;
};

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

function readImg(imgPath) {
    if (Object.keys(imgs).includes(imgPath)) return ;
    
    // Canvasに合成したい画像を設定する
    const image = new Image();
    image.src = imgPath;
    imgs[imgPath] = image;
}

function drawImage(imgPath, x1, y1, x2, y2) {
    readImg(imgPath);
    if (!Object.keys(imgs).includes(imgPath)) return;

    //画像描画
    ctx.drawImage(imgs[imgPath], x1, y1, x2, y2);
}

function makeElm(toElm, tagName, id = "", className = "") {
    const elm = document.createElement(tagName);
    elm.setAttribute("class", className);
    elm.setAttribute("id", id);
    toElm.appendChild(elm);

    return elm;
}