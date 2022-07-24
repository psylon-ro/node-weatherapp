console.log('client side js is loaded')

const weatherForm = document.querySelector('form')
const locinput = document.querySelector('#location')
weatherForm.addEventListener('submit',(e)=>{
e.preventDefault();
const location = locinput.value
locinput.value=''

const messone= document.querySelector('.message-one')
const messtwo= document.querySelector('.message-two')
messone.textContent='Loading...'
messtwo.textContent=''


fetch(`/weather?address=${location}`).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messone.textContent= data.error
        }else{
            messone.textContent= data.location
            messtwo.textContent=data.forecastdata
        }
    })
})
})

