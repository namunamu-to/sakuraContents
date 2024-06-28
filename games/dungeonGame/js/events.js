function turnToPlayer(char) {
    const plDiffX = selfChar.x - char.x;
    const plDiffY = selfChar.y - char.y;
    char.dir = getDir(plDiffX, plDiffY);
}

function getAbsDist(x1, x2, y1, y2) {
    return [Math.abs(x1 - x2), Math.abs(y1 - y2)]
}

function enemysAction() {
    for (let enemy of nowFloorChars) {
        if (!enemy.isEnemy) continue; //敵じゃなかったら何もしない

        const distanceX = selfChar.x - enemy.x;
        const distanceY = selfChar.y - enemy.y;
        let [absDistX, absDistY] = getAbsDist(selfChar.x, enemy.x, selfChar.y, enemy.y)
        if (absDistX < seeRadius && absDistY < seeRadius) {
            let toX = enemy.x;
            let toY = enemy.y;
            let diffX = distanceX / absDistX;
            let diffY = distanceY / absDistY;
            if (absDistX == 0) diffX = 0;
            if (absDistY == 0) diffY = 0;

            if (2 <= absDistX || 2 <= absDistY) { //プレイヤーの周囲にいない時
                toX += diffX;
                toY += diffY;


                if (isCanMove(toX, toY) == false) { //プレイヤーに近づけなかった時
                    if (isCanMove(toX - diffX, toY)) toX -= diffX; //縦だけ近づけるなら近づく
                    else if (isCanMove(toX, toY - diffY)) toY -= diffY; //横だけ近づけるなら近づく
                    else { //
                        toX -= diffX;
                        toY -= diffY;
                        for (let key of dirKeys) {
                            let [x, y] = dirs[key];
                            if (isCanMove(toX + x, toY + y)) {
                                toX += x;
                                toY += y;
                                break;
                            }
                        }
                    }

                }

                moveToChar(enemy, toX, toY);
            } else { //移動前、プレイヤーの隣にいるとき
                attack(enemy, selfChar);
            }
        } else { //適当な場所に移動
            for (let key of dirKeys) {
                let [x, y] = dirs[key];
                if (isCanMove(enemy.x + x, enemy.y + y)) {
                    moveChar(enemy, x, y);
                    break;
                }
            }
        }

        //プレイヤーの周囲にいるなら
        [absDistX, absDistY] = getAbsDist(selfChar.x, enemy.x, selfChar.y, enemy.y);
        if (1 >= absDistX && 1 >= absDistY) {
            turnToPlayer(enemy);
        }
    }
}

function attack(atkChar, defChar) {
    drawAttackMotion(atkChar); //攻撃モーション

    defChar.hp = defChar.hp - atkChar.atk;
    toLog(atkChar.name + "は" + `${defChar.name}に${atkChar.atk}のダメージを与えた`);
    if (defChar.hp <= 0) {
        if (defChar.kind == "self") { //死んだキャラがプレイヤーだったらゲームオーバー
            myDialog("GAME OVER", 4000);
            setTimeout(() => {
                window.location.reload();
            }, 3000);

        }

        const defCharIdx = getCharIdxById(defChar.id);
        toLog(defChar.name + "が死んだ");
        nowFloorChars.splice(defCharIdx, 1);
        nowGold += defChar.lv;
        needExp -= defChar.lv * 2;

        if (needExp <= 0) { //プレイヤーがレベルアップ
            lvUp(selfChar);
            const carryOver = needExp;
            needExp = selfChar.lv * 5;
            needExp += carryOver;
        }
    }
}

function toLog(msg) {
    const date = new Date();
    msg = `${date.getHours()}時${date.getMinutes()}分${date.getSeconds()}秒：${msg}`;
    log.push(msg);
}

document.addEventListener('keydown', function (event) {
    if (animating) return;

    let toX = selfChar.x;
    let toY = selfChar.y;
    if (event.key === 'ArrowUp') {
        toY = selfChar.y - 1;
    } else if (event.key === 'ArrowDown') {
        toY = selfChar.y + 1;
    } else if (event.key === 'ArrowLeft') {
        toX = selfChar.x - 1;
    } else if (event.key === 'ArrowRight') {
        toX = selfChar.x + 1;
    } else {
        return;
    }

    //向き変更
    selfChar.dir = getDir(toX - selfChar.x, toY - selfChar.y);

    if (isCanMove(toX, toY)) { //移動できるなら移動
        moveToChar(selfChar, toX, toY);
        enemysAction();


        enemySpawnCount -= 1;
        if (enemySpawnCount == 0) {
            spawnEnemy();
            enemySpawnCount = 30;
        }
    }

    if (map[toY][toX] == "stairs") {
        nowFloor += 1;
        makeFloorMap();
        toLog(nowFloor + "Fに移動");
    }
});


aBtn.addEventListener("click", () => { //aボタンで攻撃
    if (animating) return;
    let [toX, toY] = dirs[selfChar.dir];
    toX += selfChar.x;
    toY += selfChar.y;
    let isEnemy = false;
    for (let enemy of nowFloorChars) {
        if (!enemy.isEnemy) continue; //敵じゃなかったら何もしない
        if (enemy.x == toX && enemy.y == toY) {
            attack(selfChar, enemy);
            isEnemy = true;
        }
    }

    if (isEnemy == false) {
        drawAttackMotion(selfChar);
        toLog("攻撃");
    }

    enemysAction(); //敵も行動
});

bBtn.addEventListener("click", () => {

});

xBtn.addEventListener("click", () => {

});

yBtn.addEventListener("click", () => {

});