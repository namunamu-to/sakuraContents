

let nowPath = window.location.pathname;


let files = {
    "index.html": {
        "title": "会社概要",
        "heroImgText": "株式会社八千代技研",
        "heroImg": "top_header.jpg",
        "href": "/index.html"
    },
    "unilink.html": {
        "title": "UniLinkの紹介",
        "heroImgText": "UniLink",
        "heroImg": "unilink_header.png",
        "href": "/unilink.html"
    },
    "appinfo.html": {
        "title": "アプリの紹介",
        "heroImgText": "アプリの紹介",
        "heroImg": "app_header.png",
        "href": "/appinfo.html"
    },
    "about.html": {
        "title": "八千代技研について",
        "heroImgText": "",
        "heroImg": "about_header.jpg",
        "href": "/about.html"
    },
    "recruit.html": {
        "title": "人材募集",
        "heroImgText": "人材募集",
        "heroImg": "recruit_header.jpg",
        "href": "/recruit.html"
    },
    "lab.html": {
        "title": "ラボ",
        "heroImgText": "社員の研究成果",
        "heroImg": "lab_header.png",
        "href": "/lab.html"
    },
    "scratchLearn": {
        "title": "子供向けScratch講座",
        "heroImgText": "",
        "heroImg": "",
        "href": "https://github.com/ayanoy333/scratchForKids/blob/master/readme.md"
    },
    "contact.html": {
        "title": "お問い合わせ",
        "heroImgText": "お問い合わせ",
        "heroImg": "about_header.jpg",
        "href": "/contact.html"
    },
    "another": {
        "title": "ラボ",
        "heroImgText": "",
        "heroImg": "lab_header.png",
        "href": "/index.html"
    }
}

let nowFileKey = nowPath.substring(nowPath.lastIndexOf('/') + 1) || "index.html";
nowFileKey = nowFileKey in files ? nowFileKey : "another";
const prop = files[nowFileKey];

//header
const header = document.createElement("header");
header.id = "header";
document.body.prepend(header);

header.innerHTML += `
    <div id="burgerMenu">
        <span></span>
        <span></span>
        <span></span>
    </div>
    <nav>
        <ul id="headerNavElm"></ul>
    </nav>
    `

//heroImg
const heroImgElm = document.createElement("div");
heroImgElm.classList.add('heroImg');
heroImgElm.innerHTML = `
    <canvas id="bg-canvas"></canvas>
    <div class="heroText">${prop["heroImgText"]}</div>
`;
header.insertAdjacentElement("afterend", heroImgElm);


const headerNavElm = document.getElementById('headerNavElm');
for (let key of Object.keys(files)) {
    if (key == "another") continue;

    const nowPageClass = nowFileKey == key ? "nowPage" : "";
    headerNavElm.innerHTML += `
            <li><a class="${nowPageClass}" href="${files[key]["href"]}">${files[key]["title"]}</a></li>
        `;
}


window.addEventListener('scroll', function () {
    var header = document.getElementById('header');
    if (window.scrollY > 50) { // スクロール位置が50pxを超えたら
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const burgerMenu = document.getElementById('burgerMenu');
    const header = document.getElementById('header');
    burgerMenu.addEventListener('click', function () {
        header.classList.toggle('active');
    });
});


document.body.innerHTML += `
    <style>
#header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 500;
  padding: 1rem;
  height: 2rem;
}

#header.scrolled {
    background-color: #212121;
    }
    
    #header nav {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 0;
  padding-right: 2rem;
  }
  
#header nav ul {
    display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
  }
  /* 初期リンクの色 */
#header nav a {
    color: #fff;
  text-decoration: none;
  padding: 10px 10px;
}

/* スクロール後の色 */
#header.scrolled nav a {
    color: #fff;
}

#header.scrolled nav a.nowPage {
    color: #7db6b1;
    }
    
/*
 * heroImgコンテナ
 * z-indexの基準を設定し、コンテンツを中央に配置
 */
.heroImg {
    width: 100%;
    height: 340px;
    position: relative;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
}

/* * 背景画像とフィルターの擬似要素
 * z-indexを正の値にすることで、親要素の前面に表示
 */
.heroImg::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    background-image: url(/img/${prop["heroImg"]});
    background-size: cover;
    background-position: center center;
    filter: brightness(80%);
    z-index: 1; /* z-indexを1に変更 */
}

/*
 * 背景キャンバス
 * z-indexを正の値に変更し、背景画像の上に配置
 */
#bg-canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2; /* z-indexを2に変更 */
}

/*
 * ヒーローテキスト
 * canvasの上に表示させるため、z-indexを明示的に設定
 */
.heroImg .heroText {
    position: relative; /* z-indexを機能させるために必要 */
    font-family: 'Helvetica Neue', 'Arial', sans-serif;
    font-size: 3rem;
    color: #fff;
    letter-spacing: 0.1em;
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.5), 0 0 20px rgba(255, 255, 255, 0.3);
    z-index: 3; /* z-indexを3に変更 */
}

    /* --- ハンバーガーメニュー --- */
    #burgerMenu {
        display: none; /* PCでは非表示 */
        position: fixed;
        top: 20px;
        left: 20px;
        width: 30px;
        height: 22px;
  cursor: pointer;
  z-index: 1001;
  }
  
  #burgerMenu span {
    display: block;
    position: absolute;
  left: 0;
  width: 100%;
  height: 3px;
  background-color: #fff;
  transition: all 0.3s ease-in-out;
  }
  
#burgerMenu span:nth-of-type(1) {
    top: 0;
    }
    #burgerMenu span:nth-of-type(2) {
        top: 9px;
        }
        #burgerMenu span:nth-of-type(3) {
  bottom: 0;
  }
  
  /* メニューオープン時のアイコン変化 */
  #header.active #burgerMenu span:nth-of-type(1) {
    transform: translateY(9px) rotate(45deg);
    }
#header.active #burgerMenu span:nth-of-type(2) {
    opacity: 0;
    }
    #header.active #burgerMenu span:nth-of-type(3) {
        transform: translateY(-9px) rotate(-45deg);
        }
        
@media only screen and (max-width: 768px) {
    .heroImg {
        height: 250px;
        }
        
        .heroImg .heroText {
            font-size: 2rem;
  }
  
  #burgerMenu {
    display: block; /* スマホで表示 */
    }
    
    #header nav {
    display: none; /* デフォルトでナビゲーションを非表示 */
    position: fixed;
    top: 0;
    left: 0;
    width: fit-content;
    height: 100vh;
    background-color: #000;
    z-index: 1000;
    }

    #header.active nav {
    display: flex; /* activeクラスが付いたら表示 */
    align-items: flex-start; /* 垂直上揃え */
    padding-top: 5rem;
    }
    
  #header.active nav ul {
    flex-direction: column;
  }
  
  #header.active nav ul li {
    margin: 1rem 0;
    }
}
    </style>
`





//three.js
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';
console.log(THREE);


// --- DOM要素の取得 ------------------------------------
const canvas = document.getElementById('bg-canvas');
canvas.width = canvas.parentNode.clientWidth;
canvas.height = canvas.parentNode.clientHeight;
console.log(canvas);


// --- ヘルパー関数: 円形のテクスチャを作成 ----------------
function createCircleTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const context = canvas.getContext('2d');

    const val1 = canvas.width / 2;
    const val2 = canvas.height / 2;
    const gradient = context.createRadialGradient(
        val1, val2, 0,
        val1, val2, val1
    );
    gradient.addColorStop(0, 'rgba(255,255,255,1)');
    gradient.addColorStop(0.2, 'rgba(255,255,255,1)');
    gradient.addColorStop(0.5, 'rgba(255,255,255,0.3)');
    gradient.addColorStop(1, 'rgba(255,255,255,0)');

    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);

    const texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
    return texture;
}
let circleTexture = createCircleTexture();

// --- 基本設定 -------------------------------------------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
camera.position.z = 10; // 球体全体が映るようにカメラを引く

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true // CSSの背景色を透過させる
});
renderer.setSize(canvas.clientWidth, canvas.clientHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// --- 形状（線とパーティクル）の作成 ---------------------
// 共通のジオメトリを作成 (二十面体を細分化)
const plexusGeometry = new THREE.IcosahedronGeometry(6, 15); // 半径を大きく、ディテールを細かく

// パーティクルの作成
const particlesMaterial = new THREE.PointsMaterial({
    color: 0x4488ff, // テキストとのコントラストを出すために、やや深い青に変更
    size: 0.01, // パーティクルサイズを1/3に
    blending: THREE.NormalBlending, // 発光を抑えるためにNormalBlendingに変更
    transparent: true,
    opacity: 0.8, // 透明度を設定
});
const particles = new THREE.Points(plexusGeometry, particlesMaterial);
scene.add(particles);

// 線の作成
const lineMaterial = new THREE.LineBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.25 // 球体の線を少しだけ見やすくする
});
const wireframe = new THREE.LineSegments(plexusGeometry, lineMaterial);
scene.add(wireframe);

// --- 背景パーティクル（銀河）の作成 ---------------------
const starCount = 1000;
const starPositions = new Float32Array(starCount * 3);
const starColors = new Float32Array(starCount * 3);

const colorCenter = new THREE.Color(0x87cefa); // 銀河中心部の色 (青白)

const plexusRadius = 6.0; // 中央の球体の半径 (ジオメトリと合わせる)
const exclusionRadius = plexusRadius + 0.5; // パーティクルを描画しない半径 (少し余裕を持たせる)
const outerRadius = 25; // パーティクルが広がる外側の半径

for (let i = 0; i < starCount; i++) {
    // 球体の外側にのみパーティクルを生成する
    const r = (Math.random() * (exclusionRadius)) + exclusionRadius;
    const theta = 2 * Math.PI * Math.random(); // 経度
    const phi = Math.acos(2 * Math.random() - 1); // 緯度

    const x = r * Math.sin(phi) * Math.cos(theta);
    const y = r * Math.sin(phi) * Math.sin(theta); // 扁平化をやめて球状に広げる
    const z = r * Math.cos(phi);

    starPositions[i * 3] = x;
    starPositions[i * 3 + 1] = y;
    starPositions[i * 3 + 2] = z;

    starColors[i * 3] = colorCenter.r;
    starColors[i * 3 + 1] = colorCenter.g;
    starColors[i * 3 + 2] = colorCenter.b;
}

const starGeometry = new THREE.BufferGeometry();
starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
starGeometry.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

const starMaterial = new THREE.PointsMaterial({
    size: 0.2,
    transparent: true,
    depthWrite: false,
    vertexColors: true, // 頂点ごとの色を有効にする
    map: circleTexture,
});
const starfield = new THREE.Points(starGeometry, starMaterial);
scene.add(starfield);

// --- アニメーション -------------------------------------
const clock = new THREE.Clock();

function updateRotateSpeed() {
    rotationSpeedX = (Math.random() - 0.5) * 0.01;
    rotationSpeedY = (Math.random() - 0.5) * 0.01;
}

let lastChangeTime = 0;
let rotationSpeedX = 0;
let rotationSpeedY = 0;
updateRotateSpeed();

function animate() {
    requestAnimationFrame(animate);
    let elapsedTime = clock.getElapsedTime();

    // 2秒ごとにランダムな回転速度を更新
    if (elapsedTime - lastChangeTime > 2.5) {
        updateRotateSpeed();
        lastChangeTime = elapsedTime;
    }

    // 回転を加算
    wireframe.rotation.x += rotationSpeedX;
    wireframe.rotation.y += rotationSpeedY;
    starfield.rotation.x += rotationSpeedX * 0.4; // 星は少しゆっくり
    starfield.rotation.y += rotationSpeedY * 0.4;

    // カメラの向き
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
}

animate();

// --- ウィンドウリサイズ対応 -------------------------------
window.addEventListener('resize', () => {
    const width = canvas.parentNode.clientWidth;
    const height = canvas.parentNode.clientHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});