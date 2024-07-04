canvasElm.addEventListener("click", (e)=>{
    if(nextPlayer != "player") return;

    let posX = e.clientX;
    let posY = e.clientY;
    if(!isInnerRange(boardRange, posX, posY)) return;
    posX -= baseX;
    posY -= baseY;
    const x = parseInt(posX / tileSize);
    const y = parseInt(posY / tileSize);

    if(!checkCanPut(x, y)) return;

    //相手の石を裏返す
    const canReverses = findStoneCanReverse(nextIsBlack, x, y);
    reverseStones(canReverses);
    
    putStone(nextIsBlack, x, y);
    nextTurn();
});