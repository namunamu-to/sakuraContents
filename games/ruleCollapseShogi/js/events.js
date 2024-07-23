stopCPUElm.addEventListener("click", () => {
    pausing = true;
});

startCPUElm.addEventListener("click", () => {
    vsStartCount();
});

matchCPU.addEventListener("click", () => {
    retryMatch(true);
});


function vsStartCount() {
    pausing = true;
    location.href = "#canvasElm";
    const msgs = ["対戦開始まで\n3", "対戦開始まで\n2", "対戦開始まで\n1", "対戦開始！", ""];
    dialog(msgs[0]);
    for (let i = 1; i < msgs.length + 1; i++) {
        setTimeout(() => {
            dialog(msgs[i]);
            if (i == msgs.length) pausing = false;
        }, i * 1000);
    }
}

function retryMatch(isCpu) {
    isCpuEnemy = isCpu;
    initBoard();
    vsStartCount();
}

function showCanMoveTileHandller(boardX, boardY) {
    canMoves = [];
    if (boardX >= boardSize || boardX < 0 || boardY >= boardSize || boardY < 0) return;

    const onSpace = nowBoard[boardY][boardX];
    if (onSpace == "") return;
    if (onSpace.isEnemy) return;

    let piece = onSpace;
    clickedPieceX = boardX;
    clickedPieceY = boardY;
    canMoves = getCanMoves(piece, boardX, boardY);
}

function moveToCanMoveTileHandller(toX, toY) {
    for (let canMove of canMoves) {
        if (toX == canMove[0] && toY == canMove[1]) {
            movePiece(clickedPieceX, clickedPieceY, toX, toY);
            const reversed = reversePiece(nowBoard[toY][toX], toX, toY);
            if (!isCpuEnemy) ws.send(`move ${clickedPieceX} ${clickedPieceY} ${toX} ${toY} ${reversed}`);

            return true;
        }
    }
}

canvasElm.addEventListener("click", () => {
    if (pausing) return;
    const boardX = parseInt((clicked.x - boardDrawInfo.x1) / tileSize);
    const boardY = parseInt((clicked.y - boardDrawInfo.y1) / tileSize);

    const moved = moveToCanMoveTileHandller(boardX, boardY);
    if (moved) canMoves = [];
    else showCanMoveTileHandller(boardX, boardY);

});

ws.addEventListener("open", (message) => {
    console.log('ソケット通信成功');
});

ws.addEventListener("message", (message) => {
    const msg = message.data;
    const cmd = msg.split(" ");

    if (cmd[0] == "fullMember") {
        dialog("満員です。違うID・パスワードを使ってください");
    } else if (cmd[0] == "matched") {
        retryMatch(false);
    } else if (cmd[0] == "matching") {
        dialog(`
        <p>マッチング中です</p>
        <p>人数 : ${cmd[1]}</p>
    `);
    } else if (cmd[0] == "move") {
        enemyPlayerAction(cmd.slice(1));
    } else if (cmd[0] == "disConnect") {
        alert("相手プレイヤーと通信が切れました。\n対戦を終了します");
    }

    console.log(message.data);
});

startMatch.addEventListener("click", () => {
    console.log(`moveRoom ${roomPw.value} ${"default"}`);

    ws.send(`moveRoom ${roomPw.value} ${"default"}`);
});