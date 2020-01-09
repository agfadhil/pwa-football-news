var dbPromised = idb.open("team-football", 1, function(upgradeDb) {
  var teamsObjectStore = upgradeDb.createObjectStore("teams", {
    keyPath: "id"
  });
  teamsObjectStore.createIndex("name", "name", { unique: false });
});

function saveFavTeam(team) {
  dbPromised
    .then(function(db) {
      var tx = db.transaction("teams", "readwrite");
      var store = tx.objectStore("teams");
      store.put(team);
      return tx.complete;
    })
    .then(function() {
      showNotif("Favorited, wow cool!!", "you just had successfully added this team into your Favorited Team list");
      // console.log("Team saved yeah.");
    });
}

function getAll() {
  return new Promise(function(resolve, reject) {
    dbPromised
      .then(function(db) {
        var tx = db.transaction("teams", "readonly");
        var store = tx.objectStore("teams");
        return store.getAll();
      })
      .then(function(teams) {
        resolve(teams);
      });
  });
}

function getById(id) {
  return new Promise(function(resolve, reject) {
    dbPromised
      .then(function(db) {
        id = parseInt(id, 10)
        var tx = db.transaction("teams", "readonly");
        var store = tx.objectStore("teams");
        return store.get(id);
      })
      .then(function(team) {
        resolve(team);
      });
  });
}

function deleteFavoriteTeam(id) {
  dbPromised
    .then(function(db) {
      var tx = db.transaction("teams", "readwrite");
      var store = tx.objectStore("teams");
      store.delete(id);
      return tx.complete;
    })
    .then(function() {
      showNotif("Ouww.. why..", "you just deleted an awesome team tho :(");
      window.location.reload();
      // console.log("team has been deleted from favorited team");
    })
}