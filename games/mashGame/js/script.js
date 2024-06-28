function countDown(msg, count, endExe=()=>{}){
    dialog(`<div><p>${msg}<p><p id=${"showCountElm"}>${count}</p><div>`);
    
    const intervalId = setInterval(()=>{
        count--;
        dialog(`<div><p>${msg}<p><p id=${"showCountElm"}>${count}</p><div>`);

        if(count <= 1) {
            setTimeout(()=>{
                dialog("")
                endExe();
            }, 1000);
            
            clearInterval(intervalId);
        }

    }, 1000);
}

function gameStart(){
    location.href = "#gameDisplayElm";
    mashedNumElm.innerHTML = "0";
    countDown("開始まで", 3, endExe=()=>{
        pausing = false;
        ws.send("startGame " + userNameInputElm.value);

        //時間切れになった時
        countDown("", 10, endExe=()=>{
            pausing = true;
            const nowCount = parseInt(mashedNumElm.innerHTML);
            if(nowCount > highScore) highScore = nowCount;

            dialog("終了!!");
            setTimeout(()=>{
                ws.send("getRanking");
            }, 2000);
        });
    });
}