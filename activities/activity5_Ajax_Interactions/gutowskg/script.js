var apiKey = '7414cea8a9072a6199aaa8c051b0021e';

document.addEventListener('DOMContentLoaded', bindButtons);

function bindButtons(){
  document.getElementById('zipSubmit').addEventListener('click', function(event){
    var req = new XMLHttpRequest();
    var country = document.getElementById('country code').value;
    var zip = document.getElementById('zip code').value;
    req.open('GET', 'https://api.openweathermap.org/data/2.5/weather?zip=' + zip + ',' + country + '&appid=' + apiKey, true);
    req.addEventListener('load',function(){
    if(req.status >= 200 && req.status < 400){
      var response = JSON.parse(req.responseText);
      var city = response.name;
      var temp = response.main.temp;
      var faren = parseInt(9/5*(response.main.temp - 273) + 32);
      var humidity = response.main.humidity;
      document.getElementById('weather').textContent = "The temperature in " + city + " is " + faren + " degrees Farenheit and the humidity is " + humidity + "%";
    } else {
      console.log("Error in network request: " + req.statusText);
    }});
    req.send(null);
    event.preventDefault();
  })

  document.getElementById('citySubmit').addEventListener('click', function(event){
    var req = new XMLHttpRequest();
    var country = document.getElementById('country code').value;
    var city = document.getElementById('city id').value;
    req.open('GET', 'https://api.openweathermap.org/data/2.5/weather?q=' + city + ',' + country + '&appid=' + apiKey, true);
    req.addEventListener('load',function(){
      if(req.status >= 200 && req.status < 400){
        var response = JSON.parse(req.responseText);
        city = response.name;
        var temp = response.main.temp;
        var faren = parseInt(9/5*(response.main.temp - 273) + 32);
        var humidity = response.main.humidity;
        document.getElementById('weather').textContent = "The temperature in " + city + " is " + faren + " degrees Farenheit and the humidity is " + humidity + "%";
      } else {
        console.log("Error in network request: " + req.statusText);
      }});
    req.send(null);
    event.preventDefault();
  })

  document.getElementById('request').addEventListener('click', function(event){
    var req = new XMLHttpRequest();
    var payload = document.getElementById('entry').value;
    req.open('POST', 'http://httpbin.org/post', true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.addEventListener('load',function(){
      if(req.status >= 200 && req.status < 400){
        var response = JSON.parse(req.responseText);
        document.getElementById('result').textContent = response.data;
      } else {
        console.log("Error in network request: " + req.statusText);
      }});
    req.send(JSON.stringify(payload));
    event.preventDefault();
  })
}
