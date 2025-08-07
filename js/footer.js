(function() {
    const addHtml = ` 
        <footer id="footerElm">
        <div>
            &copy;八千代技研
        </div>
        </footer>

        <style>
            #footerElm {
                padding-top: 2rem;
                padding-bottom: 2rem;
                background-color: #000;
                color: #fff;
                text-align: center;
                font-size: 2rem;
            }
        </style>
    `;

    document.body.innerHTML += addHtml;
}())
