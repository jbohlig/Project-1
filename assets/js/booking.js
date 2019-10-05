$(document).ready(function () {


    function getCityId(cityName) {
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
            let apCode = response[0].apicode;
            let cityId = response[0].ctid;
            // hotelSearch(cityId);
            console.log(cityId);
            hotelSearch(cityId);
        })
    }

    let joshDate;
    let dateToLOcal;
    let addingDay;

    $("#book_htl").on("click", function () {

        joshDate = $("#event_date").text();
        dateToLOcal = moment.parseZone(joshDate).local().format("YYYY-MM-DD"); // "2019-12-20"
        addingDay = moment(dateToLOcal).add(1, 'days').format("YYYY-MM-DD");
     
        let cityName = $("#city_name").text();
        getCityId(cityName);

        console.log(addingDay);
        console.log(joshDate);
        console.log(dateToLOcal);
        console.log(cityName);

    });

    function hotelSearch(cityId) {

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": `https://apidojo-kayak-v1.p.rapidapi.com/hotels/create-session?rooms=1&citycode=${cityId}&checkin=${dateToLOcal}&checkout=${addingDay}&adults=1`,
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "apidojo-kayak-v1.p.rapidapi.com",
                "x-rapidapi-key": "9ffaca3a81msha286ac368d00ee7p1e82d7jsnbec3369febd3"
            }
        }

        $.ajax(settings).done(function (response) {
            console.log(response);
        });

    }

});
