fetch('http://127.0.0.1/games/commonLib/test.json')
  .then(response => {
    console.log(response.text);
  })
  .catch(error => {
    // エラーハンドリング
  });
