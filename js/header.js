(function () {
    let addHtml = ` 
    
    <nav id="headerNavElm" class="mainBgColor nav py-3 mb-5 ">
        <span></span>
        <img id="headerLogo" src="https://galleon.yachiyo.tech/ROGO.png" alt="ロゴ">
        <span>
            <a class="navLink" href="https://galleon.yachiyo.tech/index.html">HOME</a>
        </span>
    </nav>
    
    

    <style>
        #headerNavElm {
            height: 10rem;
            gap: 2rem;
            color: #fff;
            font-size: 2rem;
            align-items: center;
        }

            
        #headerNavElm a {
            text-decoration:none;
            color: #fff;
            border-bottom: solid 3px #66deff;
        }

        #headerLogo {
            height: 100%;
        }

        .mainBgColor {
            background-color: #000;
        }
    </style>
    `;

    const urls = {
        
    }

    document.body.innerHTML += addHtml;
}())