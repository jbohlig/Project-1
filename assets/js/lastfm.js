export default lastFm;

function lastFm(artist) {

    let apiKey = "0cbe3f08368a5039e0df2102a963979e"; // we better keep it in firebase
    let queryURL = "https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=" + artist + "&api_key=" + apiKey + "&format=json";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        $("#ar_info").append(response.artist.bio.summary);
    
    })

}
