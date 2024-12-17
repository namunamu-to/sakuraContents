(function (){
    const style = `
        padding: 1rem;
        font-size: 3rem;
        width: fit-content;
        height: fit-content;
        background-color: #fff;
        margin: auto;
        display: none;
        text-align: center;
        top: 0;
        left: 0;
        border: soloid 1px #000;
        position: fixed;
    `;

    const addHtml = `<div id="showDialogElm" style="${style}"></div>`;
    document.body.innerHTML += addHtml;
}());


function dialog(innerHTML = "") {
    if (innerHTML == "") {
        showDialogElm.style.display = "none";
        return;
    }

    showDialogElm.style.display = "block";
    showDialogElm.innerHTML = innerHTML;
}