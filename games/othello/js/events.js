canvasElm.addEventListener("click", (e)=>{
    const posX = e.clientX;
    const posY = e.clientY;
    if(!isInnerRange(boardRange, posX, posY)) return;
    const x = parseInt(posX / tileSize);
    const y = parseInt(posY / tileSize);
    // console.log(posX, posY);
    // console.log(x, y);
    // console.log(checkCanPut(x, y));
});