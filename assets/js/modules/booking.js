export { getCityId, hotelSearch };




function getCityId(cityName, dateToLOcal) {
    let queryURL = "https://apidojo-kayak-v1.p.rapidapi.com/locations/search?where=" + cityName;
    $.ajax({
        url: queryURL,
        method: "GET",
        headers: {
            "x-rapidapi-host": "apidojo-kayak-v1.p.rapidapi.com",
            "x-rapidapi-key": "9ffaca3a81msha286ac368d00ee7p1e82d7jsnbec3369febd3"
        },
        async: true,
        crossDomain: true
    }).then(function (response) {
        let days = $("#days").val();
        let apCode = response[0].apicode;
        let cityId = response[0].ctid;
        // hotelSearch(cityId);
        console.log(cityId);
        let addingDay = moment(dateToLOcal).add(days, 'days').format("YYYY-MM-DD");
        hotelSearch(cityId, dateToLOcal, addingDay);
        console.log(dateToLOcal);
        console.log(addingDay);
    })
}

function hotelSearch(cityId, dateToLOcal, addingDay) {

    let days = $("#days").val();
    let adults = $("#adultsH").val();
    let rooms = $("#rooms").val();
    let city = $("#destination2").attr("name");

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": `https://apidojo-kayak-v1.p.rapidapi.com/hotels/create-session?rooms=${rooms}&citycode=${cityId}&checkin=${dateToLOcal}&checkout=${addingDay}&adults=${adults}`,
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "apidojo-kayak-v1.p.rapidapi.com",
            "x-rapidapi-key": "9ffaca3a81msha286ac368d00ee7p1e82d7jsnbec3369febd3"
        }
    }

    $.ajax(settings).done(function (response) {
        console.log(response);
        $("#hotel-info").hide();
        $("#hotel-results").show();
        let currentDate = moment(dateToLOcal).local().format("LL");
console.log(response.resultcount)

        if (response.resultcount > 0) {
            console.log("it works")
            $("#hotel-results").html(`
                                    <p class="lead">We found <h5>${response.resultcount}</h5> hotels</p>
                                    <p class="lead">on ${currentDate}</p>
                                    <p class="lead">from ${$("#origin1").val()} to ${city}</p>
                                    <p class="lead">Check them out on </p>
                                    <a class="btn btn-primary btn-block" href="${response.baseUrl + response.shareURL}" target="_blank">Kayak.com</a>

            `)
        }
        else {
            $("#hotel-results").html(`We are sorry, we didn't find any hotel for ${city}on ${currentDate}. 
                                        It is a possibility that something went wrong with our search, 
                                        but you can check out <a href="${response.baseUrl}" target="_blank">Kayak.com</a> 
                                        `);
        }
        if (response.resultcount > 0) {
            $("#get-plane-tickets-body").html(`
            We found ${response.resultcount} hotels for ${city} on ${currentDate}!
            Would you like to check it out on the Kayak website?
            <a href="${response.baseUrl + response.shareURL}" target="_blank">There you go!</a>
            `)
            $("#got-to-kajak").attr("href", response.baseUrl + response.shareURL)
        }
        else {
            $("#hotel-results").html(`We are sorry, we didn't find any hotel for ${city} on ${currentDate}. 
                                    It is a possibility that something went wrong with our search, 
                                    but you can check out <a href="${response.baseUrl}" target="_blank">Kayak.com</a> 
                                    `);



        }
    });

};
