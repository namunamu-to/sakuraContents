let sideTileNum = 8; //値が8なら8x8のマスが生まれる
let canvasSize = Math.min(window.innerWidth, window.innerHeight) * 0.90;
canvasElm.width = canvasSize;
canvasElm.height = canvasSize;
let tileSize = parseInt(canvasSize / sideTileNum);
const ctx = canvasElm.getContext("2d");