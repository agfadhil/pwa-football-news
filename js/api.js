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

function error(error) {
  console.log("Error : " + error);
}

function getStandings() {
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
  fetch(base_url + "competitions/2021/standings", { headers: { 'X-Auth-Token' : mytoken }} )
    .then(status)
    .then(json)
    .then(function (data) {
      console.log(data);
      let standingsHTML = "";
      data.standings[0].table.forEach(function(result) {
        let imageUrl = result.team.crestUrl.replace(/^http:\/\//i, 'https://');
        standingsHTML += `
          <a class="team-list" href="../team.html?id=${result.team.id}">
            <li class="collection-item avatar">
              <img src="${imageUrl}" alt="club icon" class="circle">
              <span class="title">${result.team.name}</span>
              <p>Points : ${result.points}</p>
            </li>
          </a>
        `;
      });
      document.getElementById("standings").innerHTML = standingsHTML;
    })
    .catch(error);
}

function getTeamDetailById() {
  var urlParams = new URLSearchParams(window.location.search);
  var idParam = urlParams.get("id");

  // if ("caches" in window) {
  //   caches.match(base_url + "article/" + idParam).then(function(response) {
  //     if (response) {
  //       response.json().then(function(data) {
  //         var articleHTML = `
  //           <div class="card">
  //             <div class="card-image waves-effect waves-block waves-light">
  //               <img src="${data.result.cover}" />
  //             </div>
  //             <div class="card-content">
  //               <span class="card-title">${data.result.post_title}</span>
  //               ${snarkdown(data.result.post_content)}
  //             </div>
  //           </div>
  //         `;
  //         document.getElementById("body-content").innerHTML = articleHTML;
  //       });
  //     }
  //   });
  // }

  fetch(base_url + "teams/" + idParam, { headers: { 'X-Auth-Token' : mytoken }} )
    .then(status)
    .then(json)
    .then(function(data) {
      console.log(data);
      let imageUrl = data.crestUrl.replace(/^http:\/\//i, 'https://');
      var teamHTML = `
        <div class="row">
          <div class="col s12 l12">
            <div class="card">
              <div class="card-image">
                <img class="team-img" src="${imageUrl}" />
                <a
                  class="btn-floating btn-large halfway-fab waves-effect waves-light bg-gradient"
                  ><i class="material-icons">star</i></a
                >
              </div>
              <div class="card-content">
                <span class="card-title"><strong>${data.name}</strong></span>
                <article>
                  <label>test</label>
                  <p>test</p>
                </article>
                <article>
                  <label>test</label>
                  <p>test</p>
                </article>
              </div>
            </div>
          </div>
        </div>
      `;
      document.getElementById("body-content").innerHTML = teamHTML;
    })
    .catch(error);
}