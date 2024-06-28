const canvasId = "canvas";
let canvas;
let parentElm;
let context;

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

function getX(elm) {
    return parseInt(elm.style.left);
}

function setX(elm, x) {
    elm.style.left = parseInt(x) + "px";
}

function setY(elm, y) {
    elm.style.top = parseInt(y) + "px";
}

function getY(elm) {
    return parseInt(elm.style.top);
}

function setPosition(elm, toX, toY){
    setX(elm, toX);
    setY(elm, toY);
}

function getCenterX(elm) {
    let x = getX(elm);
    x += parseInt(x / 2);
    return x;
}

function getCenteryY(elm) {
    let y = getY(elm);
    y += parseInt(y / 2);
    return y;
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


function makeCanvas(toElm, width, height) {
    canvas = makeElm(toElm, "canvas", canvasId);
    parentElm = toElm;
    parentElm.style.display = "inline-block";
    setSize(canvas, width, height);

    context = canvas.getContext("2d");

    return canvas;
}

function fillRect(color, fromX, fromY, toX, toY) {
    context.fillStyle = color;
    context.fillRect(fromX, fromY, toX, toY);
}

function drawImage(imgPath, fromX, fromY, toX, toY) {
    // Canvasに合成したい画像を設定する
    const image = new Image();
    image.src = imgPath;

    //画像描画
    image.addEventListener("load", ()=>{
        context.drawImage(image, fromX, fromY, toX, toY);
    });
}

function makeElm(toElm, tagName, id = "", className = "") {
    const elm = document.createElement(tagName);
    elm.setAttribute("class", className);
    elm.setAttribute("id", id);
    toElm.appendChild(elm);

    return elm;
}


function move() {

}

function moveTo() {

}

function changeImg() {

}

function runSprite() {

}

function splitSprite() {

}