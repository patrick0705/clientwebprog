const form = document.querySelector('#myForm');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    fetch('https://webprogdb29930.azurewebsites.net/api/HttpTrigger1?name='+formData.get('name')+'&email='+formData.get('email'), {
        method: 'POST',
    })
    .then(response => response.text())
    .then(data => {
        console.log(data);
        form.reset(); // Reset the form fields
    })
    .catch(error => console.error(error));
    console.log(formData);
});