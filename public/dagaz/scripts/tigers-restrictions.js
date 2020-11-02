(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "tigers-restrictions") {
     checkVersion(design, name, value);
  }
}

var checkGoals = Dagaz.Model.checkGoals;

Dagaz.Model.checkGoals = function(design, board, player) {
  var f = 0; var e = 0;
  _.each(design.allPositions(), function(pos) {
      var piece = board.getPiece(pos);
      if ((piece !== null) && (piece.type == 7)) {
          if (piece.player == player) {
              f++;
          } else {
              e++;
          }
      }
  });
  if (e == 0) return 1;
  if (f == 0) return -1;
  return checkGoals(design, board, player);
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design  = board.game.design;
  if ((board.parent !== null) && (board.parent.player == board.player)) {
      var pos = board.move.actions[0][1][0];
      var tiger = board.getPiece(pos);
      if (tiger !== null) {
          _.each(board.moves, function(move) {
               if (move.isPass()) return;
               pos = move.actions[0][0][0];
               var piece = board.getPiece(pos);
               if ((piece === null) || (piece.type != 0) || (tiger.type != 0)) {
                   move.failed = true;
               }
          });
      }
  }
  CheckInvariants(board);
}

})();
