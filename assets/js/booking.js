$(document).ready(function() {

    function hotelSearch(hotel) {

        let queryURL = 


        var settings = {
            url: queryURL;"https://apidojo-booking-v1.p.rapidapi.com/properties/get-static-map?currency_code=USD&languagecode=en-us&width=720&longitude=106.663626&zoom=18&latitude=10.807570&height=280",
            method: "GET",
            "headers": {
                "x-rapidapi-host": "apidojo-booking-v1.p.rapidapi.com",
                "x-rapidapi-key": "9ffaca3a81msha286ac368d00ee7p1e82d7jsnbec3369febd3"
            }
        }
        
        $.ajax(settings).done(function (response) {
            console.log(response);
        });
        
        $("#hotelButton").on("click", function(){

            alert("thisbuttonworks");
            console.log("thisbuttonworks");





        });











});