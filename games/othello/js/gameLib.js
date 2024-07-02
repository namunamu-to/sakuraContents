let imgs = {};
let draws = {};
let fps = 30;

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

function fillText(color, text, x, y, ){
    ctx.fillStyle = color;
    ctx.fillText(text, x, y);
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
    console.log(imgPath);
    if(imgs[imgPath] == undefined) readImg(imgPath); //読み込んでいなかったら
    else if(imgs[imgPath] == "reading") return; 
    else ctx.drawImage(imgs[imgPath], x1, y1, width, height); //読み込んでたら
}

function makeTwoDimList(size, fillElm){
    list = [];
    for (let i = 0; i < size; i++) list.push(new Array(size).fill(fillElm));
    return list;
}



//canvasの定義
(function () { //要素追加
    document.body.innerHTML += `<canvas id="canvasElm"></canvas>`;
}());

const ctx = canvasElm.getContext("2d");

setInterval(() => { //描画更新
    canvasElm.width = window.innerWidth;
    canvasElm.height = window.innerHeight;
    ctx.clearRect(0, 0, canvasElm.width, canvasElm.height) //キャンバスをクリア
    
    for(let key of Object.keys(draws)){
        draws[key]();
    }

}, 1000 / fps);

