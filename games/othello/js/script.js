function drawLine(color, x, y, x1, y1) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x1, y1);
    ctx.stroke();
}

function main() {
    setInterval(() => {
        //canvasの定義
        let canvasSize = Math.min(window.innerWidth, window.innerHeight) * 0.90;
        canvasElm.width = canvasSize;
        canvasElm.height = canvasSize;

        //タイルの定義
        let sideTileNum = 8; //値が8なら8x8のマスが生まれる
        let tileSize = canvasSize / sideTileNum;
        const ctx = canvasElm.getContext("2d");
        const [canvasX, canvasY] = [getX(canvasElm), getY(canvasElm)];

        //背景描画
        ctx.fillStyle = "green";
        ctx.fillRect(0, 0, getWidth(canvasElm), getHeight(canvasElm));

        //マス目描画
        for (let i = 0; i < sideTileNum + 1; i++) {
            drawLine("#fff", 0, tileSize * i, getWidth(canvasElm), tileSize * i); //縦ラインを描画
            drawLine("#fff", tileSize * i, 0, tileSize * i, getWidth(canvasElm)); //横ラインを描画     
        }

    }, 33); //30fps
}

main();