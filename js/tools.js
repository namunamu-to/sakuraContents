(function () {
    let addHtml = `
        <!-- ツール一覧 -->
        <div class="contentsListWrap">
            <h1 class="contentListHeadding">Tools</h1>
            <div class="contentList blogContentsList">

                <a class="contentBlock contentTitle" href="tool/sarroundEachLine.html" target="_blank">
                    <span>文字列を一行ごとに好きな文字で囲うツール</span>
                </a>


                <a class="contentBlock contentTitle" href="https://galleon.yachiyo.tech/tableSimulator" target="_blank">
                    <span>「テーブルシミュレーター」トレカ、ボードゲーム、自由に遊べる！</span>
                </a>
            </div>
        </div>
    `;

    document.body.innerHTML += addHtml;
}())