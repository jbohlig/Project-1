//the ideal is use main.js only for click events, and import everything else

import lastFm from './modules/lastfm.js';
import { searchBandsInTown, searchBandsInTownVenue } from './modules/bandsintown.js';
import { getApCode } from './modules/kajak.js';
import { fourSquarePlaces } from './modules/places.js';
import { initMap } from './modules/gmap.js';
import { weatherForecast } from './modules/weather.js';
import { getCityId, hotelSearch } from './modules/booking.js';


$(document).ready(function () {

  //main search button, insert name, get all the info
  $("#main_search").on("click", function (event) {
    event.preventDefault();

    let artist = $("#artist_input").val().trim();
    let artistL = artist.split(" ").join("+");
    if (artist) {
      $("#intro").fadeOut("slow", function () {
        //starting three functions, starting simultaneasly all queries
        searchBandsInTown(artistL);
        searchBandsInTownVenue(artistL);
        lastFm(artistL);
        $("#artist_input").val("");
        $("body").removeClass("overflow-hidden"); // overflow fix for our mouse effect
        $("body").addClass("overflow-auto");
      });
    }
    else {
      $("#insertTerm").modal("show"); // yeah! we have a nice model window that says nicely "fill that field!"
    }
  });

  //navbar search button, insert name, get all the info
  //big pain in the butt this one, have to empty/remove everything
  $("#navbar_search").on("click", function (event) {
    event.preventDefault();
    $("#ar_name").empty();
    $("#ar_info").empty();
    $("#ar_socials").empty();
    $("#artist_img").empty();
    $("#artist_events_count").empty();
    $("#table_body").empty();
    $("#plane-results").empty();
    $("#plane-info").show();
    $("#hotel-info").show();
    $("#hotel-results").empty();
    $("#trip").hide();

    let artist = $("#artist_input_navbar").val().trim();
    let artistL = artist.split(" ").join("+");

    $("#intro").fadeOut("slow", function () {

      //starting three functions, starting simultaneasly all queries
      searchBandsInTown(artistL);
      searchBandsInTownVenue(artistL);
      lastFm(artistL);
      $("#artist_input_navbar").val("");
    });
  });

  //click on any of Plan Your Trip buttons will show you the screen, with city and country we gotta go.
  //at that point hotel and plain tickets apis are coming in
  $("body").on("click", ".go-trip", function (event) {
    event.preventDefault();
    //passing names of city and country to the next screen
    let country = $(this).attr("data-country");
    let city = $(this).attr("data-city");
    let venue = $(this).attr("data-venue");
    let eventDate = $(this).attr("data-date");
    let niceDate = moment(eventDate).local().format("llll");
    let lat = $(this).attr("data-lat");
    let lon = $(this).attr("data-lon");
    let dateToLOcal = moment(eventDate).local().format("YYYY-MM-DD"); // "2019-12-20"
    let datePlaceholder = moment(eventDate).local().format("LL"); // "2019-12-20"
    let departdate1 = dateToLOcal;
    let checkIn = dateToLOcal; //do you still need it, Josh?

    $("#checkIn").attr("placeholder", datePlaceholder);
    $("#destination1").attr("name", city);
    $("#destination1").attr("placeholder", city + ", " + country);
    $("#destination2").attr("name", city);
    $("#destination2").attr("placeholder", city + ", " + country);
    $("#departdate1").attr("placeholder", datePlaceholder);
    $("#departdate1").attr("data-depart", departdate1);
    $("#checkIn").attr("data-depart", departdate1);
    $("#city_name").text(city);
    $("#city_hotel").text(city + ", " + country);
    $("#city_flight").text(city + ", " + country);

    $("#venue_name").text(venue);
    $("#country_name").text(country);
    $("#country_name_f").text(country);
    $("#city_name_f").text(city);
    $("#event_date").text(niceDate);
    $("#query").fadeOut("slow");
    $("#trip").show();
    lon = parseFloat(lon);
    lat = parseFloat(lat);
    //passing all the info we need our functions to function
    initMap(lat, lon, venue)
    fourSquarePlaces(lat, lon, venue)
    weatherForecast(lat, lon, eventDate)
  })

  //searching for flights
  $("body").on("click", "#pln_tkts", function (event) {
    event.preventDefault();
    let cityName = $("#city_name").text();
    let origin = $("#origin1").val();
    getApCode(cityName, origin);
  })


  //searching for hotels
  $("body").on("click", "#book_htl", function (event) {
    event.preventDefault();
    let city = $("#destination2").attr("name");
    let dateToLOcal = $("#checkIn").attr("data-depart");
    getCityId(city, dateToLOcal)
  });
})