let imgs = {};
let updates = {};
let sprites = [];
let fps = 30;
let jeneratedSprNum = 0;
let clickedX = -1000;
let clickedY = -1000;

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


function newSprite(imgPath, x, y, width, height){
    let spr = {
        id : jeneratedSprNum++,
        imgPath: imgPath,
        x : x,
        y : y,
        width : width,
        height : height,
    }

    return spr;
}

function delSprite(spr){
    for(let i=0; i<sprites.length; i++){
        if(sprites.id == id) sprites.splice(i, 1);
    }
}

// 矩形の位置と範囲を表すクラス
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

function isInnerRange(range, x, y){
    if(x >= range.x1 && y >= range.y1 && x <= range.x2 && y <= range.y2) return true;
    else return false;
}

//方向を取得する関数
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

function fillText(color, text, x, y, fontSize=48){
    ctx.fillStyle = color;
    ctx.font = `${fontSize}px serif`;
    ctx.fillText(text, x, y+fontSize);
}

function fillRect(color, x1, y1, x2, y2) {
    ctx.fillStyle = color;
    ctx.fillRect(x1, y1, x2, y2);
}

function drawLine(color, x, y, x1, y1) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x1, y1);
    ctx.stroke();
}

function rotate(){
    // ctx.save();
    // ctx.translate(posX + tileSize / 2, posY + tileSize / 2);
    // ctx.rotate(Math.PI / 180 * digs[char.dir]);
    // drawTileSizeImg(char.kind + char.nowFrame, -tileSize / 2, -tileSize / 2);
    // ctx.restore();
}

function readImg(imgPath) {
    imgs[imgPath] = "reading";
    const img = new Image();
    img.src = imgPath;
    imgs[imgPath] = img;
    return img;
}

function drawImg(imgPath, x1, y1, width, height){
    if(imgs[imgPath] == undefined) readImg(imgPath); //読み込んでいなかったら
    else if(imgs[imgPath] == "reading") return;
    else ctx.drawImage(imgs[imgPath], x1, y1, width, height); //読み込んでたら
}


function makeTwoDimList(size, fillElm){
    list = [];
    for (let i = 0; i < size; i++) list.push(new Array(size).fill(fillElm));
    return list;
}

function isInnerList(list, idx){
    if(list.length == 0) return false;

    return idx >= 0 && idx < list.length;
}

function isInnerTwoDimList(twoDimList, x, y){
    if(twoDimList.left == 0) return false;
    return isInnerList(twoDimList, y) && isInnerList(twoDimList[y], x);
}

//canvas定義
(function () { //このファイルが読み込まれたら、即時関数でcanvasをdomに追加
    const style = `
        overflow: hidden;
    `;
    document.body.innerHTML += `<canvas id="canvasElm" style=${style}></canvas>`;
}());

const ctx = canvasElm.getContext("2d");

setInterval(() => { //描画更新
    canvasElm.width = window.innerWidth * 0.97;
    canvasElm.height = window.innerHeight * 0.97;
    ctx.clearRect(0, 0, canvasElm.width, canvasElm.height) //キャンバスをクリア
    
    for(let key of Object.keys(updates)){
        updates[key]();
    }

}, 1000 / fps);


canvasElm.addEventListener("click", (e)=>{
    clickedX = e.clientX;
    clickedY = e.clientY;
});
