//駒の移動範囲を定義
const moveDir = { "up": [0, -1], "down": [0, 1], "left": [-1, 0], "right": [1, 0], "leftUp": [-1, -1], "rightUp": [1, -1], "leftDown": [-1, 1], "rightDown": [1, 1], "keima1":[-1, -2], "keima2":[1, -2]};
const mobilitys = {
    "歩兵": { "up": 1, "down": 0, "left": 0, "right": 0, "leftUp": 0, "rightUp": 0, "leftDown": 0, "rightDown": 0, "keima1":0, "keima2": 0 },
    "と金": { "up": 1, "down": 1, "left": 1, "right": 1, "leftUp": 1, "rightUp": 1, "leftDown": 0, "rightDown": 0, "keima1":0, "keima2": 0 },
    "飛車": { "up": 8, "down": 8, "left": 8, "right": 8, "leftUp": 0, "rightUp": 0, "leftDown": 0, "rightDown": 0, "keima1":0, "keima2": 0 },
    "龍王": { "up": 8, "down": 8, "left": 8, "right": 8, "leftUp": 1, "rightUp": 1, "leftDown": 1, "rightDown": 1, "keima1":0, "keima2": 0 },
    "角行": { "up": 0, "down": 0, "left": 0, "right": 0, "leftUp": 8, "rightUp": 8, "leftDown": 8, "rightDown": 8, "keima1":0, "keima2": 0 },
    "龍馬": { "up": 1, "down": 1, "left": 1, "right": 1, "leftUp": 8, "rightUp": 8, "leftDown": 8, "rightDown": 8, "keima1":0, "keima2": 0 },
    "王将": { "up": 1, "down": 1, "left": 1, "right": 1, "leftUp": 1, "rightUp": 1, "leftDown": 1, "rightDown": 1, "keima1":0, "keima2": 0 },
    "金将": { "up": 1, "down": 1, "left": 1, "right": 1, "leftUp": 1, "rightUp": 1, "leftDown": 0, "rightDown": 0, "keima1":0, "keima2": 0 },
    "銀将": { "up": 1, "down": 0, "left": 0, "right": 0, "leftUp": 1, "rightUp": 1, "leftDown": 1, "rightDown": 1, "keima1":0, "keima2": 0 },
    "成銀": { "up": 1, "down": 1, "left": 1, "right": 1, "leftUp": 1, "rightUp": 1, "leftDown": 0, "rightDown": 0, "keima1":0, "keima2": 0 },
    "桂馬": { "up": 0, "down": 0, "left": 0, "right": 0, "leftUp": 0, "rightUp": 0, "leftDown": 0, "rightDown": 0, "keima1":1, "keima2": 1 },
    "成桂": { "up": 1, "down": 1, "left": 1, "right": 1, "leftUp": 1, "rightUp": 1, "leftDown": 0, "rightDown": 0, "keima1":0, "keima2": 0 },
    "香車": { "up": 8, "down": 0, "left": 0, "right": 0, "leftUp": 0, "rightUp": 0, "leftDown": 0, "rightDown": 0, "keima1":0, "keima2": 0 },
    "成香": { "up": 1, "down": 1, "left": 1, "right": 1, "leftUp": 1, "rightUp": 1, "leftDown": 0, "rightDown": 0, "keima1":0, "keima2": 0 },
}

//生存している駒のインスタンスリスト
let allPieces = []
class Piece {
    static createdNum = 0;
    constructor(role, x, y, moveCoolTime, isEnemy) {
        //インスタンス変数セット
        this.id = Piece.createdNum++;
        this.role = role;
        this.x = x;
        this.y = y;
        this.isEnemy = isEnemy;
        this.moveRange = mobilitys[role];
        this.moveCoolTime = moveCoolTime;
        this.coolTimeCount = 0;
        this.reversed = false;
        this.startX = x;
        this.startY = y;
        this.dead = false

        //駒を表示するための要素を設定し、表示
        this.elm = makeElm(gameBoard, "span", this.getElmId(), "piece");
        this.elm.style.backgroundImage = `url(${this.getImgPath()})`;

        //駒の表示サイズと位置設定
        const pieceSize = tileSize - 10;
        setSize(this.elm, pieceSize, tileSize - 10);

        //要素の初期配置
        this.setPosition(x, y)


        //this以外から自身を参照するための配列に自身を追加
        nowBoard[y][x] = this;

    }

    getImgPath(){
        return "./img/" + this.role + ".png";
    }

    //駒のdomのidを取得
    getElmId() {
        return "piece" + this.id;
    }


    setPosition(toX, toY) {
        //座標を移動
        setPosition(this.elm, toX * tileSize + 5, toY * tileSize + 5);

        nowBoard[toY][toX] = this;

        //現在地を保存
        this.x = toX;
        this.y = toY;
    }

    checkCanMove(toX, toY) {
        if (toX < 0 || toX > 8 || toY < 0 || toY > 8) return false; //盤面外なら
        else if (nowBoard[toY][toX] == "") return true;
        else if (nowBoard[toY][toX].isEnemy == this.isEnemy) return false; //移動先に味方がいるか

        return true;
    }

    //動ける範囲を取得
    getCanMoves() {
        let canMoves = [];

        const moveKeys = ["up", "down", "left", "right", "leftUp", "rightUp", "leftDown", "rightDown", "keima1", "keima2"]
        for (let moveKey of moveKeys) { //8方向の移動範囲を処理
            for (let i = 1; i < mobilitys[this.role][moveKey] + 1; i++) { //方向に対する移動量分繰り返す
                //チェックする座標
                let moveX = moveDir[moveKey][0];
                let moveY = moveDir[moveKey][1];

                //レッドチームなら移動方向を反転させる
                if(this.isEnemy){
                    moveX *= -1;
                    moveY *= -1;
                }

                const toX = this.x + (moveX * i);
                const toY = this.y + (moveY * i);

                if (!this.checkCanMove(toX, toY)) break; //移動できないならbreak

                canMoves.push([toX, toY]);
                const therePiece = nowBoard[toY][toX];
                if (therePiece != "") break; //駒があるならbreak
            }
        }

        return canMoves;
    }

    reverse() {
        this.reversed = true;
        if (this.role == "歩兵" || this.role == "銀将" || this.role == "桂馬" || this.role == "香車") this.role = "金将";
        if (this.role == "飛車") this.role = "龍王";
        if (this.role == "角行") this.role = "龍馬";

        this.moveRange = mobilitys[this.role];
        this.elm.style.backgroundImage = `url(${this.getImgPath()})`;
    }

    refreshStatus() {
        let html = "";
        if (this.coolTimeCount > 0) html += `<div class="statusElm">${this.coolTimeCount}</div>`;

        this.elm.innerHTML = html;
    }
}