export {getCityId, hotelSearch};




    function getCityId (cityName, dateToLOcal) {
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
            let addingDay = moment(dateToLOcal).add(1, 'days').format("YYYY-MM-DD");
            hotelSearch(cityId, dateToLOcal, addingDay);
            console.log(dateToLOcal);
            console.log("i am here");
        })
    }

    function hotelSearch(cityId, dateToLOcal, addingDay) {

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


