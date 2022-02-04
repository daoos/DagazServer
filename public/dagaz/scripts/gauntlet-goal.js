(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "gauntlet-goal") {
      checkVersion(design, name, value);
  }
}

var checkGoals = Dagaz.Model.checkGoals;

Dagaz.Model.checkGoals = function(design, board, player) {
  for (var pos = 0; pos < Dagaz.Model.WIDTH; pos++) {
       if (board.getPiece(pos) !== null) {
           if (player == 1) {
               return 1;
           } else {
               return -1;
           }
       }
  }

  return checkGoals(design, board, player);
}

})();
