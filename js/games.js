(function () {
    let addHtml = `
        <!-- ゲーム一覧 -->
        <div class="contentsListWrap">
            <h1 class="contentListHeadding">Games</h1>
            <div class="contentList gameContentsList">
    `;

    addGame("リアルタイム制将棋", "フレンドや世界中の人と気軽に対戦！", "games/ruleCollapseShogi/index.html", "/games/ruleCollapseShogi/img/icon.png");
    addGame("ブロック崩し", "君は何ブロック破壊できるかな？", "games/BlockBreaker/index.html", "/games/BlockBreaker/icon.png");
    addGame("ローグライクゲーム(PC推奨)", "無限ダンジョン！どこまで進めるかな？", "games/dungeonGame/index.html", "/games/dungeonGame/img/icon.png");
    addGame("連打ンピック(PC推奨)", "世界中の奴らと連打力で競い合え！", "games/mashGame/index.html", "/games/mashGame/img/icon.png");
    addGame("azゲーム(キーボード必須)", "世界中の奴らとタイピング速度を競おう！", "games/azInputGame/index.html", "/games/azInputGame/img/icon.png");
    addGame("オセロ", "暇つぶしでシンプルなオセロを気軽に", "games/othello/index.html", "/games/othello/img/icon.png");
    addGame("草引っこ抜く", "おふざけ癒し系！", "games/pullOutGrass/aseprite.html", "/games/pullOutGrass/images/icon.png");
    addGame("動物島", "動物を探そう！", "/games/animal_island/index.html", "/games/animal_island/icon.png");
    addGame("ドロップカラー(PC推奨)", "同じ色のバブルを積み上げるゲーム", "games/DropCollar/index.html", "/games/DropCollar/icon.png");
    addGame("ビンゴ", "オンラインで知り合いと気軽にビンゴ!!", "/games/Bingo/index.html", "/games/Bingo/icon.png");
    // addGame("ウォーターゲーム", "懐かしのおもちゃをデジタルで！", "games/WaterGame/index.html", "/games/WaterGame/img/bg_natural_ocean.jpg")

    function addGame(title, summary, contentsHref, iconSrc) {
        addHtml += `
            <a class="contentBlock" href="${contentsHref}" target="_blank">
                <img class="contentIcon" src="${iconSrc}">
                <div class="contentText">
                    <p class="contentTitle">${title}</p>
                    <p class="contentSummary">${summary}</p>
                </div>
            </a>
        `
    }

    document.body.innerHTML += addHtml + `</div></div>`;
}())