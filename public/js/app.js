const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const errp = document.querySelector('#errp')
const message1 = document.querySelector('#msg1')
const message2 = document.querySelector('#msg2')
weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    errp.textContent= ''
    message1.textContent= 'Loading....'
             message2.textContent= ''
    fetch('http://localhost:3000/weather?address='+search.value).then((response)=>{
     response.json().then((data)=>{
         if(data.error){
             console.log(data.error)
             errp.textContent= data.error
             message1.textContent= ''
         }else{
             console.log(data.location)
             console.log(data.forecast)
             message1.textContent= data.location
             message2.textContent= data.forecast
         }
     })
})
})