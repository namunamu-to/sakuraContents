const body = document.body;

//canvas要素追加
(function () {
    body.innerHTML += `<canvas id="canvasElm"></canvas>`;
}());

//canvasの定義
const ctx = canvasElm.getContext("2d");
let draws = {};


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

setInterval(() => { //描画更新
    canvasElm.width = window.innerWidth;
    canvasElm.height = window.innerHeight;
    ctx.clearRect(0, 0, canvasElm.width, canvasElm.height) //キャンバスをクリア
    
    for(let key of Object.keys(draws)){
        draws[key]();
    }

}, 33); //30fps