(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "stratego-goal") {
     checkVersion(design, name, value);
  }
}

var checkGoals = Dagaz.Model.checkGoals;

Dagaz.Model.checkGoals = function(design, board, player) {
  var f = 0; var e = 0;
  _.each(design.allPositions(), function(pos) {
      var piece = board.getPiece(pos);
      if ((piece !== null) && (piece.type == 12)) {
          if (piece.player == player) {
              f++;
          } else {
              e++;
          }
      }
  });
  if (f == 1) return 1;
  if (e == 1) return -1;
  return checkGoals(design, board, player);
}

})();
