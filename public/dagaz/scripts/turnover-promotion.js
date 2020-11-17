(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "turnover-promotion") {
     checkVersion(design, name, value);
  }
}

var isQueen = function(design, board, pos) {
  var p = design.navigate(board.player, pos, 8);
  if (p === null) return false;
  var piece = board.getPiece(p);
  if ((piece === null) || (piece.player != board.player)) return false;
  p = design.navigate(board.player, p, 8);
  if (p === null) return false;
  piece = board.getPiece(p);
  if ((piece === null) || (piece.player != board.player)) return false;
  return true;
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;
  _.each(board.moves, function(move) {
      if (!move.isSimpleMove() || !_.isUndefined(move.failed)) return;
      var pos = move.actions[0][0][0];
      var piece = board.getPiece(pos);
      if ((piece !== null) && (piece.type == 2)) {
           pos = move.actions[0][1][0];
           if (!design.inZone(0, board.player, pos)) return;
           if (board.getPiece(pos) !== null) return;
           pos = design.navigate(board.player, pos, 9);
           if (pos === null) return;
           piece = board.getPiece(pos);
           if (piece === null) return;
           pos = design.navigate(board.player, pos, 9);
           if (pos === null) return;
           if (board.getPiece(pos) === null) return;
           move.capturePiece(pos);
           if (piece.player != board.player) {
               pos = design.navigate(board.player, move.actions[0][1][0], 9);
               move.movePiece(pos, pos, piece.changeOwner(board.player));
           }
           return;
      }
      if ((piece !== null) && (piece.type == 0)) {
           pos = move.actions[0][1][0];
           if (!design.inZone(0, board.player, pos)) return;
           if ((move.mode == 0) || (move.mode == 1) || (move.mode == 2) || (move.mode == 3)) {
               if ((board.getPiece(pos) !== null) && (move.mode != 2) && (move.mode != 3)) {
                   move.failed = true;
                   return;
               }
               var p = design.navigate(board.player, pos, 8);
               if (p !== null) {
                   if (board.getPiece(p) === null) {
                        p = design.navigate(board.player, p, 8);
                        if ((p !== null) && (board.getPiece(p) !== null) && (move.mode != 2) && (move.mode != 3)) {
                             move.failed = true;
                             return;
                        }
                   } else {
                        p = design.navigate(board.player, p, 8);
                        if ((p !== null) && (board.getPiece(p) === null)) return;
                   }
               }
           }
           if ((board.getPiece(pos) !== null) || isQueen(design, board, pos)) {
               move.capturePiece(pos);
           }
           pos = design.navigate(board.player, pos, 8);
           if (pos === null) {
               move.failed = true;
               return;
           }
           var x = board.getPiece(pos);
           if ((x !== null) && (x.player == board.player)) return;
           piece = piece.promote(1);
           move.actions[0][1] = [pos];
           move.actions[0][2] = [piece];
           pos = design.navigate(board.player, pos, 8);
           if (pos === null) {
               move.failed = true;
               return;
           }
           piece = board.getPiece(pos);
           if (piece === null) {
               piece = Dagaz.Model.createPiece(2, board.player);
               move.dropPiece(pos, piece);
           } else {
               if (piece.player == board.player) return;
               piece = piece.changeOwner(board.player);
               move.movePiece(pos, pos, piece);
           }
      }
  });
  CheckInvariants(board);
}

})();
