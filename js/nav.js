(function () {
    let addHtml = ` 
    <nav class="JzO0Vc" jsname="ihoMLd" role="navigation" tabindex="-1" id="yuynLe"
                  jsaction="transitionend:UD2r5">
                  <ul class="jYxBte Fpy8Db" tabindex="-1">
                    <li jsname="ibnC6b" data-nav-level="1">
                      <div class="PsKE7e r8s4j-R6PoUb IKA38e baH5ib oNsfjf lhZOrc" aria-current="true">
                        <div class="I35ICb" jsaction="keydown:mPuKz(QwLHlb); click:vHQTA(QwLHlb);">
                          <a class="aJHbb dk90Ob hDrhEe HlqNPb" jsname="QwLHlb" role="link" tabindex="0"
                            data-navtype="1" aria-selected="true" href="./トップページ.html" data-url="./トップページ.html"
                            data-type="1" data-level="1">トップページ</a>
                        </div>
                      </div>
                    </li>
                    <li jsname="ibnC6b" data-nav-level="1">
                      <div class="PsKE7e r8s4j-R6PoUb IKA38e baH5ib oNsfjf">
                        <div class="I35ICb" jsaction="keydown:mPuKz(QwLHlb); click:vHQTA(QwLHlb);"><a
                            class="aJHbb dk90Ob hDrhEe HlqNPb" jsname="QwLHlb" role="link" tabindex="0" data-navtype="1"
                            href="./unilinkの紹介.html" data-url="./unilinkの紹介.html" data-type="1"
                            data-level="1">UniLinkの紹介</a></div>
                      </div>
                    </li>
                    <li jsname="ibnC6b" data-nav-level="1">
                      <div class="PsKE7e r8s4j-R6PoUb IKA38e baH5ib oNsfjf">
                        <div class="I35ICb" jsaction="keydown:mPuKz(QwLHlb); click:vHQTA(QwLHlb);"><a
                            class="aJHbb dk90Ob hDrhEe HlqNPb" jsname="QwLHlb" role="link" tabindex="0" data-navtype="1"
                            href="./アプリの紹介.html" data-url="./アプリの紹介.html" data-type="1" data-level="1">アプリの紹介</a></div>
                      </div>
                    </li>
                    <li jsname="ibnC6b" data-nav-level="1">
                      <div class="PsKE7e r8s4j-R6PoUb IKA38e baH5ib oNsfjf">
                        <div class="I35ICb" jsaction="keydown:mPuKz(QwLHlb); click:vHQTA(QwLHlb);"><a
                            class="aJHbb dk90Ob hDrhEe HlqNPb" jsname="QwLHlb" role="link" tabindex="0" data-navtype="1"
                            href="./八千代技研について.html" data-url="./八千代技研について.html" data-type="1"
                            data-level="1">八千代技研について</a>
                        </div>
                      </div>
                    </li>
                    <li jsname="ibnC6b" data-nav-level="1">
                      <div class="PsKE7e r8s4j-R6PoUb IKA38e baH5ib oNsfjf">
                        <div class="I35ICb" jsaction="keydown:mPuKz(QwLHlb); click:vHQTA(QwLHlb);"><a
                            class="aJHbb dk90Ob hDrhEe HlqNPb" jsname="QwLHlb" role="link" tabindex="0" data-navtype="1"
                            href="./人材募集.html" data-url="./人材募集.html" data-type="1" data-level="1">人材募集</a></div>
                      </div>
                    </li>
                  </ul>
                </nav>

    <header id="headerElm" class="header-flex">
        <img id="headerLogo" src="//ROGO.png" alt="ロゴ">
        <span id="headerNavElm" class="header-flex"></span>
    </header>
    
    `;

    document.body.innerHTML += addHtml;

    let files = {
        "トップページ.html": "トップページ",
        "unilinkの紹介.html": "unilinkの紹介",
        "アプリの紹介.html": "アプリの紹介",
        "人材募集.html": "人材募集",
        "八千代技研について.html": "八千代技研について",
    }

    

    let nowFile = window.location.href.split("/").pop();
    for (let key of Object.keys(files)){
        const nowPageClass = nowFile == key ? "navNowPage" : "";
        headerNavElm.innerHTML += `<span><a class="${nowPageClass}" href="${"/" + key}">${files[key]}</a></span>`;
    }
}())