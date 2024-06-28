function drawLine(color, x, y, x1, y1){
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x1, y1);
    ctx.stroke();
}

function main(){
    setInterval(()=>{
        sideTileNum = 8; //値が8なら8x8のマスが生まれる
        tileSize = parseInt(getWidth(canvasElm) / sideTileNum);
        const [canvasX, canvasY] = [getX(canvasElm), getY(canvasElm)];

        //背景描画
        ctx.fillStyle = "green";
        ctx.fillRect(0, 0, getWidth(canvasElm), getHeight(canvasElm)); 

        //マス目描画
        // ctx.fillStyle = "#000";
        for(let y=0; y<sideTileNum+1; y++){
            drawLine("#fff", 0, tileSize*y, getWidth(canvasElm), tileSize*y);
            drawLine("#fff", tileSize*y, 0, tileSize*y, getHeight(canvasElm));
            for(let x=0; x<sideTileNum+1; x++){
                // drawLine("#fff", tileSize*x, tileSize*y, tileSize, tileSize);
                // ctx.beginPath();
                // ctx.moveTo(tileSize*x, tileSize*y);
                // ctx.lineTo();
                // ctx.fillRect(tileSize*y, tileSize*x, tileSize/2, tileSize/2); 
            }
            
        }

    }, 33);
}

main();