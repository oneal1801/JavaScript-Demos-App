const apiKey = "6db0c4438bf325f4fbc5f4a64f20632d";
const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
const url = (city) =>
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

async function getWeatherByLocation(city) {
  const resp = await fetch(url(city), {
    origin: "cros",
  });
  const respData = await resp.json();
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });
  if (respData.cod === 200) {
    addWeatherToPage(respData);
    Toast.fire({
      icon: "success",
      title: `The weather was found success ${Ktoc(respData.main.temp)}°C`,
    });
  }else if(respData.cod !== 200){
    Toast.fire({
        icon: "error",
        title: "The citie was not found, check the citie name and try again!",
      });
      
  }
  
}
function addWeatherToPage(data) {
  const temp = Ktoc(data.main.temp);
  const weather = document.createElement("div");
  weather.classList.add("weather");
  weather.innerHTML = `  
      <h2><img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /> ${temp}°C <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /></h2>  
      <small>${data.weather[0].main}</small>  
      `;
  //  cleanup
  main.innerHTML = "";
  main.appendChild(weather);
}
function Ktoc(K) {
  return Math.floor(K - 273.15);
}
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const city = search.value;
  if (city) {
    getWeatherByLocation(city);
  }
});

//Menu navbar js
let mainNav = document.getElementById("js-menu");
let navBarToggle = document.getElementById("js-navbar-toggle");

navBarToggle.addEventListener("click", function () {
  mainNav.classList.toggle("active");
});
