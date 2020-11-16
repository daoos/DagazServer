(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "morris-extension") {
     checkVersion(design, name, value);
  }
}

Dagaz.Model.isLine = function(design, board, player, pos, dir, empty) {
  var p = design.navigate(player, pos, dir);
  if (p === null) return false;
  if ((empty !== null) && (p == empty)) return false;
  var piece = board.getPiece(p);
  if (piece === null) return false;
  if (piece.player != player) return false;
  var q = design.navigate(player, p, dir);
  if (q === null) return false;
  if ((empty !== null) && (q == empty)) return false;
  piece = board.getPiece(q);
  if (piece === null) return false;
  if (piece.player != player) return false;
  return true;
}

Dagaz.Model.isMiddle = function(design, board, player, pos, dir, empty) {
  var p = design.navigate(player, pos, dir);
  if (p === null) return false;
  if ((empty !== null) && (p == empty)) return false;
  var piece = board.getPiece(p);
  if (piece === null) return false;
  if (piece.player != player) return false;
  var q = design.navigate(0, pos, dir);
  if (q === null) return false;
  if ((empty !== null) && (q == empty)) return false;
  piece = board.getPiece(q);
  if (piece === null) return false;
  if (piece.player != player) return false;
  return true;
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;
  var dirs   = [];
  dirs.push(design.getDirection("n")); dirs.push(design.getDirection("ne"));
  dirs.push(design.getDirection("e")); dirs.push(design.getDirection("se"));
  dirs.push(design.getDirection("s")); dirs.push(design.getDirection("sw"));
  dirs.push(design.getDirection("w")); dirs.push(design.getDirection("nw"));
  _.each(board.moves, function(move) {
      var cnt   = 0;
      var empty = null;
      if ((move.actions.length > 0) && (move.actions[0][1] !== null)) {
          var pos = move.actions[0][1][0];
          if (move.actions[0][0] !== null) {
              empty = move.actions[0][0][0];
          }
          for (var i = 0; i < 8; i++) {
              if (Dagaz.Model.isLine(design, board, board.player, pos, dirs[i], empty)) {
                  cnt++;
              }
          }
          for (var i = 0; i < 4; i++) {
              if (Dagaz.Model.isMiddle(design, board, board.player, pos, dirs[i], empty)) {
                  cnt++;
              }
          }
      }
      move.mode = cnt;
      if (cnt > 0) {
          move.setValue(board.player - 1, cnt);
          move.goTo(board.turn);
      }
  });
  CheckInvariants(board);
}

})();
