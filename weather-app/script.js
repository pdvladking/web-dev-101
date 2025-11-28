async function getWeather() {
  const city = document.getElementById("city").value;
  const res = await fetch (`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=GOT_BORED_SIGNINGUP_BUT_THE_LOGIC_IS_THERE&units=metric`);
  const data = await res.json();
  document.getElementById("result").innerHTML=
  `${data.name}: ${data.main.temp}°C,${data.weather[0].description}`
}