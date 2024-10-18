(function () {
    let addHtml = ` 
    <nav id="headerElm">
        <img id="headerLogo" src="https://galleon.yachiyo.tech/ROGO.png" alt="ロゴ">

        <span id="headerNavElm"></span>
    </nav>    
    

    <style>
        #headerElm {
            font-size: 16px;
            color: #fff;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            padding: 1rem;
            background-color: #000;
            width: 100vw;
            height: fit-content;
            padding: 1rem
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
            width: auto
        }
        
        #headerNavElm {
            font-size: 2rem;
            display: flex;
            flex-wrap: wrap;

            gap: 1rem;
        }
        
        #headerNavElm > * {
            margin-left: 2rem;
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
        headerNavElm.innerHTML += `<span><a class="navLink ${nowPageClass}" href="${"https://galleon.yachiyo.tech/" + key}">${files[key]}</a></span>`;
    }
}())