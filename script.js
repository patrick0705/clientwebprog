const form = document.querySelector('#myForm');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.querySelector('#name').value;
    const email = document.querySelector('#email').value;
    fetch(`https://webprogdb29930.azurewebsites.net/api/HttpTrigger1?name=${name}&email=${email}`, {
        method: 'POST'
    })
    .then(response => response.text())
    .then(data => {console.log(data); form.reset();})
    .catch(error => console.error(error));
});