(function () {
    let addHtml = ` 
    <header id="headerElm" class="header-flex">
        <img id="headerLogo" src="https://galleon.yachiyo.tech/ROGO.png" alt="ロゴ">
        <span id="headerNavElm" class="header-flex"></span>
    </header>
    
    <style>
        .header-flex {
            display: flex;
            flex-wrap: wrap;
        }

        #headerElm {
            font-size: 1rem;
            color: #fff;
            align-items: center;
            background-color: #000;
            width: auto;
            height: fit-content;
            gap: 1rem;
        }

        #headerElm a {
            text-decoration: none;
            color: #fff;
        }

        #headerElm a:hover {
            opacity: 0.5;
        }

        #headerLogo {
            height: 8rem;
            width: auto;
            margin: 1rem;
        }

        #headerNavElm {
            font-size: 2rem;
            gap: 2rem;
            margin: 1rem;
            justify-content: center;
        }

        .navNowPage {
            border-bottom: solid 3px #a9dff3;
            font-weight: bold;
        }
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