(function() {
    document.body.innerHTML += ` 
        <div class="cant-mobile-msg" style="text-align: center; color: red; font-size: 4rem; display: none;">※PCのみ対応</div>

        <style>
            @media screen and (max-width: 768px) {
                .cant-mobile-msg {
                    display: block; /* スマホでは表示 */
                }
    }
        </style>
    `;
}())
