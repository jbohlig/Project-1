export { weatherForecast }; // export all to main.js

//pulling weather info from dark sky apis, based on lattitude, longitude and date in UTC format
function weatherForecast(lat, lon, day) {

    let queryURL = "https://dark-sky.p.rapidapi.com/" + lat + "," + lon + "," + day
    $.ajax({
        url: queryURL,
        method: "GET",
        headers: {
            "x-rapidapi-host": "dark-sky.p.rapidapi.com",
            "x-rapidapi-key": "9ca8f56e65msh9b57cafd7459e56p13dbbfjsnac6794eacc27"
        },
        async: true,
        crossDomain: true
    })
        .then(function (response) { //they are stating the temp is in celsius, but it looks like farenheit to me...
            console.log(response)
            let temperatureCelsius = parseInt(response.currently.temperature);
            // let temperatureFarenhite =  (temperatureCelsius*1.8)+32;

            //adding cute icon
            let icon = response.currently.icon;
            let summary = response.currently.summary;
            $(".skycon").attr("id", icon);
            $("#weather").html(`
            <h6 class="text-left">It's going to be a ${summary} night!<br>
            Expected temp ${temperatureCelsius}°F</h6>
            `)

            //just for fun, displaying message to user based on weather
            let message = "";
            if (temperatureCelsius > 70 && temperatureCelsius < 90) {
                message = "You've got the nicest weather there!"
            }
            else if (temperatureCelsius > 90) {
                message = "Bring your water bottle, or, better - buy a 6-pack! Stay hydrated!"
            }
            else if (icon === "snow" || icon === "sleet" || temperatureCelsius < 50) {
                message = "It's freezing out there! Bring your thermal underwear!"
            }
            else if (icon === "wind" || icon === "fog" || temperatureCelsius < 70) {
                message = "It's chilly, bring your coat!"
            }
            else if (icon === "rain") {
                message = "Bring your umbrella!"
            }
            else if (icon === "clear-day" || icon === "clear-night" || icon === "cloudy" || icon === "partly-cloudy-day" ||
                icon === "partly-cloudy-night") {
                message = "You've got the nicest weather there!"
            }

            $("#message").text(message)
            //skyicon script
            let icons = new Skycons({ "color": "navy" }),
                list = [
                    "clear-day", "clear-night", "partly-cloudy-day",
                    "partly-cloudy-night", "cloudy", "rain", "sleet", "snow", "wind",
                    "fog"
                ],
                i;
            for (i = list.length; i--;)
                icons.set(list[i], list[i]);
            icons.play();
        })
        //errors handling
        .catch(function (error) {
            console.log("We've got a problem :" + error)
        })


}
