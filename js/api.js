var base_url = "https://api.football-data.org/v2/";
var mytoken = "1498ffb00ea243209eafc6c0d1874a4e";

function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    return Promise.reject(new Error(response.statusText));
  } else {
    return Promise.resolve(response);
  }
}

function json(response) {
  return response.json();
}

function getCompetitionStandings() {
  // if ("caches" in window) {
  //   caches.match(base_url + "competitions/2021/standings").then(function(response) {
  //     if (response) {
  //       response.json().then(function(data){
  //         var compStandings = data.competition.name;
  //         document.getElementById("compStandings").innerHTML = compStandings;
  //       });
  //     } else {
  //       event.respondWith(
  //         caches
  //           .match(event.request, { ignoreSearch: true })
  //           .then(function(response) {
  //             return response || fetch(event.request);
  //           })
  //       )
  //     }
  //   })
  // }
  fetch(base_url + "competitions/2021/standings", { headers: { 'X-Auth-Token' : mytoken } } )
    .then(status)
    .then(json)
    .then(function (data) {
      console.log(data);
      let compStandingsHTML = data.competition.name;
      document.getElementById("compStandings").innerHTML = compStandingsHTML;
    })
}