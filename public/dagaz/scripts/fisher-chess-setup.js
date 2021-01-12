(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "fisher-chess-setup") {
      checkVersion(design, name, value);
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

var getSetup = function(setup) {
  var str = window.location.search.toString();
  if (setup) {
      str = setup;
  }
  var result = str.match(/[?&]setup=([^&]*)/);
  if (result) {
      return result[1];
  } else {
      return "";
  }
}

var setPiece = function(design, board, pos, type) {
  var piece = Dagaz.Model.createPiece(type, 2);
  board.setPiece(pos, piece);
  pos += 56;
  piece = Dagaz.Model.createPiece(type, 1);
  board.setPiece(pos, piece);
}

var arrangePiece = function(design, board, positions, type) {
  ix = 0;
  if (positions.length > 1) {
      ix = _.random(0, positions.length - 1);
  }
  var pos = positions[ix];
  setPiece(design, board, pos, type);
  return _.without(positions, pos);
}

var setup = Dagaz.Model.setup;

Dagaz.Model.setup = function(board, init) {
  if (getSetup(init)) {
      setup(board, init);
      return;
  }
  var seed = getSeed();
  console.log("Seed: " + seed);
  Math.seedrandom(seed);
  var design = Dagaz.Model.design;
  var pos = _.random(1, 6);
  setPiece(design, board, pos, 5);
  var ix = 0;
  if (pos > 1) {
      ix = _.random(0, pos - 1);
  }
  setPiece(design, board, ix, 1);
  ix = pos + 1;
  if (pos < 6) {
      ix = _.random(pos + 1, 7);
  }
  setPiece(design, board, ix, 1);
  var positions = _.filter(_.range(8), function(p) {
      if (p % 2 == 0) return false;
      return board.getPiece(p) === null;
  });
  arrangePiece(design, board, positions, 3);
  positions = _.filter(_.range(8), function(p) {
      if (p % 2 != 0) return false;
      return board.getPiece(p) === null;
  });
  arrangePiece(design, board, positions, 3);
  positions = _.filter(_.range(8), function(p) {
      return board.getPiece(p) === null;
  });
  positions = arrangePiece(design, board, positions, 2);
  positions = arrangePiece(design, board, positions, 2);
  arrangePiece(design, board, positions, 4);
}

})();
