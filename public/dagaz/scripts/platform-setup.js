(function() {

var checkVersion = Dagaz.Model.checkVersion;
var percent = 15;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name == "platform-setup") {
      percent = +value;
  } else {
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

var getPosition = function(design, board, piece, positions) {
  var ix = _.random(0, positions.length - 1);
  return positions[ix];
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
  var pawn   = design.getPieceType("Pawn");
  var bomb   = design.getPieceType("Bomb");
  var positions = [];
  _.each(design.allPositions(), function(pos) {
      var piece = board.getPiece(pos);
      if (piece === null) return;
      if (piece.type != pawn) return;
      if (piece.player != 1) return;
      positions.push(pos);      
  });
  if (!_.isUndefined(design.reserve)) {
      _.each(_.keys(design.reserve), function(type) {
           var piece = Dagaz.Model.createPiece(+type, 1);
           for (var i = 0; i < design.reserve[type][1]; i++) {
                var pos = getPosition(design, board, piece, positions);
                board.setPiece(pos, piece);
                positions = _.without(positions, pos);
           }
      });
  }
  positions = [];
  _.each(design.allPositions(), function(pos) {
      var piece = board.getPiece(pos);
      if (piece === null) return;
      if (piece.type != pawn) return;
      if (piece.player != 2) return;
      positions.push(pos);
  });
  if (!_.isUndefined(design.reserve)) {
      _.each(_.keys(design.reserve), function(type) {
           var piece = Dagaz.Model.createPiece(+type, 2);
           for (var i = 0; i < design.reserve[type][2]; i++) {
                var pos = getPosition(design, board, piece, positions);
                board.setPiece(pos, piece);
                positions = _.without(positions, pos);
           }
      });
  }
}

})();
