
const form = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('#msg1')
const msg2 = document.querySelector('#msg2')

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value;
    if (!location) {
        return console.log('You must provide a location')
    }

    msg1.textContent = 'Loading...'
    msg2.textContent = ''
    fetch('/weather?search=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                return msg1.textContent = data.error
            }

            msg1.textContent = data.location
            msg2.textContent = data.forcast
            // console.log(data.forcast)
        })
    })
})