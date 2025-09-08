(function() {
    document.body.innerHTML += ` 
        <footer id="footer">
            <div class="footer-links">
                <a href="/contact.html">お問い合わせ</a>
                <a href="/privacy.html">プライバシーポリシー</a>
            </div>
        </footer>

        <style>
            #footer {
                background-color: rgba(50, 50, 50, 1);
                height: 4.5rem;
            }
            .footer-links {
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 2rem; /* リンク間のスペース */
                height: 100%;
            }
                
            .footer-links a {
                color: #fff;
                text-decoration: none;
                transition: color 0.3s ease; /* 色の変化を滑らかにする */
            }

            .footer-links a:hover {
                color: #7e70fe; /* ホバー時の色 */
            }
        </style>
    `;


}())
