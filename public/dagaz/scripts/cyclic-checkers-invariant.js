(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "cyclic-checkers-invariant") {
      checkVersion(design, name, value);
  }
}

var isEq = function(a, b) {
  if ((a[0] !== null) && (b[0] === null)) return false;
  if ((a[0] === null) && (b[0] !== null)) return false;
  if ((a[0] !== null) && (b[0] !== null) && (a[0][0] != b[0][0])) return false;
  if ((a[1] !== null) && (b[1] === null)) return false;
  if ((a[1] === null) && (b[1] !== null)) return false;
  if ((a[1] !== null) && (b[1] !== null) && (a[1][0] != b[1][0])) return false;
  return a[3] == b[3];
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;
  var priority = []; var capturing = [];
  _.each(board.moves, function(move) {
       var isCapturing = false;
       _.each(move.actions, function(a) {
           if (a[0] === null) return;
           if (a[1] !== null) return;
           var piece = board.getPiece(a[0][0]);
           if (piece === null) return;
           isCapturing = false;
           if (piece.player == board.player) return;
           isCapturing = true;
           if (a[3] == 1) {
               priority.push(move);
           } else {
               capturing.push(move);
           }
      });
      if (isCapturing) {
           _.each(board.moves, function(m) {
                if (m.actions.length >= move.actions.length - 1) return;
                for (var i = 0; i < m.actions.length; i++) {
                    if (!isEq(m.actions[i], move.actions[i])) return;
                }
                m.failed = true;
           });
      }
  });
  if (priority.length == 0) {
      for (var src = Dagaz.Model.stringToPos("X8"); src < design.positions.length; src++) {
           var piece = board.getPiece(src);
           if ((piece !== null) && (piece.player == board.player)) {
               for (var dst = 0; dst < Dagaz.Model.stringToPos("X8"); dst++) {
                    if ((board.getPiece(dst) === null) && design.inZone(1, board.player, dst)) {
                        var move = Dagaz.Model.createMove(0);
                        move.movePiece(src, dst, piece);
                        board.moves.push(move);
                    }
               }
           }
      }
  } else {
      board.moves = _.union(priority, capturing);
  }
  CheckInvariants(board);
}

})();
