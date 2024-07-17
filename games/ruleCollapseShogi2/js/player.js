function showVsResult(isVictory){
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