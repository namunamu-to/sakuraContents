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
    const pos = elm.getBoundingClientRect();
    return parseInt(pos.x);
}

function setX(elm, x) {
    elm.style.left = parseInt(x) + "px";
}

function setY(elm, y) {
    elm.style.top = parseInt(y) + "px";
}

function getY(elm) {
    const pos = elm.getBoundingClientRect();
    return parseInt(pos.y);
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

function makeElm(toElm, tagName, id = "", className = "") {
    const elm = document.createElement(tagName);
    elm.setAttribute("class", className);
    elm.setAttribute("id", id);
    toElm.appendChild(elm);

    return elm;
}

function myDialog(msg){
    dialogElm.style.display = "block";
    dialogElm.innerHTML = msg;
}