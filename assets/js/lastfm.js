export default lastFm;

function lastFm(artist) {



    let apiKey = "0cbe3f08368a5039e0df2102a963979e";
    let queryURL = "https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=" + artist + "&api_key=" + apiKey + "&format=json";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(queryURL)
       
        $("#ar_info").append(response.artist.bio.summary);

 //show lastfm profile  link only if link is not empty
if (response.artist.url !== "") {
    let artistLastFM = $("<p>");
    $("#ar_socials").append(artistLastFM);
    artistLastFM.addClass("card-text");
    let artistLastFMLink = $("<a>");
    artistFacebook.append(artistLastFMLink);
    artistLastFMLink.attr("href", response.artist.url);
    artistLastFMLink.attr("target", "_blank")
    artistLastFMLink.text("Profile on LastFM")
  }
        
    })

}
