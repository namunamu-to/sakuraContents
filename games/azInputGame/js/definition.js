let ws = new WebSocket("wss://galleon.yachiyo.tech/commonGameServer/azInputGame");
console.log("aaa");
let pausing = true;
let highScore = 0;
let azList = "abcdefghijklmnopqrstuvwxyz";
let nextKey = azList[0];
let nextIdx = 0;