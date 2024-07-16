stopCPUElm.addEventListener("click", ()=>{
    pausing = true;
});

startCPUElm.addEventListener("click", ()=>{
    pausing = false;
});

matchCPU.addEventListener("click", ()=>{
    retryMatch();
});


function vsStartCount(count){
    location.href = "#gameBoard";
    myDialog(`<div><p>対戦開始まで<p><p id=${"startVsCount"}>${count}</p><div>`);
    
    const intervalId = setInterval(()=>{
        count--;
        myDialog(`<div><p>対戦開始まで<p><p id=${"startVsCount"}>${count}</p><div>`);
        
        if(count <= 0) {
            myDialog("<p>対戦開始！</p>");
            
            setTimeout(()=>{
                myDialog("")
                pausing = false;
            }, 1000);

            clearInterval(intervalId);
        }

    }, 1000);
}
        
ws.addEventListener("open", (message)=>{
    console.log('ソケット通信成功');
});

ws.addEventListener("message", (message)=>{
    const msg = message.data;
    const cmd = msg.split(" ");

    if(cmd[0] == "fullMember"){
        myDialog("満員です。違うID・パスワードを使ってください");
    } else if(cmd[0] == "matched"){
        retryMatch(false);
    } else if(cmd[0] == "matching"){
        myDialog(`
        <p>マッチング中です</p>
        <p>人数 : ${cmd[1]}</p>
    `);
    } else if(cmd[0] == "move"){
        player2.humanOneAction(cmd[1], cmd[2], cmd[3], cmd[4]);
    }else if(cmd[0] == "disConnect"){
        alert("相手プレイヤーと通信が切れました。\n対戦を終了します");
    }

    console.log(message.data);
});

startMatch.addEventListener("click", ()=>{
    console.log(`moveRoom ${roomPw.value} ${"default"}`);
    ws.send(`moveRoom ${roomPw.value} ${"default"}`);
});