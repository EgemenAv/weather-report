//9b0c1ee67503dd17bcb8935601c4ca9d
const id = "9b0c1ee67503dd17bcb8935601c4ca9d";

const historyStorage = JSON.parse(localStorage.getItem("historyStorage")) || [];
getHistory();

var DateTime = luxon.DateTime;

$("#search-button").click(function (e) { 
    e.preventDefault();
    getWeather($("#search-box").val());
});

$("#history").click(function (e) { 
    e.preventDefault();
    const element = e.target; 
    if (element.nodeName === "BUTTON") {
        getWeather(element.innerHTML);
    }
});


function getWeather(city)  { 

    var url1 = "https://api.openweathermap.org/data/2.5/weather?q="+ city +"&appid=" + id;

    fetch(url1).then((response) => {

        return response.json();

    }).then((data) => {

        var url2 = "https://api.openweathermap.org/data/2.5/onecall?lat="+ data.coord.lat + "&lon="+ data.coord.lon +"&exclude=hourly,minutely&units=metric&appid=" + id;

        refreshHistory(data.name);

        fetch(url2).then((secondResponse) => {

        return secondResponse.json();

        }).then((secondData) => {

            console.log(secondData);
            current(secondData.current);
            forecast(secondData.daily);
        });

    }).catch((err) => {
        alert("Please enter a valid city name.");
    });
}

 
function refreshHistory(cityName){

    const newCity = {
        name: cityName
    };   

    const index = historyStorage.findIndex(function (element) {
        return (cityName === element.name);
    });

    if (index + 1) {
        historyStorage.splice(index, 1);
    }
        
    historyStorage.unshift(newCity);

    historyStorage.splice(10);

    localStorage.setItem("historyStorage", JSON.stringify(historyStorage));

    $("#name").html(cityName);

    getHistory();
}


function getHistory() {
    $("#history").empty();

    historyStorage.forEach(element => {
        $("#history").append('<button class="history-button">'+ element.name +'</button>');
    });
}

function current(data) {
    var dt = DateTime.fromSeconds(data.dt);
    var timeString = dt.toLocaleString(DateTime.DATE_MED);
    var url = "http://openweathermap.org/img/wn/" + data.weather[0].icon +"@2x.png";
    $("#body").empty();
    $("#body").html("<div class='date'>"+ timeString +"</div><div class='symbol'><img src='"+ url +"'></div><div class='temp'>Temperature: "+ data.temp +" <span>&#8451;</span></div><div class='humid'>Humidity: "+ data.humidity +"%</div><div class='wind'>Wind: "+ data.wind_speed +" MPH</div><div id='uvi'>UV Index: <span id='uv'>"+ data.uvi +"</span></div>");

    const uv = data.uvi;
    if (uv < 3) {
        $("#uv").css("background-color", "green");
    }else if (uv < 6) {
        $("#uv").css("background-color", "gold");
    }else if (uv < 8) {
        $("#uv").css("background-color", "darkorange");
    }else if (uv < 11) {
        $("#uv").css("background-color", "red");
    }else{
        $("#uv").css("background-color", "violet");
    }
}

function forecast(data) {
    $("#forecast").empty();

    for (let index = 1; index < 6; index++) {
        const day =  data[index];

        var dt = DateTime.fromSeconds(day.dt);
        var timeString = dt.toLocaleString(DateTime.DATE_MED);
        var url = "http://openweathermap.org/img/wn/" + day.weather[0].icon +"@2x.png";

        $("#forecast").append("<div class='future'><div class='date'>"+ timeString +"</div><div class='symbol'><img src='"+ url +"'></div><div class='temp'>Temperature: "+ day.temp.day +" <span>&#8451;</span></div><div class='humid'>Humidity: "+ day.humidity +"%</div><div class='wind'>Wind: "+ day.wind_speed +" MPH</div></div>");
    }


}


