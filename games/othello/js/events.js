canvasElm.addEventListener("click", (e)=>{
    console.log(nextIsBlack);
    const posX = e.clientX - baseX;
    const posY = e.clientY - baseY;
    if(!isInnerRange(boardRange, posX, posY)) return;
    const x = parseInt(posX / tileSize);
    const y = parseInt(posY / tileSize);

    const canReverses = findStoneCanReverse(nextIsBlack, x, y);
    if(canReverses.length == 0) return;
    

    for(let reverseXY of canReverses){
        board[reverseXY[1]][reverseXY[0]].isBlack = nextIsBlack;
    }
    
    putStone(nextIsBlack, x, y);
    nextIsBlack = !nextIsBlack;
});