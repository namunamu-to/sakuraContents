(function () {
    let root =  window.location.href.split("/"); 
    let nowFile = root.pop();
    let parentDir = root.pop();
    
    
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
    <div id="burgerMenu">
            <span></span>
            <span></span>
            <span></span>
            </div>
            <nav>
            <ul id="headerNavElm"></ul>
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
                background: rgba();
                z-index: 500;
                padding: 1rem;
                height: 2rem;
            }

            #header.scrolled {
                background-color: #212121;
                }
                
                #header nav{
                display: flex;
                align-items: center;
                justify-content: flex-start;
                margin: 0;
                padding-right: 2rem; 
                }
                
                #header nav ul {
                display: flex;
                list-style: none;
                padding: 0;
                margin: 0;
                }
                /* 初期リンクの色 */
            #header nav a {
                color: ${prop["initFontColor"]};
                text-decoration: none;
                padding: 10px 10px;
                }
                
                /* スクロール後の色 */
            #header.scrolled nav a {
                color: #fff;
            }
            
            #header.scrolled nav a.nowPage {
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
                background-image: url(/img/${prop["heroImg"]});
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

            /* --- ハンバーガーメニュー --- */
            #burgerMenu {
                display: none; /* PCでは非表示 */
                position: fixed;
                top: 20px;
                left: 20px;
                width: 30px;
                height: 22px;
                cursor: pointer;
                z-index: 1001;
            }
            
            #burgerMenu span {
                display: block;
                position: absolute;
                left: 0;
                width: 100%;
                height: 3px;
                background-color: #fff;
                transition: all 0.3s ease-in-out;
            }

            #burgerMenu span:nth-of-type(1) { top: 0; }
            #burgerMenu span:nth-of-type(2) { top: 9px; }
            #burgerMenu span:nth-of-type(3) { bottom: 0; }
            
            /* メニューオープン時のアイコン変化 */
            #header.active #burgerMenu span:nth-of-type(1) {
                transform: translateY(9px) rotate(45deg);
            }
            #header.active #burgerMenu span:nth-of-type(2) {
                opacity: 0;
                }
            #header.active #burgerMenu span:nth-of-type(3) {
                transform: translateY(-9px) rotate(-45deg);
            }

            @media only screen and (max-width: 768px) {
                .heroImg {
                    height: 250px;
                }
                
                .heroImg .heroText {
                    font-size: 2rem;
                    }

                #burgerMenu {
                    display: block; /* スマホで表示 */
                    }

                    
                    
                #header nav {
                    display: none; /* デフォルトでナビゲーションを非表示 */
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: fit-content;
                    height: 100vh;
                    background-color: #000;
                    z-index: 1000;
                }
                
                #header.active nav {
                    display: flex; /* activeクラスが付いたら表示 */
                    align-items: flex-start; /* 垂直上揃え */
                    padding-top: 5rem;
                    
                    }

                #header.active nav ul {
                    flex-direction: column;
                }

                #header.active nav ul li {
                    margin: 1rem 0;
                }
            }
        </style>
        `;


    const headerNavElm = document.getElementById('headerNavElm');
    for (let key of Object.keys(files)) {
        if (key == "another") continue;
        
        const nowPageClass = parentDir == "yachiyo.tech" &&  nowFile == key ? "nowPage" : "";
        headerNavElm.innerHTML += `
            <li><a class="${nowPageClass}" href="/${key}">${files[key]["title"]}</a></li>
        `;
    }


    window.addEventListener('scroll', function () {
        var header = document.getElementById('header');
        if (window.scrollY > 50) { // スクロール位置が50pxを超えたら
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    document.addEventListener("DOMContentLoaded", () => {
        const burgerMenu = document.getElementById('burgerMenu');
        const header = document.getElementById('header');
        burgerMenu.addEventListener('click', function () {
            console.log("a");
            
            header.classList.toggle('active');
        });
    });
}())
