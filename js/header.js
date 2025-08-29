(function () {
    let nowFile = window.location.href.split("/").pop();
    let files = {
        "index.html": {
            "title": "会社概要",
            "initFontColor": "#fff",
            "heroImgText": "株式会社八千代技研"

        },
        "unilink.html": {
            "title": "UniLinkの紹介",
            "initFontColor": "#fff",
            "heroImgText": "UniLink"
        },
        "appIntro.html": {
            "title": "アプリの紹介",
            "initFontColor": "#fff",
            "heroImgText": ""
        },
        "aboutYachiyo.html": {
            "title": "八千代技研について",
            "initFontColor": "#fff",
            "heroImgText": ""
        },
        "humanResourceRecruit.html": {
            "title": "人材募集",
            "initFontColor": "#fff",
            "heroImgText": "人材募集"
        },
        "lab.html": {
            "title": "ラボ",
            "initFontColor": "#fff",
            "heroImgText": ""
        },
    }
    const prop = files[nowFile]

    document.body.innerHTML += ` 
        <header id="header">
            <nav>
                <ul id="headerNavElm">
                </ul>
                </nav>
                </header>
                
        <style>
            #header {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: flex-end;
                background: rgba();
            }

            #header.scrolled {
                background-color: #212121;
            }

            #header.scrolled .now-page {
                color: rgba(125, 182, 177, 1);
            }

            #header nav {
                padding: 1rem;
            }



            #header nav ul {
                list-style: none;
                margin: 0;
                padding: 0;
                display: flex;
            }


            /* 初期リンクの色 */
                #header nav ul li a {
                color: ${prop["initFontColor"]};
                text-decoration: none;
                padding: 10px 15px;
                
            }

            /* スクロール後の色 */
            #header.scrolled nav ul li a {
                color: #fff;
            }

            #header.scrolled nav ul li .nowPage {
                color: #7db6b1;
            }
        </style>
    `;


    // document.body.innerHTML += addHtml;

    for (let key of Object.keys(files)) {
        const nowPageClass = nowFile == key ? "nowPage" : "";
        headerNavElm.innerHTML += `
            <li><a class="${nowPageClass}" href="${"./" + key}">${files[key]["title"]}</a></li>                
        `;
    }

    document.body.innerHTML += ``;


    window.addEventListener('scroll', function () {
        var header = document.getElementById('header');
        if (window.scrollY > 50) { // スクロール位置が50pxを超えたら
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}())