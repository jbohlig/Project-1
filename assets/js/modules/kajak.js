export { getApCode };

function getApCode(cityName, origin) {
    let apCode = cityName;
    let apOrigin = origin;
    let displayCity = $("#city_name").text();
    let displayCountry = $("#country_name").text();

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
            apCode = responseTo[0].apicode;
            console.log(responseTo)
        })
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
            apOrigin = responseFrom[0].apicode;
        })
        .then(function () {
            $("#plane-info").hide();
            $("#plane-results").show();
            let origin1 = apOrigin;
            let destination1 = apCode;


            let departdate1 = $("#departdate1").attr("data-depart");
            let cabin = $("#cabin").val();
            let currency = "USD";
            let adults = $("#adults").val();
            let bags = $("#bags").val();
            console.log(apCode)
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


                let niceDate = moment(departdate1).local().format("LL");
                $("#city_name_f").text(displayCity);
                $("#country_name_f").text(displayCountry);


                if (response.resultcount > 0) {
                    $("#plane-results").html(`
                                        <p class="lead">We found <h5>${response.resultcount}</h5> flights</p>
                                        <p class="lead">on ${niceDate}</p>
                                        <p class="lead">from ${$("#origin1").val()} to ${displayCity},  ${displayCountry}</p>
                                        <p class="lead">The prices are starting at <h5>$${response.cheapestPrice}</h5></p>
                                        <p class="lead">Check them out on </p>
                                        <a class="btn btn-primary btn-block" href="${response.baseUrl + response.shareURL}" target="_blank">Kajak.com</a>

                `)
                }
                else {
                    $("#plane-results").html(`We are sorry, we didn't find any flight for ${displayCity}, ${displayCountry} on ${niceDate}. 
                                            It is a possibility that something went wrong with our search, 
                                            but you can check out <a href="${response.baseUrl}" target="_blank">Kajak.com</a> 
                                            `);
                }
                if (response.resultcount > 0) {
                    $("#get-plane-tickets-body").html(`
                We found ${response.resultcount} fligths for ${displayCity},  ${displayCountry} on ${niceDate}!
                The cheapest flight is $${response.cheapestPrice}!
                Would you like to check it out on Kayak website?
                <a href="${response.baseUrl + response.shareURL}" target="_blank">There you go!</a>
                `)
                    $("#got-to-kajak").attr("href", response.baseUrl + response.shareURL)
                }
                else {
                    $("#plane-results").html(`We are sorry, we didn't find any flight for ${displayCity}, ${displayCountry} on ${niceDate}. 
                                        It is a possibility that something went wrong with our search, 
                                        but you can check out <a href="${response.baseUrl}" target="_blank">Kajak.com</a> 
                                        `);
                }
            })

        }
        )
}
