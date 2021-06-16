(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "cyclic-checkers-invariant") {
      checkVersion(design, name, value);
  }
}

var getLen = function(board, move) {
  var r = 0;
  var f = false;
  _.each(move.actions, function(a) {
      if (f) return;
      if (a[0] === null) return;
      if (a[1] !== null) return;
      var piece = board.getPiece(a[0][0]);
      if (piece === null) return;
      if (piece.player == board.player) {
          f = true;
      } else {
          r++;
      }
  });
  return r;
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var len = 0;
  _.each(board.moves, function(move) {
      var l = getLen(board, move);
      if (len < l) len = l;
  });
  _.each(board.moves, function(move) {
      var l = getLen(board, move);
      if (l < len) move.failed = true;
  });
  CheckInvariants(board);
}

})();
