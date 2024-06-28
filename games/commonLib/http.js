function postRequest(url, sendStr){
  fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain'
      },
      body: sendStr
    })
    .then(response => response.text())
  .catch(error => console.error(error));  
}