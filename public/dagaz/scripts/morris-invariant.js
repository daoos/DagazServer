(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "morris-invariant") {
     checkVersion(design, name, value);
  }
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;
  var cnt = board.getValue(board.player - 1);
  if ((cnt !== null) && (cnt > 0)) {
      _.each(board.moves, function(move) {
           if (!Dagaz.Model.isCapture(move)) {
               move.failed = true;
               return;
           }
           if (cnt > 1) {
               move.setValue(board.player - 1, cnt - 1);
               move.goTo(board.turn);
           } else {
               move.setValue(board.player - 1, null);
           }
      });
  } else {
      _.each(board.moves, function(move) {
           if (Dagaz.Model.isCapture(move)) {
               move.failed = true;
               return;
           }
      });
  }
  CheckInvariants(board);
}

})();
