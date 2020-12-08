(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "camelot-extension") {
      checkVersion(design, name, value);
  }
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;
  _.each(board.moves, function(move) {
      var n = 0; var c = 0;
      var piece = null;
      var isCaptured = false;
      var inGoal = false;
      _.each(move.actions, function(a) {
          if ((a[0] !== null) && (a[1] === null)) {
               isCaptured = true;
               c++;
          }
          if ((a[0] !== null) && (a[1] !== null)) {
               if (piece === null) {
                   piece = board.getPiece(a[0][0]);
                   if (piece === null) {
                       move.failed = true;
                       return;
                   }
                   inGoal = design.inZone(0, board.player, a[0][0]);
               }
               if (inGoal && !design.inZone(0, board.player, a[1][0])) {
                   move.failed = true;
                   return;
               }
               if (!isCaptured && (c > 0)) {
                   move.failed = true;
                   return;
               }
               if (isCaptured && (c == 1) && (n > 0) && (piece.type == 0)) {
                   move.failed = true;
                   return;
               }
               isCaptured = false;
               n++;
          }
      });
  });
  CheckInvariants(board);
}

})();
