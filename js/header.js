(function () {
    let addHtml = ` 
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
                color: rgba(0, 0, 0, 0.5);
                text-decoration: none;
                padding: 10px 15px;
                transition: color 0.5s ease;
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

    document.body.innerHTML += addHtml;

    let files = {
        "index.html": "会社概要",
        "unilink.html": "UniLinkの紹介",
        "appIntro.html": "アプリの紹介",
        "aboutYachiyo.html": "八千代技研について",
        "humanResourceRecruit.html": "人材募集",
        "lab.html": "ラボ",
    }

    let nowFile = window.location.href.split("/").pop();
    console.log(nowFile);

    for (let key of Object.keys(files)) {
        const nowPageClass = nowFile == key ? "nowPage" : "";
        headerNavElm.innerHTML += `
            <li><a class="${nowPageClass}" href="${"./" + key}">${files[key]}</a></li>                
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
}())