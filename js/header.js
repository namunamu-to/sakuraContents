(function() {
    let addHtml = ` 
        <img src="https://galleon.yachiyo.tech/ROGO.png" class="titleLogo w-auto h-10 my-3" alt="ロゴ">

        <nav id="headerNavElm" class="mainBgColor nav py-3 mb-5">
            <a class="nav-link" href="https://galleon.yachiyo.tech/index.html">ホーム</a>
        </nav>

        <style>
            .titleLogo {
                width: auto;
                height: 10rem;
            }

            .mainBgColor {
                background-color: #a9dff3;
            }
        </style>
    `;

    document.body.innerHTML += addHtml;
}())