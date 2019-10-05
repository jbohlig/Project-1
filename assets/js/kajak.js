export { getApCode, settingsFlight };

function getApCode(cityName) {
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
        settingsFlight(apCode);
    })
}

function settingsFlight(apCode) {
    
        let origin1 = "PHX";
        let destination1 = apCode;
        let departdate1 = "2019-12-20";
        let cabin = "e";
        let currency = "USD";
        let adults = "1";
        let bags = "0";

        let queryURL = "https://apidojo-kayak-v1.p.rapidapi.com/flights/create-session?" +
                        "&origin1" + origin1 +
                        "&destination1" + apCode +
                        "&departdate1" + departdate1 +
                        "&cabin" + cabin +
                        "&currency" + currency +
                        "&adults" + adults +
                        "&bags" + bags;
    /*
    do: form gathering data,
    do: query as response,
    do: get cheapest prise, resultcount, baseUrl, sharedURl
    do: display to user that we have {resultCount} flights on that {departdate1}, the cheapest flight is {cheapestPrice}
    do: and provide a link to kayak
    */

    $.ajax({
        url: queryURL, method: "GET",
        headers: {
            "x-rapidapi-host": "apidojo-kayak-v1.p.rapidapi.com",
            "x-rapidapi-key": "9ffaca3a81msha286ac368d00ee7p1e82d7jsnbec3369febd3"
        },
        async: true,
        crossDomain: true
    }).then(function (response) {
        /* for (let index=0; index < 3; index++) {
          let key = Object.keys(response.tripset)[index];
          let result = response.tripset[key]; 
          console.log(result)
          console.log(result.cabinClass)
        }  */

        console.log(response.cheapestPrice)
        console.log(response.resultcount)
        console.log("url: " + baseUrl + response.shareURL)
        /*    console.log(queryURL)
           console.log(response)
           $("#information").append(JSON.stringify(response)) */
    })

}
