export { searchBandsInTown, searchBandsInTownVenue }; // export all to main.js

function searchBandsInTown(artist) {

  let queryURL = "https://rest.bandsintown.com/artists/" + artist + "?app_id=13722599"
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    $("#navbar").show()
    $("#query").show();

    //generating image
    let artistImg = $("<img>");
    artistImg.addClass("card-img");
    artistImg.attr("src", response.thumb_url);
    $("#artist_img").append(artistImg);

    //generating name
    let artistName = $("<div>");
    artistName.addClass("card-title h1");
    if (response) {
      artistName.text(response.name)
    }
    else {
      artistName.text("Sorry, we don't know who is that!")
    }

    $("#ar_name").prepend(artistName);

    //displaying artist's fans
    //let artistFansCount = $("<p>");
    //artistFansCount.addClass("card-text");
    //only if we have more than 0
    /*  if (response.tracker_count > 0) {
       artistFansCount.html("Fans: " + response.tracker_count);
     }
     //and if we don't we make a sad face!
     else {
       artistFansCount.text("Geez! this artist doesn't have any fans! :(")
     } */
    //$("#ar_info").append(artistFansCount);

    //show facebook link only if link is not empty
    if (response.facebook_page_url !== "") {
      let artistFacebook = $("<p>");
      $("#ar_socials").append(artistFacebook);
      artistFacebook.addClass("card-text");
      let artistFacebookLink = $("<a>");
      artistFacebook.append(artistFacebookLink);
      artistFacebookLink.attr("href", response.facebook_page_url);
      artistFacebookLink.attr("target", "_blank")
      artistFacebookLink.text("Profile on Facebook")
    }

    //show bandsintown link only if link is not empty
    if (response.url !== "") {
      let artistBIT = $("<p>");
      $("#ar_socials").append(artistBIT);
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
    //errors handling
    .catch(function (error) {
      console.log("We've got a problem :" + error)
    })
}

function searchBandsInTownVenue(artist) {

  //so we cannot apply limit on our query, but we can specify datesin format &date=2019-09-01,2019-10-01 or just upcoming
  let queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=13722599&date=upcoming"
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    console.log(queryURL)
    for (let i = 0; i < response.length; i++) {

      //creating rows and variables
      let tableRow = $("<tr>");
      let tdDate = $("<td>");
      let tdVenue = $("<td>");
      let tdTicket = $("<td>");
      let tdPlaneTicket = $("<td>");
      //here is how we save and pass city and country to the next screen
      let cityData = response[i].venue.city.split(" ").join("-");
      let countryData = response[i].venue.country.split(" ").join("-");
      let region = response[i].venue.region;


      let buyTicket = $("<a>");
      let dateToLOcal = moment(response[i].datetime).local().format("LLL"); // "November 2, 2019 12:30 PM"

      tdDate.html(`<b>${dateToLOcal}</b>`);

      tableRow.attr("class", "venues");
      tdPlaneTicket.attr("class", "ready_to_fly");
      $("#table_body").append(tableRow);
      tableRow.append(tdDate);
      tableRow.append(tdVenue);
      tableRow.append(tdTicket);
      tableRow.append(tdPlaneTicket);

      //button plan your trip, attaching to it all the information we need on the next section
      let btnPlaneTickets = $("<button>");
      tdPlaneTicket.append(btnPlaneTickets);
      btnPlaneTickets.attr("class", "btn btn-primary go-trip");
      btnPlaneTickets.attr("id", "button1");
      btnPlaneTickets.attr("data-city", cityData);
      btnPlaneTickets.attr("data-region", region);
      btnPlaneTickets.attr("data-date", response[i].datetime);
      btnPlaneTickets.attr("data-country", countryData);
      btnPlaneTickets.attr("data-venue", response[i].venue.name);
      btnPlaneTickets.attr("data-lat", response[i].venue.latitude);
      btnPlaneTickets.attr("data-lon", response[i].venue.longitude);
      btnPlaneTickets.text("Plan Your Trip");

      //button buy tickets, checking if there is an actual link, if not, show sorry message
      if (response[i].offers.length !== 0) {
        buyTicket.attr("href", response[i].offers[0].url)
        buyTicket.attr("target", "_blank")
        buyTicket.addClass("btn btn-success text-white");
        buyTicket.attr("id", "button2");
        buyTicket.text("Buy Show Tickets");
        tdTicket.append(buyTicket);
      }
      else {
        tdTicket.text("No service available")
      }

      //checking if there is a region/state first, then displaying city/state/country/venue
      let reCity = response[i].venue.city;
      let reState;
      if (response[i].venue.region !== " ") {
        reState = response[i].venue.region;
      }
      let reCountry = response[i].venue.country;
      let reVenue = response[i].venue.name;
      tdVenue.html(`<h6>${reCity} ${reState}, ${reCountry}
      <br><span class="text-muted">At ${reVenue}</span></h6>`);

    }

  })
}




