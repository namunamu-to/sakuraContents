const gameBoard = document.getElementById("gameBoard");

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
let nowBoard;
function initNowBoard(){
    nowBoard = [];

    for(let y=0; y<9; y++){
        let list = [];
        for(let x=0; x<9; x++){
            list.push("");
        }
        
        nowBoard.push(list);
    }
}
initNowBoard();

//必須な変数を定義
//1マスの定義
const gameBoardSize = parseInt(Math.min(window.innerWidth, window.innerHeight));
setSize(gameBoard, gameBoardSize, gameBoardSize);
const tileSize = gameBoardSize / 9;
const halfTileSize = parseInt(tileSize / 2);

//ポーズフラグ
let pausing = true;


//ソケット繋げとく
const ws = new WebSocket('wss://galleon.yachiyo.tech/shogi/cmd');


function myDialog(msg){
    dialogElm.style.display = "block";
    dialogElm.innerHTML = msg;
}

//難易度選択
for(let i=1; i<=14; i++){
    let optHtml = `<option value="${i}">Lv${i}</option>`;
    easyLvElm.innerHTML += optHtml;
}