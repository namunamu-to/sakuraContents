const audioPath = 'chime.mp3';
let generatedNumbers = [];
const bingoCard = document.getElementById('bingo-card');
const setIntervalBtn = document.getElementById('set-interval-btn');
const roomPasswordInput = document.getElementById('room-password');
const guestNameInput = document.getElementById('Gest-Name');
const memberContainer = document.getElementById('menber');

// 数字の履歴を保存するためのセット
const displayedNumbers = new Set();
const GestdisplayedNumbers = new Set();
let pollInterval;

setIntervalBtn.addEventListener('click', handleSetIntervalBtnClick); 
createRoomButton.addEventListener('click', createRoom);
bingonmButton.addEventListener('click',BingoNumber);
joinRoomButton.addEventListener('click', joinRoom);

function toggleHostUI(isHost) {
    hostNumber.style.display = isHost ? "block" : "none";
    bingonmButton.style.display = isHost ? "block" : "none";
    createRoomButton.style.display = isHost ? 'none' : 'block';
    joinRoomButton.style.display = isHost ? "block" : 'none';
}

function createRoom() {
    // ホスト用ビンゴナンバー表示
    toggleHostUI(true);

    // サーバーに/create-roomエンドポイントにPOSTリクエストを送信
    fetch('https://galleon.yachiyo.tech/Bingo/create-room', { method: 'POST' })
    .then(handleResponse)
    .then(data => {
        if (data.password) {
            alert(`生成されたパスワード: ${data.password}`);
        } else {
            alert('部屋のパスワードを生成できませんでした');
        }
    })
    .catch(handleError);
}

async function joinRoom() {
    const password = roomPasswordInput.value.trim();
    const guestName = guestNameInput.value.trim();

    if (!guestName || !password) {
        alert('名前とパスワードを入力してください');
        return;
    }
    try {
        const response = await fetch('https://galleon.yachiyo.tech/Bingo/join-room', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: guestName, password })
        });

        const data = await response.json(); 

        if (data.message) {
            alert(data.message);
        }

        if (response.ok) {
            joinRoomButton.style.display = "none";
            startPolling(password); 
        }
    } catch (error) {
        handleError(error); 
    }
}

// ビンゴカード出すための関数
function handleSetIntervalBtnClick() {
     rowmt.style.display = 'block';
    // 新しいゲームの開始をサーバーに要求し、ビンゴカードをレンダリングする
    fetch('https://galleon.yachiyo.tech/Bingo/new-game')
        .then(response => response.json())
        .then(data => renderBingoCard(data))
        .catch(handleError);
}

function BingoNumber() {
    const password = roomPasswordInput.value.trim();

    fetch(`https://galleon.yachiyo.tech/Bingo/get-number?password=${encodeURIComponent(password)}`)
        .then(handleResponse)
        .then(data => {
            if (data && Array.isArray(data.numbers)) {
                data.numbers.forEach(numberValue => {
                    if (!displayedNumbers.has(numberValue)) {
                        hostNumber.innerText = `ナンバー: ${numberValue}`;
                        displayedNumbers.add(numberValue);
                        generatedNumbers.push(numberValue);
                    }
                });
                enableClickableCells();
                playAudio(audioPath); 
            } else {
                console.error('無効なデータ形式が返されました');
            }
        })
        .catch(handleError);
}
    
 function pollNumbers(password) {
    fetch(`https://galleon.yachiyo.tech/Bingo/get-guest-numbers?password=${encodeURIComponent(password)}`)
        .then(handleResponse)
        .then(data => {
            if (data.numbers) {
                data.numbers.forEach(numberValue => {
                    if (!GestdisplayedNumbers.has(numberValue)) {
                        number.innerText = `Newナンバー: ${numberValue}`;
                        logContainer.innerText += `ログ: ${numberValue}\n`;
                        GestdisplayedNumbers.add(numberValue);
                        generatedNumbers.push(numberValue);
                    }
                });
                enableClickableCells();
            } else {
                console.error('Invalid data format: Missing numbers');
            }

            if (data.members) {
                memberContainer.innerHTML = '';

                data.members.forEach(member => {
                    const memberElement = document.createElement('div');
                    memberElement.textContent = `${member} が入室しました`;
                    memberContainer.appendChild(memberElement);
                });
            } else {
                console.error('Invalid data format: Missing members');
            }
        })
        .catch(handleError);
}

// パスワードを受け取って5秒ごとにpollNumbersを呼び出す
function startPolling(password) {
    // playAudio(audioPath); 
    pollNumbers(password); 
    setInterval(() => pollNumbers(password), 5000); 
}

// セルがクリック可能になるかどうかを判断する関数
function enableClickableCells() {
    const cells = document.querySelectorAll('.cell'); 
    if (!cells || cells.length === 0) {
        return;
    }
    cells.forEach(cell => {
        const cellNumber = cell.textContent === 'FREE' ? 0 : parseInt(cell.textContent, 10);
        if (Array.isArray(generatedNumbers) && generatedNumbers.length > 0 && 
            (generatedNumbers.includes(cellNumber) || cellNumber === 0)) {
            if (!cell.classList.contains('clickable')) {
                cell.classList.add('clickable');
                cell.addEventListener('click', cellClickHandler); 
            }
        } else {
            cell.classList.remove('clickable'); 
            cell.removeEventListener('click', cellClickHandler); 
        }
    });

    // 中央セルをクリック可能にする（'FREE'セル）
    const centerCell = document.querySelector('[data-row-index="2"][data-cell-index="2"]');
    if (centerCell) {
        centerCell.classList.add('clickable'); 
        centerCell.addEventListener('click', cellClickHandler); 
    }
}

// セルのクリックハンドラー
function cellClickHandler() {
    setIntervalBtn.style.display = "none";
    const rowIndex = parseInt(this.dataset.rowIndex); 
    const cellIndex = parseInt(this.dataset.cellIndex); 
    window.marked[rowIndex][cellIndex] = !window.marked[rowIndex][cellIndex]; 
    this.classList.toggle('marked'); 
    checkBingo(); 
}

// セルがクリック可能かどうかを判断する関数
function isClickableCell(cellValue) {
    return !generatedNumbers.includes(cellValue);
}

// SEを再生する関数
function playAudio(audioPath) {
    const audio = new Audio(audioPath); 
    audio.play(); 
}

// ビンゴカードをレンダリングする関数
function renderBingoCard(data) {
    bingoCard.innerHTML = ''; 
    window.marked = Array.from({ length: 5 }, () => Array(5).fill(false)); 
    data.forEach((row, i) => {
        for (let j = 0; j < 5; j++) {
            const cellDiv = createCell(row, i, j);
            bingoCard.appendChild(cellDiv); 
            adjustFontSize(cellDiv); 
        }
    });
  
    enableClickableCells(); 
}

// セルを作成する関数
function createCell(row, rowIndex, cellIndex) {
    const cellDiv = document.createElement('div');
    cellDiv.className = 'cell';
    cellDiv.dataset.rowIndex = rowIndex;
    cellDiv.dataset.cellIndex = cellIndex;

    cellDiv.textContent = cellIndex < row.length ? row[cellIndex] !== 0 ? row[cellIndex] : '☆' : '';

    if (cellIndex < row.length && row[cellIndex] !== 0 && isClickableCell(row[cellIndex])) {
        cellDiv.classList.add('clickable');
        cellDiv.addEventListener('click', cellClickHandler);
    }

    if (rowIndex === 2 && cellIndex === 2) {
        cellDiv.classList.add('clickable');
        cellDiv.addEventListener('click', cellClickHandler);
    }
    return cellDiv;
}

// セルをマークする関数
function markCell(cellElement) {
    if (!cellElement || !cellElement.textContent) return;

    const value = parseInt(cellElement.textContent);
    if (isNaN(value) || generatedNumbers.indexOf(value) === -1) return;
}

// ビンゴをチェックする関数
function checkBingo() {
    fetch('https://galleon.yachiyo.tech/Bingo/check-bingo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ marked: window.marked })
    })
    .then(handleResponse)
    .then(data => {
        if (data.bingo) {
            alert('ビンゴです！'); 
        }
    })
    .catch(handleError); 
}

// セルのフォントサイズを調整する関数
function adjustFontSize(cell) {
    const cellSize = Math.min(cell.offsetWidth, cell.offsetHeight);
    const fontSize = cellSize * 0.35; 
    cell.style.fontSize = fontSize + "px"; 
}

// すべてのセルのフォントサイズを調整する関数
function adjustAllCellFonts() {
    const cells = document.querySelectorAll(".cell");
    cells.forEach(function(cell) {
        adjustFontSize(cell); 
    });
}

// エラーメッセージ
function handleError(error) {
    console.error('Error:', error.message); 
    alert(`Error: ${error.message}`); 
}

// フェッチレスポンスを処理する関数
function handleResponse(response) {
    if (!response.ok) {
        throw new Error('Network response was not ok.');
        
    }
    return response.json(); 
    
}
