// --- ページ情報と現在ページ取得 ---
const files = {
    "index.html": { title: "会社概要", heroImgText: "株式会社八千代技研", heroImg: "top_header.jpg", href: "/index.html" },
    "unilink.html": { title: "UniLinkの紹介", heroImgText: "UniLink", heroImg: "unilink_header.png", href: "/unilink.html" },
    "appinfo.html": { title: "アプリの紹介", heroImgText: "アプリの紹介", heroImg: "app_header.png", href: "/appinfo.html" },
    "about.html": { title: "八千代技研について", heroImgText: "", heroImg: "about_header.jpg", href: "/about.html" },
    "recruit.html": { title: "人材募集", heroImgText: "人材募集", heroImg: "recruit_header.jpg", href: "/recruit.html" },
    "lab.html": { title: "ラボ", heroImgText: "社員の研究成果", heroImg: "lab_header.png", href: "/lab.html" },
    "learnContents": { title: "学習コンテンツ", heroImgText: "", heroImg: "", href: "/learnContents.html" },
    "contact.html": { title: "お問い合わせ", heroImgText: "お問い合わせ", heroImg: "about_header.jpg", href: "/contact.html" },
    "another": { title: "ラボ", heroImgText: "", heroImg: "lab_header.png", href: "/index.html" }
};

const nowFileKey = (() => {
    const path = window.location.pathname;
    const fileName = path.substring(path.lastIndexOf('/') + 1) || "index.html";
    return files[fileName] ? fileName : "another";
})();
const prop = files[nowFileKey];

// --- ヘッダー作成 ---
function createHeader() {
    const header = document.createElement("header");
    header.id = "header";
    header.innerHTML = `
        <div id="burgerMenu"><span></span><span></span><span></span></div>
        <nav><ul id="headerNavElm"></ul></nav>
    `;
    document.body.prepend(header);

    const navElm = document.getElementById("headerNavElm");
    Object.keys(files).forEach(key => {
        if (key === "another") return;
        const nowClass = key === nowFileKey ? "nowPage" : "";
        const file = files[key];
        navElm.innerHTML += `<li><a class="${nowClass}" href="${file.href}">${file.title}</a></li>`;
    });
}

createHeader();

// --- ヒーロー画像作成 ---
function createHero() {
    const hero = document.createElement("div");
    hero.classList.add("heroImg");
    hero.innerHTML = `
        <canvas id="bg-canvas"></canvas>
        <div class="heroText">${prop.heroImgText}</div>
    `;
    const header = document.getElementById("header");
    header.insertAdjacentElement("afterend", hero);
}

createHero();

// --- CSS追加 ---
function injectHeaderCSS() {
    const style = document.createElement("style");
    style.textContent = `
        #header { position: fixed; top: 0; left: 0; width: 100%; z-index: 500; padding: 1rem; height: 2rem; }
        #header.scrolled { background-color: #212121; }
        #header nav { display: flex; align-items: center; justify-content: flex-start; margin: 0; padding-right: 2rem; }
        #header nav ul { display: flex; list-style: none; padding: 0; margin: 0; }
        #header nav a { color: #fff; text-decoration: none; padding: 10px 10px; }
        #header.scrolled nav a.nowPage { color: #7db6b1; }
        .heroImg { width: 100%; height: 340px; position: relative; overflow: hidden; display: flex; justify-content: center; align-items: center; }
        .heroImg::before { content: ""; position: absolute; top:0; left:0; width:100%; height:100%; background-color: rgba(0,0,0,0.4); background-image:url(/img/${prop.heroImg}); background-size: cover; background-position: center; filter: brightness(80%); z-index:1; }
        #bg-canvas { position: absolute; top:0; left:0; width:100%; height:100%; z-index:2; }
        .heroImg .heroText { position: relative; font-family:'Helvetica Neue', Arial, sans-serif; font-size:3rem; color:#fff; letter-spacing:0.1em; text-shadow:0 0 10px rgba(255,255,255,0.5),0 0 20px rgba(255,255,255,0.3); z-index:3; }
        #burgerMenu { display: none; position: fixed; top:20px; left:20px; width:30px; height:22px; cursor:pointer; z-index:1001; }
        #burgerMenu span { display:block; position:absolute; left:0; width:100%; height:3px; background-color:#fff; transition:all 0.3s ease-in-out; }
        #burgerMenu span:nth-of-type(1){top:0;} #burgerMenu span:nth-of-type(2){top:9px;} #burgerMenu span:nth-of-type(3){bottom:0;}
        #header.active #burgerMenu span:nth-of-type(1){transform: translateY(9px) rotate(45deg);}
        #header.active #burgerMenu span:nth-of-type(2){opacity:0;}
        #header.active #burgerMenu span:nth-of-type(3){transform: translateY(-9px) rotate(-45deg);}
        @media only screen and (max-width: 768px) {
            .heroImg { height: 250px; }
            .heroImg .heroText { font-size: 2rem; }
            #burgerMenu { display: block; }
            #header nav { display: none; position: fixed; top:0; left:0; width:fit-content; height:100vh; background-color:#000; z-index:1000; }
            #header.active nav { display: flex; align-items:flex-start; padding-top:5rem; }
            #header.active nav ul { flex-direction: column; }
            #header.active nav ul li { margin: 1rem 0; }
        }
    `;
    document.head.appendChild(style);
}

injectHeaderCSS();

// --- ハンバーガーメニュー ---
document.addEventListener("DOMContentLoaded", () => {
    const burger = document.getElementById("burgerMenu");
    const header = document.getElementById("header");
    burger.addEventListener("click", () => header.classList.toggle("active"));

    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) header.classList.add("scrolled");
        else header.classList.remove("scrolled");
    });
});

// --- Three.js 初期化 ---
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';

function createCircleTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = 64;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(32,32,0,32,32,32);
    grad.addColorStop(0,'rgba(255,255,255,1)');
    grad.addColorStop(0.2,'rgba(255,255,255,1)');
    grad.addColorStop(0.5,'rgba(255,255,255,0.3)');
    grad.addColorStop(1,'rgba(255,255,255,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0,0,64,64);
    const texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
    return texture;
}

function initThreeJS() {
    const canvas = document.getElementById('bg-canvas');
    canvas.width = canvas.parentNode.clientWidth;
    canvas.height = canvas.parentNode.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth/canvas.clientHeight, 0.1, 100);
    camera.position.z = 10;

    const renderer = new THREE.WebGLRenderer({canvas, antialias:true, alpha:true});
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));

    const texture = createCircleTexture();
    const geometry = new THREE.IcosahedronGeometry(6, 15);

    const points = new THREE.Points(geometry, new THREE.PointsMaterial({color:0x4488ff, size:0.01, blending:THREE.NormalBlending, transparent:true, opacity:0.8}));
    scene.add(points);

    const wireframe = new THREE.LineSegments(geometry, new THREE.LineBasicMaterial({color:0xffffff, transparent:true, opacity:0.25}));
    scene.add(wireframe);

    // 星
    const starCount = 1000;
    const pos = new Float32Array(starCount*3);
    const col = new Float32Array(starCount*3);
    const color = new THREE.Color(0x87cefa);
    for (let i=0;i<starCount;i++){
        const r = Math.random()*6.5 + 6.5;
        const theta = Math.random()*2*Math.PI;
        const phi = Math.acos(2*Math.random()-1);
        pos[i*3] = r*Math.sin(phi)*Math.cos(theta);
        pos[i*3+1] = r*Math.sin(phi)*Math.sin(theta);
        pos[i*3+2] = r*Math.cos(phi);
        col[i*3] = color.r; col[i*3+1]=color.g; col[i*3+2]=color.b;
    }
    const starGeom = new THREE.BufferGeometry();
    starGeom.setAttribute('position', new THREE.BufferAttribute(pos,3));
    starGeom.setAttribute('color', new THREE.BufferAttribute(col,3));
    const starMat = new THREE.PointsMaterial({size:0.2, transparent:true, depthWrite:false, vertexColors:true, map:texture});
    const starfield = new THREE.Points(starGeom, starMat);
    scene.add(starfield);

    let rotX = (Math.random()-0.5)*0.01;
    let rotY = (Math.random()-0.5)*0.01;
    let lastTime = 0;
    const clock = new THREE.Clock();

    function animate() {
        requestAnimationFrame(animate);
        const t = clock.getElapsedTime();
        if (t - lastTime > 2.5) {
            rotX = (Math.random()-0.5)*0.01;
            rotY = (Math.random()-0.5)*0.01;
            lastTime = t;
        }
        wireframe.rotation.x += rotX;
        wireframe.rotation.y += rotY;
        starfield.rotation.x += rotX*0.4;
        starfield.rotation.y += rotY*0.4;
        camera.lookAt(scene.position);
        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize',()=>{
        const w = canvas.parentNode.clientWidth;
        const h = canvas.parentNode.clientHeight;
        camera.aspect = w/h;
        camera.updateProjectionMatrix();
        renderer.setSize(w,h);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
    });
}

initThreeJS();
