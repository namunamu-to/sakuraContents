(function () {
    let addHtml = `
        <!-- ゲーム一覧 -->
        <div class="contentsListWrap">
            <h1 class="contentListHeadding">Games</h1>
            <div class="contentList gameContentsList">

                <a class="contentBlock" href="games/ruleCollapseShogi/index.html" target="_blank">
                    <img class="contentIcon" src="./games/ruleCollapseShogi/img/icon.png">
                    <div class="contentText">
                        <p class="contentTitle">リアルタイム制将棋</p>
                        <p class="contentSummary">フレンドや世界中の人と気軽に対戦！</p>
                    </div>
                </a>

                <a class="contentBlock" href="games/BlockBreaker/index.html" target="_blank">
                    <img class="contentIcon" src="./games/BlockBreaker/icon.png">
                    <div class="contentText">
                        <p class="contentTitle">ブロック崩し</p>
                        <p class="contentSummary">君は何ブロック破壊できるかな？</p>
                    </div>
                </a>

                <a class="contentBlock" href="games/WaterGame/index.html" target="_blank">
                    <img class="contentIcon" src="./games/WaterGame/img/bg_natural_ocean.jpg">
                    <div class="contentText">
                        <p class="contentTitle">ウォーターゲーム</p>
                        <p class="contentSummary">懐かしのおもちゃをデジタルで！</p>
                    </div>
                </a>

                <a class="contentBlock" href="games/dungeonGame/index.html" target="_blank">
                    <img class="contentIcon" src="./games/dungeonGame/img/icon.png">
                    <div class="contentText">
                        <p class="contentTitle">ローグライクゲーム</p>
                        <p class="contentSummary">無限ダンジョン！</p>
                    </div>
                </a>

                <a class="contentBlock" href="games/mashGame/index.html" target="_blank">
                    <img class="contentIcon" src="./games/mashGame/img/icon.png">
                    <div class="contentText">
                        <p class="contentTitle">連打ンピック</p>
                        <p class="contentSummary">世界中の奴らと連打力で競い合え！</p>
                    </div>
                </a>

                <a class="contentBlock" href="games/azInputGame/index.html" target="_blank">
                    <img class="contentIcon" src="./games/azInputGame/img/icon.png">
                    <div class="contentText">
                        <p class="contentTitle">azゲーム</p>
                        <p class="contentSummary">世界中の奴らとタイピング速度を競おう！</p>
                    </div>
                </a>

                <a class="contentBlock" href="games/othello/index.html" target="_blank">
                    <img class="contentIcon" src="./games/othello/img/icon.png">
                    <div class="contentText">
                        <p class="contentTitle">オセロ</p>
                        <p class="contentSummary">フレンドや世界中の人と気軽に対戦！</p>
                    </div>
                </a>

                <a class="contentBlock" href="games/pullOutGrass/aseprite.html" target="_blank">
                    <img class="contentIcon" src="./games/pullOutGrass/images/icon.png">
                    <div class="contentText">
                        <p class="contentTitle">草引っこ抜く</p>
                        <p class="contentSummary">おふざけ癒し系！</p>
                    </div>
                </a>
                
                <a class="contentBlock" href="games/animal_island/index.html" target="_blank">
                    <img class="contentIcon" src="./games/animal_island/icon.png">
                    <div class="contentText">
                        <p class="contentTitle">動物島</p>
                        <p class="contentSummary">ウォーリーを探せみたいに目当ての動物を探そう！</p>
                    </div>
                </a>

                <a class="contentBlock" href="games/animal_island/index.html" target="_blank">
                    <img class="contentIcon" src="./games/animal_island/icon.png">
                    <div class="contentText">
                        <p class="contentTitle">ドロップカラー</p>
                        <p class="contentSummary">ウォーリーを探せみたいに目当ての動物を探そう！</p>
                    </div>
                </a>

            </div>
        </div>
    `;

    document.body.innerHTML += addHtml;
}())