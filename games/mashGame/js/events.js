mashBtn.addEventListener("click", ()=>{
    if(pausing) return;
    let nowCount = parseInt(mashedNumElm.innerHTML);
    nowCount++;
    mashedNumElm.innerHTML = nowCount;

    ws.send("pushBtn");
});

startBtn.addEventListener("click", ()=>{
    gameStart(3);
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

    if(cmd[0] == "rankingData"){        
        const myName = "自分";
        const myRank = cmd[1];
        const rankingData = cmd[2].split("\n")

        let innerHtml = "";        
        for(let i=0; i<rankingData.length; i++){
            let data = rankingData[i].split(",")
            const name = data[0];
            const score = data[1];
            innerHtml += `<div>${i+1}位 : ${name} : ${score}</div>`;
        }

        innerHtml += `<div>${myRank}位 : ${myName} : ${highScore}</div>`; //自分の情報

        
        innerHtml += `<button id="retryDialogBtn">開始</button>`;
        innerHtml += `<button id="closeDialogBtn">閉じる</button>`;
        dialog(innerHtml);
    
        retryDialogBtn.addEventListener("click", ()=>{
            gameStart();
        });
        
        closeDialogBtn.addEventListener("click", ()=>{
            dialog("");
        });
    }
    
    console.log(cmd);
});
