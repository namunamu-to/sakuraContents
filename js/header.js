(function () {
    let addHtml = ` 
    <header id="headerElm" class="flex">
        <img id="headerLogo" src="https://galleon.yachiyo.tech/ROGO.png" alt="ロゴ">
        <span id="headerNavElm" class="flex"></span>
    </header>
    
    <style>
    
    </style>
    `;

    document.body.innerHTML += addHtml;

    let files = {
        "index.html": "HOME",
        "games.html": "ゲーム",
        "tools.html": "ツール",
        "blogs.html": "ブログ",
    }

    let nowFile = window.location.href.split("/").pop();
    for (let key of Object.keys(files)){
        const nowPageClass = nowFile == key ? "navNowPage" : "";
        headerNavElm.innerHTML += `<span><a class="${nowPageClass}" href="${"https://galleon.yachiyo.tech/" + key}">${files[key]}</a></span>`;
    }
}())