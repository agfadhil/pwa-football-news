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
  
  if ('caches' in window) {
    caches.match(base_url + "competitions/2021/standings").then(function(response) {
      if (response) {
        response.json().then(function (data) {
          var standingsHTML = "";
          data.standings[0].table.forEach(function(result) {
            let imageUrl = result.team.crestUrl.replace(/^http:\/\//i, 'https://');
            standingsHTML += `
              <a class="team-list" href="team.html?id=${result.team.id}">
                <li class="collection-item avatar">
                  <img src="${imageUrl}" alt="club icon" class="circle">
                  <span class="title">${result.team.name}</span>
                  <p>Points : ${result.points} | Won: ${result.won} | Draw: ${result.draw} | Lost: ${result.lost}</p>
                </li>
              </a>    
            `;
          });
          document.getElementById("standings").innerHTML = standingsHTML;
        })
      }
    })
  }

  fetch(base_url + "competitions/2021/standings", { headers: { 'X-Auth-Token' : mytoken }} )
    .then(status)
    .then(json)
    .then(function (data) {
      console.log(data);
      let standingsHTML = "";
      data.standings[0].table.forEach(function(result) {
        let imageUrl = result.team.crestUrl.replace(/^http:\/\//i, 'https://');
        standingsHTML += `
          <a class="team-list" href="team.html?id=${result.team.id}">
            <li class="collection-item avatar">
              <img src="${imageUrl}" alt="club icon" class="circle">
              <span class="title title-standings">${result.team.name}</span>
              <p>Points : ${result.points} | Won: ${result.won} | Draw: ${result.draw} | Lost: ${result.lost}</p>
            </li>
          </a>
        `;
      });
      document.getElementById("standings").innerHTML = standingsHTML;
    })
    .catch(error);
}

function getTeamDetailById() {
  return new Promise(function(resolve, reject) {
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get("id");

    if ("caches" in window) {
      caches.match(base_url + "teams/" + idParam).then(function(response) {
        if (response) {
          response.json().then(function(data) {
            let imageUrl = data.crestUrl.replace(/^http:\/\//i, 'https://');
            var teamHTML = `
              <div class="row">
                <div class="col s12 l12">
                  <div class="card">
                    <div class="card-image team-img-container">
                      <img class="team-img" src="${imageUrl}" />
                      <a id="favorite" class="btn-floating btn-large halfway-fab waves-effect waves-light bg-gradient">
                        <i class="material-icons">star</i>
                      </a>
                    </div>
                    <div class="card-content">
                      <span class="card-title"><strong>${data.name} </strong>(${data.tla})</span>
                      <div class="team-content">
                        <article class="team-article">
                          <label class="team-label">Address</label>
                          <p class="label-desc">${data.address || "Not Available"}</p>
                        </article>
                        <article class="team-article">
                          <label class="team-label">Phone</label>
                          <p class="label-desc">${data.phone || "Not Available"}</p>
                        </article>
                        <article class="team-article">
                          <label class="team-label">Email</label>
                          <p class="label-desc">${data.email || "Not Available"}</p>
                        </article>
                        <article class="team-article">
                          <label class="team-label">Founded</label>
                          <p class="label-desc">${data.founded || "Not Available"}</p>
                        </article>
                        <article class="team-article">
                          <label class="team-label">Club Colors</label>
                          <p class="label-desc">${data.clubColors || "Not Available"}</p>
                        </article>
                        <article class="team-article">
                          <label class="team-label">Venue</label>
                          <p class="label-desc">${data.venue || "Not Available"}</p>
                        </article>
                        <article class="team-article">
                          <label class="team-label">Website</label>
                          <p class="label-desc"><a target="_blank" href="${data.website || "#"}">${data.website || "Not Available"}</a></p>
                        </article>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            `;
            
            document.getElementById("body-content").innerHTML = teamHTML;
            // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
            return data;
          });
        }
      });
    }
    fetch(base_url + "teams/" + idParam, { headers: { 'X-Auth-Token' : mytoken }} )
      .then(status)
      .then(json)
      .then(function(data) {
        let imageUrl = data.crestUrl.replace(/^http:\/\//i, 'https://') || "#";
        var teamHTML = `
          <div class="row">
            <div class="col s12 l12">
              <div class="card">
                <div class="card-image team-img-container">
                  <img class="team-img" src="${imageUrl}" />
                  <a id="favorite" class="btn-floating btn-large halfway-fab waves-effect waves-light bg-gradient">
                    <i class="material-icons">star</i>
                  </a>
                </div>
                <div class="card-content">
                  <span class="card-title"><strong>${data.name} </strong>(${data.tla})</span>
                  <div class="team-content">
                    <article class="team-article">
                      <label class="team-label">Address</label>
                      <p class="label-desc">${data.address || "Not Available"}</p>
                    </article>
                    <article class="team-article">
                      <label class="team-label">Phone</label>
                      <p class="label-desc">${data.phone || "Not Available"}</p>
                    </article>
                    <article class="team-article">
                      <label class="team-label">Email</label>
                      <p class="label-desc">${data.email || "Not Available"}</p>
                    </article>
                    <article class="team-article">
                      <label class="team-label">Founded</label>
                      <p class="label-desc">${data.founded || "Not Available"}</p>
                    </article>
                    <article class="team-article">
                      <label class="team-label">Club Colors</label>
                      <p class="label-desc">${data.clubColors || "Not Available"}</p>
                    </article>
                    <article class="team-article">
                      <label class="team-label">Venue</label>
                      <p class="label-desc">${data.venue || "Not Available"}</p>
                    </article>
                    <article class="team-article">
                      <label class="team-label">Website</label>
                      <p class="label-desc"><a target="_blank" href="${data.website || "#"}">${data.website || "Not Available"}</a></p>
                    </article>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `;
        
        document.getElementById("body-content").innerHTML = teamHTML;    

        return data;
      })
      .then(handleFavorite)
      .catch(error);
  });
}

function handleFavorite(data) {
  var favorite = document.getElementById("favorite");
  // console.log(favorite, data)
  favorite.onclick = function() {
    // console.log(data);
    saveFavTeam(data);
    console.log("Tombol favteam di klik.");
  }
}

function getFavoritedTeam() {
  getAll().then(function(teams) {
    console.log("from getfavteam :", teams);
    // Menyusun komponen card artikel secara dinamis
    var teamHTML = "";
    teams.forEach(function(team) {
      // var description = article.post_content.substring(0,100);
      let imageUrl = team.crestUrl.replace(/^http:\/\//i, 'https://') || "#";
      teamHTML += `
        <div class="row">
          <div class="col s12 l12">
            <div class="card">
              <div class="card-image waves-effect waves-block waves-light">
                <img class="activator team-favorited-img" src="${imageUrl}" />
              </div>
              <div class="card-content">
                <span class="card-title activator grey-text text-darken-4"><strong>${team.name}</strong>
                  <i class="material-icons right">more_vert</i>
                </span>
              </div>
              <div class="card-reveal">
                <span class="card-title grey-text text-darken-4">Cmon~
                  <i class="material-icons right">close</i>
                </span>
                <p>
                  Let me show you this team <strong>details</strong> <br/>
                  Just
                  <a href="./team.html?id=${team.id}&saved=true">
                    <strong> &gt;&gt;&gt;click here&lt;&lt;&lt; </strong>
                  </a>
                </p>
                <p>
                  Either if you want to <strong>delete this team</strong> <br/>
                  Then
                  <a href="#favorited" onclick="deleteFavoriteTeam(${team.id})">
                    <strong> &gt;&gt;&gt;delete me&lt;&lt;&lt; </strong>
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      `;
    });
    // Sisipkan komponen card ke dalam elemen dengan id #body-content
    document.getElementById("teams").innerHTML = teamHTML;
  });
}

function getFavoritedTeamById() {
  var urlParams = new URLSearchParams(window.location.search);
  var idParam = urlParams.get("id");
  
  getById(idParam).then(function(data) {
    console.log(data);
    let imageUrl = data.crestUrl.replace(/^http:\/\//i, 'https://');
    var teamHTML = `
      <div class="row">
        <div class="col s12 l12">
          <div class="card">
            <div class="card-image">
              <img class="team-img" src="${imageUrl || "#"}" />
            </div>
            <div class="card-content">
              <span class="card-title"><strong>${data.name} </strong>(${data.tla})</span>
              <div class="team-content">
                <article class="team-article">
                  <label class="team-label">Address</label>
                  <p class="label-desc">${data.address || "Not Available"}</p>
                </article>
                <article class="team-article">
                  <label class="team-label">Phone</label>
                  <p class="label-desc">${data.phone || "Not Available"}</p>
                </article>
                <article class="team-article">
                  <label class="team-label">Email</label>
                  <p class="label-desc">${data.email || "Not Available"}</p>
                </article>
                <article class="team-article">
                  <label class="team-label">Founded</label>
                  <p class="label-desc">${data.founded || "Not Available"}</p>
                </article>
                <article class="team-article">
                  <label class="team-label">Club Colors</label>
                  <p class="label-desc">${data.clubColors || "Not Available"}</p>
                </article>
                <article class="team-article">
                  <label class="team-label">Venue</label>
                  <p class="label-desc">${data.venue || "Not Available"}</p>
                </article>
                <article class="team-article">
                  <label class="team-label">Website</label>
                  <p class="label-desc"><a href="${data.website || "#"}">${data.website || "Not Available"}</a></p>
                </article>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    // Sisipkan komponen card ke dalam elemen dengan id #content
    document.getElementById("body-content").innerHTML = teamHTML;
  });
}