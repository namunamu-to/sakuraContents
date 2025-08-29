(function () {
    let nowFile = window.location.href.split("/").pop();
    let files = {
        "index.html": {
            "title": "会社概要",
            "initFontColor": "#fff",
            "heroImgText": "株式会社八千代技研",
            "heroImg": "top_header.jpg"
        },
        "unilink.html": {
            "title": "UniLinkの紹介",
            "initFontColor": "#fff",
            "heroImgText": "UniLink",
            "heroImg": "unilink_header.png"
        },
        "appIntro.html": {
            "title": "アプリの紹介",
            "initFontColor": "#fff",
            "heroImgText": "",
            "heroImg": "app_header.png"
        },
        "aboutYachiyo.html": {
            "title": "八千代技研について",
            "initFontColor": "#fff",
            "heroImgText": "",
            "heroImg": "about_header.jpg"
        },
        "humanResourceRecruit.html": {
            "title": "人材募集",
            "initFontColor": "#fff",
            "heroImgText": "人材募集",
            "heroImg": "human_resources_recruit_header.jpg"
        },
        "lab.html": {
            "title": "ラボ",
            "initFontColor": "#fff",
            "heroImgText": "社員の研究成果",
            "heroImg": "lab_header.png"
        },
        "another": {
            "title": "ラボ",
            "initFontColor": "#fff",
            "heroImgText": "",
            "heroImg": "lab_header.png"
        },
        
    }

    nowFile = nowFile in files ? nowFile : "another"
    const prop = files[nowFile]

    document.body.innerHTML += ` 
        <header id="header">
            <nav>
                <ul id="headerNavElm">
                </ul>
            </nav>
        </header>

        <div class="heroImg">
          <div class="heroText">${prop["heroImgText"]}</div>
        </div>
            
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
                z-index: 500;
            }

            #header.scrolled {
                background-color: #212121;
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

            #header.scrolled nav ul li a.nowPage {
                color: #7db6b1;
            }

            .heroImg {
                width: 100%;
                height: 340px;

                /* 擬似要素を配置するために必要 */
                position: relative;

                /* 擬似要素がはみ出さないように */
                overflow: hidden;

                /* 子要素（.heroText）を中央に配置 */
                display: flex;
                justify-content: center;
                align-items: center;
            }

            .heroImg::before {
                /* 擬似要素にはcontentプロパティが必須 */
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;

                /* 背景画像とフィルターのスタイルをここに移動 */
                background-image: url(./img/${prop["heroImg"]});
                background-size: cover;
                background-position: center center;
                filter: brightness(30%);
                opacity: 0.9;
                z-index: -1;
            }

            .heroImg .heroText {
                font-size: 3rem;
                color: #fff;
            }


            @media only screen and (max-width: 479px) {
                .heroImg {
                    height: 250px;
                }
            }

        </style>
    `;


    for (let key of Object.keys(files)) {
        if(key == "another") continue;

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