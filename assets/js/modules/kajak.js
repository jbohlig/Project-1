export { getApCode };
//getting airport code based on city name
//since it's almost always coming back as the 1st element of array, 
//not going to iterate now the whole array to make sure and find the "ap"
//if there is time, will do
function getApCode(cityName, origin) {
    let apCode = cityName; //declaring destination airport code variable
    let apOrigin = origin; // declaring origin airport code
    let displayCity = $("#city_name").text();
    let displayCountry = $("#country_name").text();
    //passing cityname, gettin airport code
    $.ajax({
        url: "https://apidojo-kayak-v1.p.rapidapi.com/locations/search?where=" + cityName,
        method: "GET",
        headers: {
            "x-rapidapi-host": "apidojo-kayak-v1.p.rapidapi.com",
            "x-rapidapi-key": "9ffaca3a81msha286ac368d00ee7p1e82d7jsnbec3369febd3"
        },
        async: true,
        crossDomain: true
    })
        .then(function (responseTo) {
            apCode = responseTo[0].apicode; //got destination ap code
        })
    //getting origin airport code
    $.ajax({
        url: "https://apidojo-kayak-v1.p.rapidapi.com/locations/search?where=" + origin,
        method: "GET",
        headers: {
            "x-rapidapi-host": "apidojo-kayak-v1.p.rapidapi.com",
            "x-rapidapi-key": "9ffaca3a81msha286ac368d00ee7p1e82d7jsnbec3369febd3"
        },
        async: true,
        crossDomain: true
    })
        .then(function (responseFrom) {
            apOrigin = responseFrom[0].apicode; // got origin airport code
        })
        .then(function () {
            $("#plane-info").hide(); //hiding form window, 
            $("#plane-results").show(); // showing results
            let origin1 = apOrigin; //origin ap code
            let departdate1 = $("#departdate1").attr("data-depart"); //depart day
            let cabin = $("#cabin").val(); //class
            let currency = "USD"; //currency
            let adults = $("#adults").val(); //adults
            let bags = $("#bags").val();//bags
            //asking rapid api and kayak to nicely provide me with information
            let queryURL = "https://apidojo-kayak-v1.p.rapidapi.com/flights/create-session?" +
                "&origin1=" + origin1 +
                "&destination1=" + apCode +
                "&departdate1=" + departdate1 +
                "&cabin=" + cabin +
                "&currency=" + currency +
                "&adults=" + adults +
                "&bags=" + bags;

            $.ajax({
                url: queryURL, method: "GET",
                headers: {
                    "x-rapidapi-host": "apidojo-kayak-v1.p.rapidapi.com",
                    "x-rapidapi-key": "9ffaca3a81msha286ac368d00ee7p1e82d7jsnbec3369febd3"
                },
                async: true,
                crossDomain: true
            }).then(function (response) {

                let niceDate = moment(departdate1).local().format("LL"); //nicely formatting date
                $("#country_name_f").text(displayCountry); //displaying country name on the top of the block

                //need this if we have connecting flights,
                //basically this is array of connected flights IDs
                let segmentsArr;
                if (response.tripset[0].legs[0].segments) {
                    segmentsArr = response.tripset[0].legs[0].segments;
                }

                let count = 0; // need this to count and display to user number of connecting flights

                //pulling all segments, and later comparing my segments with all segments
                let thisTrip = response.segset;
                //checking if we've got results or not, if yes, creating html with all the information
                if (response.resultcount > 0) {
                    $("#get-plane-ticketsTitle").text("We found some flights for you!")
                    $("#p-spinner").removeClass("d-flex");
                    $("#p-spinner").hide();
                    $("#m-spinner").removeClass("d-flex");
                    $("#mp-spinner").hide();
                    $("#plane-results").append(`
                    <p class="lead">We found ${response.resultcount} flights</p>
                    <p class="lead">from ${$("#origin1").val()} to ${displayCity},  ${displayCountry}</p>
                    <p class="lead">on ${niceDate}</p>
                    <p class="lead">The cheapest flight is $${response.cheapestPrice}, and it's ${segmentsArr.length} stops!</p>
                    <a class="btn btn-josh btn-block" href="${response.baseUrl + response.shareURL}" target="_blank">Kayak.com</a>
                    `)
                    $("#get-plane-tickets-body").append(`
                    <p class="lead">We found ${response.resultcount} flights</p>
                    <p class="lead">from ${$("#origin1").val()} to ${displayCity},  ${displayCountry}</p>
                    <p class="lead">on ${niceDate}</p>
                    <p class="lead">The cheapest flight is $${response.cheapestPrice}, and it's ${segmentsArr.length} stops!</p>
                    `)

                    //hugest pain in the butt, but i did it :D
                    //pulling all the info about the cheapest(number 0 in array of flights) flight:
                    //if it has connected flights, showing them all to user and displaying 
                    //origin -> destination, leave time -> arrival time, duration
                    //still have to translate time and duration in local and hours
                    if (segmentsArr.length > 1) {
                        segmentsArr.forEach(element => {
                            for (let key in thisTrip) {
                                if (key === element) {
                                    count++; //this is where i need that count
                                    $("#get-plane-tickets-body").append(`
                                    <p>${count}. Flight <b>#${thisTrip[key].flightNumber}</b>  ${thisTrip[key].originCode} <i class="fas fa-plane"></i>  ${thisTrip[key].destinationCode}</p>
                                    <p>${thisTrip[key].leaveTimeUTC} <i class="fas fa-plane"></i> ${thisTrip[key].arriveTimeUTC}</p>
                                    <p>Duration: ${thisTrip[key].duration} minutes.</p>
                                    `)
                                }
                            }
                        });
                    }
                    //show modal button
                    $("#got-to-kajak").show()
                    $("#got-to-kajak").attr("href", response.baseUrl + response.shareURL)
                }
                //if we don't have any results or something bad happpend to our search
                else {
                    $("#plane-results").html(`We are sorry, we didn't find any flight for ${displayCity}, ${displayCountry} on ${niceDate}. 
                    It is a possibility that something went wrong with our search, 
                    please <ahref="#" onClick="${$("#plane-info").show()}">try again</a> later`);
                    $("#get-plane-tickets-body").html(`We are sorry, we didn't find any flight for ${displayCity}, ${displayCountry} on ${niceDate}. 
                    It is a possibility that something went wrong with our search, 
                    please <ahref="#" onClick="${$("#plane-info").show()}">try again</a> later`);
                }
            })

        }
        )
        .catch(function (error) {
            console.log("We've got a problem :" + error)
        })
}
