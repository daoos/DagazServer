(function() {

var large = false;

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name == "banqi-setup") {
      if (value == "large") large = true;
  } else {
      checkVersion(design, name, value);
  }
}

Dagaz.Model.moveToString = function(move) {
  var r = "";
  _.each(move.actions, function(a) {
      if (r != "") {
          r = r + " ";
      }
      if (a[0] != null) {
          r = r + Dagaz.Model.posToString(a[0][0]);
          if (a[1] !== null) {
              r = r + '-';
          }
      }
      if (a[1] !== null) {
          r = r + Dagaz.Model.posToString(a[1][0]);
      }
      if ((a[2] !== null) && ((a[0] != null) || (a[1] !== null))) {
          r = r + " " + a[2][0].toString();
      }
  });
  return r;
}

var getName = function() {
  var str = window.location.pathname.toString();
  var result = str.match(/\/([^.\/]+)\./);
  if (result) {
      return result[1].replace("-board", "").replace("-ai", "");
  } else {
      return str;
  }
}

var badName = function(str) {
  var result = str.match(/[?&]game=([^&*]*)/);
  if (result) {
      return result[1] != getName();
  } else {
      return true;
  }
}

var getCookie = function() {
  var result = localStorage.getItem('dagaz.setup');
  if (result) {
      if (badName(result)) return "";
      return "?setup=" + result;
  } else {
      return "";
  }
}

var getSetup = function(setup) {
  var str = window.location.search.toString();
  if (setup) {
      str = setup;
  }
  var result = str.match(/[?&]setup=([^&]*)/);
  if (result) {
      return result[1];
  } else {
      str = getCookie();
      result = str.match(/[?&]setup=([^&]*)/);
      if (result) {
          return result[1];
      } else {
          return "";
      }
  }
}

var getSeed = function() {
  var str = window.location.search.toString();
  var result = str.match(/[?&](seed|sid)=([^&]*)/);
  if (result) {
      return result[2];
  } else {
      return "" + _.random(0, 10000);
  }
}

var addPiece = function(board, type, player, avail) {
  var ix = 0;
  if (avail.length > 1) {
      ix = _.random(0, avail.length - 1);
  }
  board.setPiece(avail[ix], Dagaz.Model.createPiece(type, player));
  return _.without(avail, avail[ix]);
}

var setup = Dagaz.Model.setup;

Dagaz.Model.setup = function(board, init) {
  var s = getSetup(init);
  if (s) {
      setup(board, init);
      return;
  }
  var seed = getSeed();
  console.log("Seed: " + seed);
  Math.seedrandom(seed);
  var design = Dagaz.Model.design;
  var avail  = design.allPositions();
  avail = addPiece(board, 0, 1, avail); if (large) avail = addPiece(board, 0, 1, avail);
  avail = addPiece(board, 0, 2, avail); if (large) avail = addPiece(board, 0, 2, avail);
  avail = addPiece(board, 1, 1, avail); if (large) avail = addPiece(board, 1, 1, avail);
  avail = addPiece(board, 1, 2, avail); if (large) avail = addPiece(board, 1, 2, avail);
  avail = addPiece(board, 1, 1, avail); if (large) avail = addPiece(board, 1, 1, avail);
  avail = addPiece(board, 1, 2, avail); if (large) avail = addPiece(board, 1, 2, avail);
  avail = addPiece(board, 2, 1, avail); if (large) avail = addPiece(board, 2, 1, avail);
  avail = addPiece(board, 2, 2, avail); if (large) avail = addPiece(board, 2, 2, avail);
  avail = addPiece(board, 2, 1, avail); if (large) avail = addPiece(board, 2, 1, avail);
  avail = addPiece(board, 2, 2, avail); if (large) avail = addPiece(board, 2, 2, avail);
  avail = addPiece(board, 3, 1, avail); if (large) avail = addPiece(board, 3, 1, avail);
  avail = addPiece(board, 3, 2, avail); if (large) avail = addPiece(board, 3, 2, avail);
  avail = addPiece(board, 3, 1, avail); if (large) avail = addPiece(board, 3, 1, avail);
  avail = addPiece(board, 3, 2, avail); if (large) avail = addPiece(board, 3, 2, avail);
  avail = addPiece(board, 4, 1, avail); if (large) avail = addPiece(board, 4, 1, avail);
  avail = addPiece(board, 4, 2, avail); if (large) avail = addPiece(board, 4, 2, avail);
  avail = addPiece(board, 4, 1, avail); if (large) avail = addPiece(board, 4, 1, avail);
  avail = addPiece(board, 4, 2, avail); if (large) avail = addPiece(board, 4, 2, avail);
  avail = addPiece(board, 5, 1, avail); if (large) avail = addPiece(board, 5, 1, avail);
  avail = addPiece(board, 5, 2, avail); if (large) avail = addPiece(board, 5, 2, avail);
  avail = addPiece(board, 5, 1, avail); if (large) avail = addPiece(board, 5, 1, avail);
  avail = addPiece(board, 5, 2, avail); if (large) avail = addPiece(board, 5, 2, avail);
  avail = addPiece(board, 6, 1, avail); if (large) avail = addPiece(board, 6, 1, avail);
  avail = addPiece(board, 6, 2, avail); if (large) avail = addPiece(board, 6, 2, avail);
  avail = addPiece(board, 6, 1, avail); if (large) avail = addPiece(board, 6, 1, avail);
  avail = addPiece(board, 6, 2, avail); if (large) avail = addPiece(board, 6, 2, avail);
  avail = addPiece(board, 6, 1, avail); if (large) avail = addPiece(board, 6, 1, avail);
  avail = addPiece(board, 6, 2, avail); if (large) avail = addPiece(board, 6, 2, avail);
  avail = addPiece(board, 6, 1, avail); if (large) avail = addPiece(board, 6, 1, avail);
  avail = addPiece(board, 6, 2, avail); if (large) avail = addPiece(board, 6, 2, avail);
  avail = addPiece(board, 6, 1, avail); if (large) avail = addPiece(board, 6, 1, avail);
  avail = addPiece(board, 6, 2, avail); if (large) avail = addPiece(board, 6, 2, avail);
}

})();
