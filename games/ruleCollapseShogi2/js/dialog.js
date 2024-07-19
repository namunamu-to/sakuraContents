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
        right: 0;
        left: 0;
        z-index: 1000;
    `;

    const addHtml = `<div class="position-fixed border border-dark" id="showDialogElm" style="${style}"></div>`;
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