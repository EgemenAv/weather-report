//9b0c1ee67503dd17bcb8935601c4ca9d
var city = "toronto"
var url1 = "https://api.openweathermap.org/data/2.5/weather?q="+ city +"&appid=9b0c1ee67503dd17bcb8935601c4ca9d";


fetch(url1).then((response) => {

        return response.json();

}).then((data) => {

    var url2 = "https://api.openweathermap.org/data/2.5/onecall?lat="+ data.coord.lat + "&lon="+ data.coord.lon +"&exclude=hourly,minutely&appid=9b0c1ee67503dd17bcb8935601c4ca9d";

    fetch(url2).then((response) => {
        return response.json();
    }).then((data) => {
        console.log(data);
    });

}).catch((err) => {
    alert("Please enter a valid city name.");
});



