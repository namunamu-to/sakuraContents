document.addEventListener("keydown", (e)=>{
    if(ws.readyState == 3) {
        alert("接続が切れました。リロードします。")
        location.reload();
    }
    if(pausing) return;
    
    ws.send("keyDown " + e.key);
    if (e.key == nextKey) nextIdx++;
    
    if(nextIdx == azList.length) {
        pausing = true;
        dialog("終了!!");
        nextIdx = 0;
        nextKey = azList[nextIdx];
        nextInputElm.innerHTML = nextKey;
        setTimeout(() => {
            ws.send("getRanking");
        }, 2000);
    }else {
        nextKey = azList[nextIdx];
        nextInputElm.innerHTML = nextKey;
    }
});

startBtn.addEventListener("click", ()=>{
    gameStart();
});

showRankingBtn.addEventListener("click", ()=>{
    ws.send("getRanking");
});

ws.addEventListener("open", (message)=>{
    console.log('ソケット通信成功');
});

ws.addEventListener("message", (message)=>{
    const msg = message.data;
    const cmd = msg.split(" ");

    if(cmd[0] == "rankingData"){ //ランキングデータを受け取ったら、ランキング表示
        const myName = "自分";
        const myRank = cmd[1];
        highScore = cmd[2];
        const rankingData = cmd[3].split("\n");

        let innerHtml = "";        
        for(let i=0; i<rankingData.length; i++){
            let data = rankingData[i].split(",")
            const name = data[0];
            const score = data[1];
            innerHtml += `<div>${i+1}位 : ${name} : ${score}</div>`;
        }

        innerHtml += `<div>${myRank}位 : ${myName} : ${highScore}</div>`; //自分の情報

        
        innerHtml += `<button id="retryDialogBtn">挑戦</button>`;
        innerHtml += `<button id="closeDialogBtn">閉じる</button>`;
        dialog(innerHtml);
    
        retryDialogBtn.addEventListener("click", ()=>{
            // dialog("");
            gameStart();
        });
        
        closeDialogBtn.addEventListener("click", ()=>{
            dialog("");
        });
    }
    
    console.log(cmd);
});
