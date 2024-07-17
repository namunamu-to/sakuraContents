const ws = new WebSocket('wss://galleon.yachiyo.tech/commonGameServer/shogi');

//ゲームボードの設定
//初期配置の位置を定義
let startBoard = [
    ["香車", "桂馬", "銀将", "金将", "王将", "金将", "銀将", "桂馬", "香車"],
    ["", "飛車", "", "", "", "", "", "角行", ""],
    ["歩兵", "歩兵", "歩兵", "歩兵", "歩兵", "歩兵", "歩兵", "歩兵", "歩兵"],
    ["", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", ""],
    ["歩兵", "歩兵", "歩兵", "歩兵", "歩兵", "歩兵", "歩兵", "歩兵", "歩兵"],
    ["", "角行", "", "", "", "", "", "飛車", ""],
    ["香車", "桂馬", "銀将", "金将", "王将", "金将", "銀将", "桂馬", "香車"],
];

//盤面の状況を表す配列作成
let boardSize = 9
let nowBoard = newTwoList(boardSize, boardSize, "");


//必須な変数を定義
//1マスの定義
let tileSize = 0;
let pausing = true; //ポーズフラグ
let imgDir = "img/"

updates.board = () => {
    tileSize = Math.min(canvasElm.width, canvasElm.height) / 9;
    const imgFiles = ["赤タイル.png", "黄タイル.png", "青タイル.png"]; 

    //タイル描画
    for(let y=0; y<boardSize; y++){
        const imgPath = imgDir + imgFiles[Math.floor(y/3)];
        for(let x=0; x<boardSize; x++) drawImage(imgPath, x*tileSize, y*tileSize, tileSize, tileSize);
    }
};


//難易度選択
for (let i = 1; i <= 14; i++) {
    let optHtml = `<option value="${i}">Lv${i}</option>`;
    easyLvElm.innerHTML += optHtml;
}