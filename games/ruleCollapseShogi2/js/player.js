let isCpuEnemy = true;
function showVsResult(isVictory) {
    const img = isVictory ? "glad.png" : "sad.png";
    const h1 = isVictory ? "VICTORY!!" : "LOSE....."
    const h1Color = isVictory ? "red" : "blue";

    let html = `
            <div id="victoryOrDefeatElm" style="height: min(90vw, 90vh); width: min(90vw, 90vh);">
                <h1 style="height: 8%;">${h1}</h1>
                <p><img src="img/${img}" style=" height: 78%; width: 78%;"></p>
                <button id="closeElm">閉じる</button>
            </div>            
    `;

    dialog(html);

    victoryOrDefeatElm.style.color = h1Color;
    closeElm.addEventListener("click", () => {
        location.href = "index.html";
    });
}



let cpuActionCowntDown = parseInt(3000 / parseInt(easyLvElm.value));
updates.cpuAction = () => {
    if (pausing) return;
    if(!isCpuEnemy) return;
    const cpuStrength = parseInt(easyLvElm.value);
    const moveCycle = parseInt(3000 / cpuStrength);
    cpuActionCowntDown -= cycle;
    if (cpuActionCowntDown > 0) return;

    cpuActionCowntDown = moveCycle;

    let selfPieceMoves = [];
    for (let y = 0; y < boardSize; y++) {
        for (let x = 0; x < boardSize; x++) {
            const onSpace = nowBoard[y][x];
            if (onSpace == "" || !onSpace.isEnemy) continue;

            const piece = onSpace;
            const canMoves = getCanMoves(piece, x, y);
            for (let canMove of canMoves) {
                const toX = canMove[0];
                const toY = canMove[1];
                selfPieceMoves.push([x, y, toX, toY]);
                // console.log(nowBoard[toX][toY] == "");
                if (nowBoard[toY][toX] == "") continue;
                movePiece(x, y, toX, toY);
                return;
            }
        }
    }

    const pieceIdx = getRandomInt(0, selfPieceMoves.length);
    const move = selfPieceMoves[pieceIdx];
    movePiece(move[0], move[1], move[2], move[3]);
};

function enemyPlayerAction(cmd){
    if(pausing) return;
    if(isCpuEnemy) return;

    let xy = [cmd[0], cmd[1], cmd[2], cmd[3]];
    for(let i=0; i<xy.length; i++){
        xy[i] = parseInt(xy[i]);
    }
    
    let [x1, y1, x2, y2] = xy;

    const onSpace = nowBoard[y1][x1];
    if(onSpace == "" || !onSpace.isEnemy) return;
    
    piece = nowBoard[y1][x1];
    for(let canMove of getCanMoves(piece, x1, y1)){
        if(canMove[0] == x2 && canMove[y2] == y2){
            nowBoard[x1][y1] = "";
            nowBoard[x2][y2] = piece;
            if(cmd[4] == "true") reversePiece(piece, x2, y2);
            return;
        }
    }
}
