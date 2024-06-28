setInterval(() => {
    if (pausing) return;

    //駒の表示
    for (let i = 0; i < allPieces.length; i++) {
        const piece = allPieces[i];
        piece.coolTimeCount--;

        if (piece.coolTimeCount <= 0) piece.coolTimeCount = 0;
    }
}, 1000);

//定期的にcpuが行動
let cpuCoolTime = 1500;
function cpuOneActInterval() {
    const intervalId = setInterval(() => {
        if (player2.isCpu && !pausing) player2.cpuOneAction();
    }, cpuCoolTime);

    return intervalId;
}
let intervalId = cpuOneActInterval();

easyLvElm.addEventListener("change", () => { //難易度変更で行動速度変更
    clearInterval(intervalId);
    cpuCoolTime = 1500 - (parseInt(easyLvElm.value) * 100);
    intervalId = cpuOneActInterval();
});

setInterval(() => {
    if (pausing) return;

    //駒の表示
    for (let i = 0; i < allPieces.length; i++) {
        const piece = allPieces[i];

        piece.refreshStatus(); //ステータス更新

        //駒の表示・非表示切り替え
        const visible = piece.dead ? "none" : "inline";
        piece.elm.style.display = visible
    }

    if(dialogElm.innerHTML == "") dialogElm.style.display = "none"

}, 17);