console.log('Client side javascript file is loaded')

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//   response.json().then((data) => {
//     console.log(data)
//   })
// })

const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const weatherForecast = (address) => {
  fetch('http://localhost:3000/weather?address=' + address).then((response) => {
    messageTwo.textContent = ''
    messageOne.textContent = 'Loading...'
    messageOne.textContent = ''
    response.json().then((data) => {
      if (data.error) {
        //console.log(data.error)
        messageTwo.textContent = data.error
      } else {
        console.log(data.location)
        messageOne.textContent = data.location
        console.log(data.forecast)

        messageTwo.textContent = data.forecast.wForeCast
      }
    })
  })
}

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')


weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const location = search.value
  const result = weatherForecast(location);
  //messageOne.textContent =
  //console.log(result)
})