(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "gog-goal") {
     checkVersion(design, name, value);
  }
}

var checkGoals = Dagaz.Model.checkGoals;

Dagaz.Model.checkGoals = function(design, board, player) {
  if (board.turn < 42) return null;
  var r = 0; var c = 0;
  _.each(design.allPositions(), function(pos) {
      var piece = board.getPiece(pos);
      if ((piece !== null) && (piece.type == 14) && (piece.player != player)) {
          if (design.inZone(1, player, pos)) {
              r = -1;
          }
          c++;
      }
  });
  if (c == 0) return 1;
  if (r < 0) return -1;
  return checkGoals(design, board, player);
}

})();
