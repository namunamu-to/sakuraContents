const body = document.body;

//canvas要素追加
(function () {
    const addHtml = `<canvas id="canvasElm"></canvas>`;
    body.innerHTML += addHtml;
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
    for(let key of Object.keys(draws)){
        draws[key]();
        console.log(draws[key]);
    }

}, 33); //30fps


//dialogの設定
(function () {
    const style = `
        padding: 1rem;
        font-size: 3rem;
        width: fit-content;
        height: fit-content;
        background-color: #fff;
        margin: auto;
        display: none;
        text-align: center;
        top: 0;
        left: 0;
    `;

    const addHtml = `<div class="position-fixed border border-dark dialogElm" id="showDialogElm" style="${style}"></div>`;
    body.innerHTML += addHtml;
}());


function dialog(innerHTML = "") {
    if (innerHTML == "") {
        showDialogElm.style.display = "none";
        return;
    }

    showDialogElm.style.display = "block";
    showDialogElm.innerHTML = innerHTML;
}