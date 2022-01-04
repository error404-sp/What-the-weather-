const checkWthrBtn = document.querySelector("#check");
const div = document.querySelector("div");

checkWthrBtn.addEventListener("click",checkWeather);

function checkWeather(){
    const status = document.querySelector("#status");
    findLocation();

}

function findLocation(){
    
    if(!navigator.geolocation){
        status.innerText = "Geolocation is not supported by your browser";
    }
    else{
        status.innerText = "Finding location...";
      navigator.geolocation.getCurrentPosition(success,error);
      function success(position){
        const latitude  = position.coords.latitude;
        const longitude = position.coords.longitude;
        status.textContent = '';
        getWeather(latitude,longitude);
        
    
    }
    function error(){
        status.textContent = 'Unable to retrieve your location';
    }
       
       
    }
}


function getWeather(lati,longi){
    const url = `https://weather-proxy.freecodecamp.rocks/api/current?lat=${lati}&lon=${longi}`;
    fetch(url)
    .then(response=>response.json())
    .then(json=>{
        const location = document.querySelector("h2");
        const temperature = document.querySelector("h3");
        const image = document.querySelector("img");
        const description = document.querySelector("h4");
        location.textContent = json.name;
        temperature.textContent = json.main.temp;
        description.textContent = json.weather[0].main;
        image.src=json.weather[0].icon;
        
    });

}