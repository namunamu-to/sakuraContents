function isPickUp(spr) {
    if (spr.isTouched()) {
        // Pickupが終わったら消えるように設定
        spr.setTagNames(["Pickup", "DIE"]);
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

async function dispatch() {
    // 最大６０個にしておく
    if (gPrim.primitives.length <= 60) {
        // 乱数で座標を生成
        var x = 32 + getRandomInt(640 - 64);
        var y = 32 + getRandomInt(480 - 64);
        
        // ["Mebae", "Idle","REPEAT"]のように指定すると、Mebae、Idleの順に実行した後、Idleをリピートする
        // ["Mebae", "Idle","DIE"]の場合はIdleを実行した後Spriteが消える
        var sp = await Sprite.build("Futaba", jsMebae, ["Mebae", "Idle", "REPEAT"], x, y, 1, 0);
        sp.addPhysic(isPickUp);
        gPrim.append(sp);

        console.log("dispatched", x, y)
    }
    nextTime = 3 + getRandomInt(5) * 1000;
    setTimeout(dispatch, nextTime);
}