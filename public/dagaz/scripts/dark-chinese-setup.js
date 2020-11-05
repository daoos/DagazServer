(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "dark-chinese-setup") {
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
          r = r + Dagaz.Model.posToString(a[0][0]) + '-' + Dagaz.Model.posToString(a[1][0]);
      } else {
          r = r + Dagaz.Model.posToString(a[1][0]);
      }
      if (a[2] !== null) {
          r = r + " " + a[2][0].toString();
      }
  });
  return r;
}

var getName = function() {
  var str = window.location.pathname.toString();
  var result = str.match(/\/([^.\/]+)\./);
  if (result) {
      return result[1].replace("-board", "").replace("-ai", "").replace("-kanji", "");
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

var getPositions = function(design, player) {
  var r = [];
  _.each(design.allPositions(), function(pos) {
      if (design.inZone(8, player, pos)) {
          r.push(pos);
      }
  });
  return r;
}

var addPiece = function(design, board, player, type, positions) {
  if (positions.length == 0) return [];
  if (positions.length > 1) {
      var ix = _.random(0, positions.length - 1);
      board.setPiece(positions[ix], Dagaz.Model.createPiece(type, player));
      return _.without(positions, positions[ix]);
  } else {
      board.setPiece(positions[0], Dagaz.Model.createPiece(type, player));
      return [];
  }
}

var addPieces = function(design, board, player, type, cnt, positions) {
  for (;(cnt > 0) && (positions.length > 0); cnt--) {
      positions = addPiece(design, board, player, type, positions);
  }
  return positions;
}

var setup = Dagaz.Model.setup;

Dagaz.Model.setup = function(board) {
  if (getSetup()) {
      setup(board);
      return;
  }
  var seed = getSeed();
  console.log("Seed: " + seed);
  Math.seedrandom(seed);
  var design = Dagaz.Model.design;
  var positions = getPositions(design, 1);
  positions = addPieces(design, board, 1,  7, 5, positions);
  positions = addPieces(design, board, 1,  8, 2, positions);
  positions = addPieces(design, board, 1,  9, 2, positions);
  positions = addPieces(design, board, 1, 10, 2, positions);
  positions = addPieces(design, board, 1, 11, 2, positions);
  positions = addPieces(design, board, 1, 12, 2, positions);
  positions = getPositions(design, 2);
  positions = addPieces(design, board, 2,  7, 5, positions);
  positions = addPieces(design, board, 2,  8, 2, positions);
  positions = addPieces(design, board, 2,  9, 2, positions);
  positions = addPieces(design, board, 2, 10, 2, positions);
  positions = addPieces(design, board, 2, 11, 2, positions);
  positions = addPieces(design, board, 2, 12, 2, positions);
}

})();
