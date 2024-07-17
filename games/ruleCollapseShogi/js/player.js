
//ピースを配置していく
for (let y = 0; y < 9; y++) {
    //盤面に駒を配置していく
    for (let x = 0; x < 9; x++) {
        const role = startBoard[y][x];
        let piece;
        if (role == "") continue;

        const isEnemy = y < 3; 

        if (role == "歩兵") piece = new Piece(role, x, y, 3, isEnemy);
        else if (role == "角行") piece = new Piece(role, x, y, 6, isEnemy);
        else if (role == "飛車") piece = new Piece(role, x, y, 6, isEnemy);
        else if (role == "王将") piece = new Piece(role, x, y, 5, isEnemy);
        else if (role == "金将") piece = new Piece(role, x, y, 5, isEnemy);
        else if (role == "銀将") piece = new Piece(role, x, y, 5, isEnemy);
        else if (role == "桂馬") piece = new Piece(role, x, y, 4, isEnemy);
        else if (role == "香車") piece = new Piece(role, x, y, 4, isEnemy);

        allPieces.push(piece);
    }
}


class Player {
    //両チームの王将
    static player1King = allPieces[35];
    static player2King = allPieces[4];

    constructor(isEnemy) {
        this.isEnemy = isEnemy;
        this.pieces = [];
        this.resetPieces();
    }

    showVictoryOrDefeat(isVictory){
        const img = isVictory ? "glad.png" : "sad.png";
        const h1 = isVictory ? "VICTORY!!" : "LOSE....."
        const h1Color = isVictory ? "red" : "blue";
        let html = `
            <div id="victoryOrDefeatElm">
                <h1>${h1}</h1>
                <img src="img/${img}">
            </div>
            
            <button id="closeElm">閉じる</button>
        `;

        myDialog(html);

        victoryOrDefeatElm.style.color = h1Color;
        closeElm.addEventListener("click", ()=>{
            location.href = "index.html";
        });
    }

    setEnemyPlayer(enemyPlayer) {
        this.enemyPlayer = enemyPlayer;
    }

    //取った駒を返す
    takeEnemyPiece(movingPiece, toX, toY) {
        const alreadyPiece = nowBoard[toY][toX];
        //行先に相手の駒があるか確認
        if (alreadyPiece != "") {
            //相手の駒なら倒す
            if (alreadyPiece.isEnemy != movingPiece.isEnemy) {
                nowBoard[toY][toX] = "";
                alreadyPiece.dead = true;

                //相手のピースリストから消してあげる
                this.enemyPlayer.pieces.splice(this.enemyPlayer.pieces.indexOf(alreadyPiece), 1);
                return alreadyPiece;
            }
        }
        return "";
    }

    //成れるか判定
    //引数で成れる範囲指定
    canReverse(piece, fromY, endY) {
        //成るか聞く
        if (piece.reversed) return false;
        else if (fromY <= piece.y && endY >= piece.y) return true;
        else return false;
    }
    
    move(piece, toX, toY) {
        if(piece.coolTimeCount > 0) return;

        //ボード情報更新
        nowBoard[piece.y][piece.x] = "";
        nowBoard[toY][toX] = piece;

        //移動
        piece.setPosition(toX, toY);
        piece.coolTimeCount = piece.moveCoolTime;

        // moveSeElm.play();
    }


    resetPieces() {
        //駒の情報をリセット
        const sepaIdx = allPieces.length / 2
        let startY = this.isEnemy ? 0 : sepaIdx;
        let endY = this.isEnemy ? sepaIdx - 1 : allPieces.length;

        this.pieces = [];
        for (let i = startY; i < endY; i++) {
            let piece = allPieces[i];
            piece.dead = false;
            piece.isEnemy = this.isEnemy;
            this.pieces.push(piece);

            piece.setPosition(piece.startX, piece.startY)
        }
    }
}

class SelfPlayer extends Player {
    constructor() {
        super(false);
        this.canMoveTiles = [];

        for (let piece of this.pieces) {
            piece.elm.addEventListener("click", (e) => {
                if (piece.coolTimeCount <= 0) this.movePreview(piece); //クールタイム中なら何もしない
            });
        }
    }


    //全タイル削除
    allDellCanMoveTiles() {
        for (let tile of this.canMoveTiles) {
            gameBoard.removeChild(tile);
        }

        this.canMoveTiles = [];
    }

    makeCanMoveTile(piece, toX, toY) {
        //タイル要素を作成
        const tileElm = makeElm(gameBoard, "span", "", "canMoveTile");
        tileElm.style.position = "absolute";

        //タイルのサイズを定義
        const moveRangeTileSize = parseInt(tileSize);
        setSize(tileElm, moveRangeTileSize - 3, moveRangeTileSize - 3);

        //タイルを配置
        setPosition(tileElm, toX * tileSize + 1, toY * tileSize + 1);

        //後で参照するためのリストにタイルを追加
        this.canMoveTiles.push(tileElm);

        //タイルがクリックされたら、タイルと同じ位置に駒を移動し、全タイル削除
        tileElm.addEventListener("click", () => {
            //相手の駒を取る
            const takedPeice = this.takeEnemyPiece(piece, toX, toY);

            if (takedPeice == Player.player2King) {
                pausing = true;
                this.showVictoryOrDefeat(true);
            }

            //クリックされたタイルの位置に駒を移動
            this.move(piece, toX, toY);

            //成れるなら、成るかどうか聞く
            let reverse;
            if (this.canReverse(piece, 0, 2)) {
                reverse = window.confirm("成りますか？")
                if (reverse) {
                    piece.reverse();
                }
            }

            if(!player2.isCpu) ws.send(`move ${piece.id} ${toX} ${toY} ${reverse ? "true" : "false"}`); //行動を相手プレイヤーに送信

            //全タイル削除に関する処理
            this.allDellCanMoveTiles();
        });

    }

    //移動できる範囲を表示し、クリックされた場所に移動
    movePreview(piece) {
        if (pausing) return;

        //とりあえず表示をリセット
        this.allDellCanMoveTiles();

        const canMoves = piece.getCanMoves();
        for (let canMove of canMoves) this.makeCanMoveTile(piece, canMove[0], canMove[1]);
    }
}

class EnemyPlayer extends Player {
    constructor(isCpu) {
        super(true);
        this.isCpu = isCpu;

        //上下表示を反転
        for (let piece of this.pieces) piece.elm.style.transform = `translate(0%, 0%) rotate(180deg)`;

        this.stoping = false;
    }


    humanOneAction(pieceId, toX, toY, reverse) {
        const pieceNum = allPieces.length;
        const pieceIdInt = 39 - parseInt(pieceId);
        
        if (pieceIdInt >= pieceNum || pieceNum < 0) { //駒IDが正しいかチェック
            return;
        }

        
        //駒の動きコマンドが正しいかチェック
        toX = 8 - parseInt(toX);
        toY = 8 - parseInt(toY);

        //駒が動ける範囲を取得
        const piece = allPieces[pieceIdInt];
        const canMoves = piece.getCanMoves();

        for(let i=0; i<canMoves.length; i++){ //移動できるなら移動する
            if(canMoves[i][0] == toX && canMoves[i][1]== toY) {
                //相手の駒を取る
                const takedPeice = this.takeEnemyPiece(piece, toX, toY);
                if (takedPeice == Player.player1King) {
                    pausing = true;
                    this.showVictoryOrDefeat(false);
                }

                this.move(piece, toX, toY); //移動する

                if(toY >= 6 && reverse == "true") piece.reverse(); //成る
            }
        }

    }

    //一手の挙動
    cpuOneAction() {
        let pieceIdx;
        const piecesLength = this.pieces.length;
        //ランダムなピースをランダムな場所に動かす
        for (let i = 0; i < piecesLength; i++) {
            pieceIdx = Math.floor(Math.random() * piecesLength)
            let piece = this.pieces[pieceIdx];
            const canMoves = piece.getCanMoves();

            //動けないならcontinue
            if (canMoves.length == 0) continue;


            //移動場所をランダムに決める
            const canMoveIdx = Math.floor(Math.random() * canMoves.length);
            const toMove = canMoves[canMoveIdx];

            //相手の駒を取る
            const takedPeice = this.takeEnemyPiece(piece, toMove[0], toMove[1]);
            if (takedPeice == Player.player1King) {
                pausing = true;
                this.showVictoryOrDefeat(false)
            }

            this.move(piece, toMove[0], toMove[1]);

            //成れるなら成る
            if (this.canReverse(piece, 6, 8)) {
                piece.reverse();
            }

            break;
        }

    }
}


initNowBoard();
let player1;
let player2;
player1 = new SelfPlayer();
player2 = new EnemyPlayer(true);
player1.setEnemyPlayer(player2);
player2.setEnemyPlayer(player1);


function retryMatch(withCpu = true) {
    pausing = true
    initNowBoard();

    player2.isCpu = withCpu;
    player1.resetPieces();
    player2.resetPieces();

    vsStartCount(3);
}