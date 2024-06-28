let ws = new WebSocket("wss://galleon.yachiyo.tech/azInputGame/cmd");
let pausing = true;
let highScore = 0;
let azList = "abcdefghijklmnopqrstuvwxyz";
let nextKey = azList[0];
let nextIdx = 0;