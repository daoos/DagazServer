(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "progressive-chess-turns") {
      checkVersion(design, name, value);
  }
}

Dagaz.Model.findPiece = function(design, board, player, type) {
  var positions = design.allPositions();
  for (var i = 0; i < positions.length; i++) {
       var piece = board.getPiece(positions[i]);
       if ((piece !== null) && (piece.type == type) && (piece.player == player)) {
           return positions[i];
       }
  }
  return null;
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;
  var king   = design.getPieceType("King");
  var all = board.getValue(0);
  if (all === null) all = 1;
  var cnt = board.getValue(1);
  if (cnt === null) cnt = all;
  console.log("all = " + all + ", cnt = " + cnt);
  _.each(board.moves, function(move) {
      var notChecked = true;
      var b = board.apply(move);
      var pos = Dagaz.Model.findPiece(design, b, b.player, king);
      if (pos !== null) {
          if (Dagaz.Model.checkPositions(design, b, b.player, [pos])) notChecked = false;
      }
      if (notChecked && (cnt > 1)) {
          move.setValue(1, cnt - 1);
          move.goTo(board.turn);
      } else {
          move.setValue(0, all + 1);
          move.setValue(1, all + 1);
      }
  });
  CheckInvariants(board);
}

})();
