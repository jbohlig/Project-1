export { fourSquarePlaces }; // export all to main.js

//foursquare... after some considerations, decided to pull venue's image and use it as a background
function fourSquarePlaces(lat, lon, venue) {

    let clientId = "XPM35VZZLMW0VK4WJKYUL00ED3HEUJI5FZICVMJHOEHQYJSI"
    let secret = "MLCZ4EFGUXVC4LDADEEZDQGYBFQIYAPYKWSS2YX2W4E5D2U5"
    let venueId = "";

    let retriveIdURL = "https://api.foursquare.com/v2/venues/search?client_id=" + clientId +
        "&client_secret=" + secret +
        "&v=20191006" +
        "&limit=1" +
        "&ll=" + lat + "," + lon +
        "&radius=250";

    $.ajax({
        url: retriveIdURL,
        method: "GET",
    })
        .then(function (response) {
            // Code for handling API response
            console.log(response)

            let venueId = response.response.venues[0].id;
            let cc = response.response.venues[0].location.cc;
            $(".flags").attr("src", "https://www.countryflags.io/" + cc + "/flat/64.png");
            console.log(cc)
            console.log(venueId)
            let retriveVenue = "https://api.foursquare.com/v2/venues/" + venueId +
                "?client_id=" + clientId +
                "&client_secret=" + secret +
                "&v=20191006";
            $.ajax({
                url: retriveVenue,
                method: "GET"
            })
                .then(function (response) {
                    console.log(retriveVenue)
                    if (response.response.venue.bestPhoto) {
                        let linkToImg = response.response.venue.bestPhoto.prefix +
                            response.response.venue.bestPhoto.width + "x" +
                            response.response.venue.bestPhoto.height +
                            response.response.venue.bestPhoto.suffix;
                        $("#foursquare_places").attr("style", "background: url(" + linkToImg +
                            ") top left no-repeat; background-size: cover");

                    }
                })
        })


        .catch(function (error) {
            // Code for handling errors
            console.log(error)
        });
}