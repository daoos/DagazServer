(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "stratego-goal") {
     checkVersion(design, name, value);
  }
}

var checkGoals = Dagaz.Model.checkGoals;

Dagaz.Model.checkGoals = function(design, board, player) {
  if (board.turn < 50) return null;
  var f = 0; var e = 0;
  _.each(design.allPositions(), function(pos) {
      var piece = board.getPiece(pos);
      if ((piece !== null) && (piece.type >= 11)) {
          if (piece.player == player) {
              f++;
          } else {
              e++;
          }
      }
  });
  if (f == 0) return -1;
  if (e == 0) return 1;
  return checkGoals(design, board, player);
}

})();
