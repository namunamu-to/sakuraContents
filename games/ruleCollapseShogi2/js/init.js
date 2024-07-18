const ws = new WebSocket('wss://galleon.yachiyo.tech/commonGameServer/shogi');
let canMoves = [];
let clickedPieceX;
let clickedPieceY;
let tileSize = 0;
let pausing = true; //ポーズフラグ
let imgDir = "img/"

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
let nowBoard;

function initBoard(){
    nowBoard = structuredClone(startBoard);
    
    for(let y=0; y<nowBoard.length; y++){
        for(let x=0; x<nowBoard.length; x++){
            const onSpace = nowBoard[y][x]
            if(onSpace == "") continue;

            let isEnemy = y < 3;

            nowBoard[y][x] = newPiece(onSpace, isEnemy);
        }
    }
}

initBoard();


//難易度選択
for (let i = 1; i <= 14; i++) {
    let optHtml = `<option value="${i}">Lv${i}</option>`;
    easyLvElm.innerHTML += optHtml;
}