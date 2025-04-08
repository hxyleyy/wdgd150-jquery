const apiKey = '76c46f7f45862e7038b2d2825ec5b880';
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?';

function getWeatherData(cityName) {
  const url = `${baseURL}q=${cityName}&appid=${apiKey}&units=metric`;

  $.ajax({
    url: url,
    type: 'GET',
    success: function (data) {
      displayWeatherData(data);
    },
    error: function (error) {
      console.log('Error:', error);
      $('#weatherResult').html('<p>Failed to retrieve data. Please try again.</p>');
    }
  });
}

function displayWeatherData(data) {
  const iconCode = data.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  const displayData = `
    <p>City: ${data.name}</p>
    <p>Temperature: ${data.main.temp} °C</p>
    <div class="weather-condition">
        <img src="${iconUrl}" alt="Weather Icon">
        <span>${data.weather[0].main}</span>
    </div>
    <p>Humidity: ${data.main.humidity}%</p>
  `;

  $('#weatherResult').hide().html(displayData).fadeIn().addClass('fade-in');
}

$(document).ready(function () {
  $('#cityName').focus();

  $('#getWeatherBtn').click(function () {
    const cityName = $('#cityName').val().trim();

    if (cityName === "") {
      $('#weatherResult').html('<p>Please enter a city name.</p>');
    } else {
      getWeatherData(cityName);
    }
  });
});
