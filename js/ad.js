function ad() {
    let addHtml = `
    <div class="center-block">
    <script
        type="text/javascript">rakuten_design = "slide"; rakuten_affiliateId = "2a999ef6.111edc6b.2a999ef7.f7a84582"; rakuten_items = "ctsmatch"; rakuten_genreId = "0"; rakuten_size = "336x280"; rakuten_target = "_blank"; rakuten_theme = "gray"; rakuten_border = "off"; rakuten_auto_mode = "on"; rakuten_genre_title = "off"; rakuten_recommend = "on"; rakuten_ts = "1713770955273";</script>
    <script type="text/javascript"
        src="https://xml.affiliate.rakuten.co.jp/widget/js/rakuten_widget.js?20230106"></script>
    </div>
    `;

    document.querySelector(".ad").innerHTML += addHtml;
}