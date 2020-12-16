(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "seega-extension") {
     checkVersion(design, name, value);
  }
}

var checkCaptures = function(design, board, pos, move) {
  var b = board.apply(move);
  var r = false;
  _.each(design.allDirections(), function(dir) {
      var p = design.navigate(1, pos, dir);
      if (p === null) return null;
      if (b.getPiece(p) !== null) return;
      _.each(design.allDirections(), function(d) {
          var q = design.navigate(1, p, d);
          if (q === null) return;
          if (q == pos) return;
          var piece = b.getPiece(q);
          if (piece === null) return;
          if (piece.player == board.player) return;
          q = design.navigate(1, q, d);
          if (q === null) return;
          piece = b.getPiece(q);
          if (piece === null) return;
          if (piece.player != board.player) return;
          r = true;
      });
  });
  return r;
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;
  _.each(board.moves, function(move) {
      if (move.isSimpleMove()) {
          var f = false;
          var pos = move.actions[0][1][0];
          _.each(design.allDirections(), function(dir) {
              var p = design.navigate(board.player, pos, dir);
              if ((p !== null) && !design.inZone(0, board.player, p)) {
                  var piece = board.getPiece(p);
                  if ((piece !== null) && (piece.player != board.player)) {
                      var q = design.navigate(board.player, p, dir);
                      if (q !== null) {
                          piece = board.getPiece(q);
                          if ((piece !== null) && (piece.player == board.player)) {
                              move.capturePiece(p);
                              f = true;
                          }
                      }
                  }
              }
          });
          if (f && checkCaptures(design, board, pos, move)) {
              move.setValue(0, pos);
              move.goTo(board.turn);
          } else if (board.getValue(0) !== null) {
              move.setValue(0, null);
          }
      }
  });
  CheckInvariants(board);
}

})();
