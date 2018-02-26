// MIT © 2018 azu
"use strict";

function loadImage(imagePath) {
    return new Promise(function(resolve, reject) {
        var img = new Image();
        img.addEventListener('load', function() {
            resolve(img);
        });
        img.src = imagePath;
    });
}

const imageSize = {
    width: 620,
    height: 420
};
const images = [
    "img/0.jpg",
    "img/1.jpg",
    "img/2.jpg",
    "img/3.jpg"
];
const canvasSize = {
    width: imageSize.width,
    height: imageSize.height * images.length
};

function draw(ctx) {
    const promises = images.map(imagePath => {
        return loadImage(imagePath)
    });
    console.log(promises);
    Promise.all(promises).then(function(images) {
        ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);
        images.forEach((image, index) => {
            ctx.drawImage(image, 0, index * imageSize.height, imageSize.width, imageSize.height);
        });
    });
}

(() => {
    const canvas = document.querySelector("#js-canvas");
    document.querySelector("#js-save-button").addEventListener("click", () => {
        domtoimage.toBlob(document.getElementById('js-canvas-comic-bubbles-wrapper'))
            .then(function(blob) {
                window.saveAs(blob, 'my-node.png');
            });
    });
    canvas.width = canvasSize.width;
    canvas.height = canvasSize.height;
    const ctx = canvas.getContext('2d');
    draw(ctx);
    const comicBubble = new ComicBubbles("js-canvas", { canvas: { readonly: false } }, {
        bubble: [
            {
                id: 'b1519644554362',
                text: "ちょうど2010年から2011年くらい、IT業界ではHTML5がブームでした。",
                x: 49,
                y: 43,
                width: 213,
                height: 128,
                fontSize: '24px',
                textAlign: 'justify',
                background: '#ffdab9',
                bubbleStyle: 'speak',
                tailLocation: 'se',
                tailX: 336,
                tailY: 157
            },
            {
                id: 'b1519649519140',
                text: "エンジニアというのは「常に泳いでいないと死んじゃうマグロみたいな人たち」",
                x: 367,
                y: 1318,
                width: 217,
                height: 105,
                fontSize: '22px',
                textAlign: 'justify',
                background: '#ffd700',
                color: '#2f4f4f',
                bubbleStyle: 'speak',
                tailLocation: 'sw',
                tailX: 301,
                tailY: 1458
            },
            {
                id: 'b1519644880037',
                text: "マイルストーンごとにきちんと仕様を固める必要があり、それに伴うミーティングが多かった。",
                x: 42,
                y: 789,
                width: 174,
                height: 111,
                fontSize: '18px',
                textAlign: 'justify',
                background: '#008080',
                color: '#fffaf0',
                bubbleStyle: 'think',
                tailLocation: 'se',
                tailX: 287,
                tailY: 1002
            },
            {
                id: 'b1519644672154',
                text: "JavaScriptをバリバリ使うようになり、ゲーム開発のためのフレームワークやライブラリもたくさん作りましたね。",
                x: 337,
                y: 401,
                width: 245,
                height: 141,
                fontSize: '22px',
                textAlign: 'justify',
                background: '#e6e6fa',
                bubbleStyle: 'speak',
                tailLocation: 'sw',
                tailX: 268,
                tailY: 587
            }
        ]
    });
})();
