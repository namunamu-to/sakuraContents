document.addEventListener('keydown', function (event) {
    
    let toX = nowX;
    let toY = nowY;
    if (event.key === 'ArrowUp') {
        toY = nowY - 1;
    } else if (event.key === 'ArrowDown') {
        toY = nowY + 1;
    } else if (event.key === 'ArrowLeft') {
        toX = nowX - 1;
    } else if (event.key === 'ArrowRight') {
        toX = nowX + 1;
    }
    
    
    if(isCanMove(toX, toY)) setNowPos(toX, toY); //移動できるなら移動

    if(map[toY][toX] == "stairs") {
        nowFloor += 1;
        makeFloorMap();
    }
});


aBtn.addEventListener("click", ()=>{
    
});

bBtn.addEventListener("click", ()=>{

});

xBtn.addEventListener("click", ()=>{

});

yBtn.addEventListener("click", ()=>{

});