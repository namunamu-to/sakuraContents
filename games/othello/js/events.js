canvasElm.addEventListener("click", (e)=>{
    const posX = e.clientX - baseX;
    const posY = e.clientY - baseY;
    if(!isInnerRange(boardRange, posX, posY)) return;
    const x = parseInt(posX / tileSize);
    const y = parseInt(posY / tileSize);

    // console.log(board[x][y], x, y);
    // console.log(posX, posY);
    // console.log(x, y);

    if(checkCanPut(x, y)){
        putStone(nextIsBlack, x, y);
        console.log("aaa");
    }

    
});