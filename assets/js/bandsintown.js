$(document).ready(function () {
  function searchBandsInTown(artist) {
    let queryURL = "https://rest.bandsintown.com/artists/" + artist + "?app_id=13722599"
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      /*  
      ---------------------------------
      need to handle the animation here
      ---------------------------------
      */
      $("#query").show();

      //generating image
      let artistImg = $("<img>");
      artistImg.addClass("card-img");
      artistImg.attr("src", response.thumb_url);
      $("#artist_img").append(artistImg);

      //generating name
      let artistName = $("<h5>");
      artistName.addClass("card-title");
      if (response) {
        artistName.text(response.name)
      }
      else {
        artistName.text("Sorry, we don't know who is that!")
      }

      $("#ar_info").append(artistName);

      //displaying artist's fans
      let artistFansCount = $("<p>");
      artistFansCount.addClass("card-text");
      //only if we have more than 0
      if (response.tracker_count > 0) {
        artistFansCount.html("Fans: " + response.tracker_count);
      }
      //and if we don't we make a sad face!
      else {
        artistFansCount.text("Geez! this artist doesn't have any fans! :(")
      }
      $("#ar_info").append(artistFansCount);

      //show facebook link only if link is not empty
      if (response.facebook_page_url !== "") {
        let artistFacebook = $("<p>");
        $("#ar_info").append(artistFacebook);
        artistFacebook.addClass("card-text");
        let artistFacebookLink = $("<a>");
        artistFacebook.append(artistFacebookLink);
        artistFacebookLink.attr("href", response.facebook_page_url);
        artistFacebookLink.attr("target", "_blank")
        artistFacebookLink.text("Facebook Page")
      }

      //show bandsintown link only if link is not empty
      if (response.url !== "") {
        let artistBIT = $("<p>");
        $("#ar_info").append(artistBIT);
        artistBIT.addClass("card-text");
        let artistBITLink = $("<a>");
        artistBIT.append(artistBITLink);
        artistBITLink.attr("href", response.url);
        artistBITLink.attr("target", "_blank");
        artistBITLink.text("Profile on BandsInTown");
      }

      //events count var
      let eventCountTitle = $("<h3>");
      eventCountTitle.addClass("font-weight-bold");

      //if there are events, showing how many
      if (response !== "" && response.upcoming_event_count > 0) {
        eventCountTitle.text("Upcoming events: " + response.upcoming_event_count)
      }
      //if not, just saying no events
      else {
        eventCountTitle.text("No upcoming events");
      }

      //appending our text
      $("#artist_events_count").append(eventCountTitle);

    })
    /*  .then(function(error){
         console.log(error)
     }) */
  }

  function searchBandsInTownVenue(artist) {

    //so we cannot apply limit on our query, but we can specify datesin format &date=2019-09-01,2019-10-01
    let queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=13722599&date=upcoming"
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      for (let i = 0; i < response.length; i++) {
        let tableRow = $("<tr>");
        tableRow.attr("class", "venues");
        let tdDate = $("<td>");
        let tdVenue = $("<td>");
        let tdTicket = $("<td>");
        let tdPlaneTicket = $("<td>");
        tdPlaneTicket.attr("class", "ready_to_fly");

        let cityData = response[i].venue.city.split(" ").join("-");
        let countryData = response[i].venue.country.split(" ").join("-");
        tdPlaneTicket.attr("data-city", cityData);
        tdPlaneTicket.attr("data-country", countryData);

        let buyTicket = $("<a>");
        $("#table_body").prepend(tableRow);
        tableRow.append(tdDate);
        tableRow.append(tdVenue);
        tableRow.append(tdTicket);
        tableRow.append(tdPlaneTicket);
        let btnPlaneTickets = $("<button>");
        tdPlaneTicket.append(btnPlaneTickets);
        btnPlaneTickets.attr("class", "btn btn-primary");
        btnPlaneTickets.attr("data-city", cityData);
        btnPlaneTickets.attr("data-country", countryData);
        btnPlaneTickets.text("Plan Your Trip");
        buyTicket.attr("href", response[i].offers[0].url)
        buyTicket.attr("target", "_blank")
        buyTicket.addClass("btn btn-success text-white");
        buyTicket.text("Buy Show Tickets");
        tdDate.text(response[i].datetime);
        tdVenue.html(`${response[i].venue.city}, ${response[i].venue.country}<br> ${response[i].venue.name}<br>${response[i].offers[0].status}`);
        tdTicket.append(buyTicket)
      }
    })
  }

  $("#main_search").on("click", function (event) {
    event.preventDefault();
    let artist = $("#artist_input").val().trim();
    $("#intro").fadeOut("slow", function () {

      searchBandsInTown(artist);
      searchBandsInTownVenue(artist);
    });
  });


})