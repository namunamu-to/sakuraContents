function countDown(msg, count, endExe = () => { }) {
    dialog(`<div><p>${msg}<p><p id=${"showCountElm"}>${count}</p><div>`);

    const intervalId = setInterval(() => {
        count--;
        dialog(`<div><p>${msg}<p><p id=${"showCountElm"}>${count}</p><div>`);

        if (count <= 1) {
            setTimeout(() => {
                dialog("")
                endExe();
            }, 1000);

            clearInterval(intervalId);
        }

    }, 1000);
}

function gameStart() {
    location.href = "#gameDisplayElm";
    nextInputElm.innerHTML = nextKey;
    countDown("開始まで", 3, endExe = () => {
        pausing = false;
        ws.send("startGame " + userNameInputElm.value);
    });
}