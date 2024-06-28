//駒の移動範囲を定義

//桂馬の移動範囲
const horseMoveRange = [[-1, -2], [1, -2]];


const moveDir = { "up": [0, -1], "down": [0, 1], "left": [-1, 0], "right": [1, 0], "leftUp": [-1, -1], "rightUp": [1, -1], "leftDown": [-1, 1], "rightDown": [1, 1] };
const mobilitys = {
    "歩兵": { "up": 1, "down": 0, "left": 0, "right": 0, "leftUp": 0, "rightUp": 0, "leftDown": 0, "rightDown": 0 },
    "と金": { "up": 1, "down": 1, "left": 1, "right": 1, "leftUp": 1, "rightUp": 1, "leftDown": 0, "rightDown": 0 },
    "飛車": { "up": 8, "down": 8, "left": 8, "right": 8, "leftUp": 0, "rightUp": 0, "leftDown": 0, "rightDown": 0 },
    "龍王": { "up": 8, "down": 8, "left": 8, "right": 8, "leftUp": 1, "rightUp": 1, "leftDown": 1, "rightDown": 1 },
    "角行": { "up": 0, "down": 0, "left": 0, "right": 0, "leftUp": 8, "rightUp": 8, "leftDown": 8, "rightDown": 8 },
    "龍馬": { "up": 1, "down": 1, "left": 1, "right": 1, "leftUp": 8, "rightUp": 8, "leftDown": 8, "rightDown": 8 },
    "王将": { "up": 1, "down": 1, "left": 1, "right": 1, "leftUp": 1, "rightUp": 1, "leftDown": 1, "rightDown": 1 },
    "金将": { "up": 1, "down": 1, "left": 1, "right": 1, "leftUp": 1, "rightUp": 1, "leftDown": 0, "rightDown": 0 },
    "銀将": { "up": 1, "down": 0, "left": 0, "right": 0, "leftUp": 1, "rightUp": 1, "leftDown": 1, "rightDown": 1 },
    "成銀": { "up": 1, "down": 1, "left": 1, "right": 1, "leftUp": 1, "rightUp": 1, "leftDown": 0, "rightDown": 0 },
    "桂馬": { "up": 0, "down": 0, "left": 0, "right": 0, "leftUp": 0, "rightUp": 0, "leftDown": 0, "rightDown": 0 }, //桂馬は特殊だから、必要に応じて処理する
    "成桂": { "up": 1, "down": 1, "left": 1, "right": 1, "leftUp": 1, "rightUp": 1, "leftDown": 0, "rightDown": 0 },
    "香車": { "up": 8, "down": 0, "left": 0, "right": 0, "leftUp": 0, "rightUp": 0, "leftDown": 0, "rightDown": 0 },
    "成香": { "up": 1, "down": 1, "left": 1, "right": 1, "leftUp": 1, "rightUp": 1, "leftDown": 0, "rightDown": 0 },
}


//生存している駒のインスタンスリスト
class Piece {
    static createdNum = 0;
    constructor(role, toXTile, toYTile, moveCoolTime, isRedTeam) {
        //インスタンス変数セット
        this.id = Piece.createdNum++;
        this.role = role;
        this.nowXTile = toXTile;
        this.nowYTile = toYTile;
        this.isRedTeam = isRedTeam;
        this.moveRange = mobilitys[role];
        this.moveCoolTime = moveCoolTime;
        this.canMoveTiles = [];
        this.isCoolTime = false;
        this.reversed = false;
        this.coolTimeCount = 0;


        //駒の背景画像
        this.imgDirPath = "./img/"
        this.imgPath = this.imgDirPath + role + ".png";
        this.reversedImgPath = this.imgDirPath + "reversed" + role + ".png";

        //駒を表示するための要素を設定
        this.elm = createElm(gameBoard, "span", this.getElmId(), "piece");
        this.elm.style.backgroundImage = `url(${this.imgPath})`;
        this.refreshStatus();

        //この駒が赤だった場合に行うこと
        if (isRedTeam) {
            this.elm.classList.add("isRedTeam");

            //敵の駒の上下表示を反転
            //見づらいから上下反転させるか悩み中
            this.elm.style.transform = `translate(0%, 0%) rotate(180deg)`;
        }


        //駒の表示サイズと位置設定
        const pieceSize = tileSize - 10;
        setSize(this.elm, pieceSize, tileSize -10);

        //駒を動かすためのバインド
        this.elm.addEventListener("click", (e) => {
            if (this.isRedTeam) return;

            //クールタイム中なら何もしない
            if (this.isCoolTime) return;

            //移動

            this.movePreview();
        });

        //要素の初期配置
        this.setPosition(toXTile, toYTile)


        //this以外から自身を参照するための配列に自身を追加
        // pieces.push(this);
        nowBoard[toYTile][toXTile] = this;

    }

    //駒のdomのidを取得
    getElmId() {
        return "piece" + this.id;
    }


    setPosition(toXTile, toYTile) {
        //座標を移動
        setPosition(this.elm, toXTile * tileSize + 5, toYTile * tileSize + 5);

        //現在地を保存
        this.nowXTile = toXTile;
        this.nowYTile = toYTile;
    }

    //現在地点からmoveSpeedミリ秒後に引数で指定された場所に移動する関数
    move(x, y) {
        this.setPosition(x, y);

        //クールタイム中は移動できないようにする
        this.coolTimeCount = this.moveCoolTime;

        //クールタイム時間を表示するための要素を作成し、表示
        this.refreshStatus();

        //クールタイム中にする
        this.isCoolTime = true;

        const intervalId = setInterval(() => {
            this.coolTimeCount--;
            this.refreshStatus();
            
            if (this.coolTimeCount <= 0) {
                this.isCoolTime = false;
                clearInterval(intervalId);
                this.refreshStatus();
            }

        }, 1000);
    }

    checkCanMove(toX, toY) {
        const alreadyPiece = nowBoard[toY][toX];
        console.log(alreadyPiece);

        //移動先に敵か味方がいた時
        if (alreadyPiece == "") return true;
        else{
            if (alreadyPiece.isRedTeam == this.isRedTeam) return false;
            else return true;

        }
    }

    reverse() {
        this.reversed = true;

        if (this.role == "歩兵") this.role = "と金";
        if (this.role == "飛車") this.role = "龍王";
        if (this.role == "角行") this.role = "龍馬";
        if (this.role == "銀将") this.role = "成銀";
        if (this.role == "桂馬") this.role = "成桂";
        if (this.role == "香車") this.role = "成香";

        this.moveRange = mobilitys[this.role];
        this.elm.style.backgroundImage = `url(${this.reversedImgPath})`;
    }

    makeCanMoveTile(toX, toY) {
        //タイル要素を作成
        const tileElm = createElm(gameBoard, "span", "", "canMoveTile");
        tileElm.style.position = "absolute";

        //タイルのサイズを定義
        const moveRangeTileSize = parseInt(tileSize - 7);
        setSize(tileElm, moveRangeTileSize, moveRangeTileSize);

        //タイルを配置
        setPosition(tileElm, toX * tileSize + 5, toY * tileSize + 5);

        //後で参照するためのリストにタイルを追加
        this.canMoveTiles.push(tileElm);

        //タイルがクリックされたら、タイルと同じ位置に駒を移動し、全タイル削除
        tileElm.addEventListener("click", () => {
            const alreadyPiece = nowBoard[toY][toX];
            //行先に相手の駒があるか確認
            if (alreadyPiece != "") {
                //相手の駒なら倒す
                if (alreadyPiece.isRedTeam != this.isRedTeam) {
                    gameBoard.removeChild(alreadyPiece.elm);
                }
            }
            
            //クリックされたタイルの位置に駒を移動
            nowBoard[this.nowYTile][this.nowXTile] = "";
            this.move(toX, toY);
            nowBoard[toY][toX] = this;

            //成るか聞く
            if (this.nowYTile < 3) {

                if (!(this.role == "金将" || this.role == "王将") && !this.reversed) {
                    const yes = window.confirm("成りますか？");
                    if (yes) {
                        this.reverse();
                    }
                }
            }

            //全タイル削除
            for (let tile of this.canMoveTiles) {
                gameBoard.removeChild(tile);
            }

            this.canMoveTiles = [];
        });

    }

    //移動できる範囲を表示し、クリックされた場所に移動
    movePreview() {
        //飛び駒対応中
        const moveKeys = ["up", "down", "left", "right", "leftUp", "rightUp", "leftDown", "rightDown"]

        //桂馬の場合
        if (this.role == "桂馬") {
            for (let i = 0; i < horseMoveRange.length; i++) {
                const toX = this.nowXTile + horseMoveRange[i][0];
                const toY = this.nowYTile + horseMoveRange[i][1];
                if (this.checkCanMove(toX, toY)) this.makeCanMoveTile(toX, toY);
            }
        } else {
            for (let moveKey of moveKeys) { //8方向の移動範囲を処理
                for (let j = 1; j < mobilitys[this.role][moveKey] + 1; j++) { //方向に対する移動量、分繰り返す
                    //チェックする座標
                    const toX = this.nowXTile + (moveDir[moveKey][0] * j);
                    const toY = this.nowYTile + (moveDir[moveKey][1] * j);


                    if (toX < 0 || toX > 8 || toY < 0 || toY > 8) break; //画面外なら
                    
                    const therePiece = nowBoard[toY][toX];
                    if (therePiece != "") {
                        if (therePiece.isRedTeam == this.isRedTeam) break; //同じチームなら
                        else {
                            this.makeCanMoveTile(toX, toY);
                            break;
                        }
                    } else this.makeCanMoveTile(toX, toY);
                }
            }
        }
    }

    refreshStatus(){
        let html = `<div class="statusElm">${this.role}</div>`;
        if(this.coolTimeCount > 0) html += `<div class="statusElm">${this.coolTimeCount}</div>`;

        this.elm.innerHTML = html;
    }
}