(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "stapeldammen-restrictions") {
     checkVersion(design, name, value);
  }
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;
  var moves = [];
  if (!_.isUndefined(board.move)) {
      var lastt = null; var lastf = null;
      if (board.move.isPass()) {
          _.each(board.parent.move.actions, function(a) {
              if ((a[0] !== null) && (a[1] !== null) && (a[0][0] != a[1][0])) {
                   lastf = a[0][0];
                   lastt = a[1][0];
              }
          });
          _.each(board.moves, function(move) {
               if (move.mode == 0) {
                   _.each(move.actions, function(a) {
                        if ((a[0] !== null) && (a[1] !== null) && (a[0][0] != a[1][0])) {
                            var f = a[0][0]; var t = a[1][0];
                            if ((f == lastt) && (t != lastf)) {
                                moves.push(move);
                                Dagaz.View.getView().current = [f];
                            }
                        }
                   });
               }
          });
      } else if (board.move.mode == 0) {
          _.each(board.move.actions, function(a) {
              if ((a[0] !== null) && (a[1] !== null) && (a[0][0] != a[1][0])) {
                   lastf = a[0][0];
                   lastt = a[1][0];
              }
          });
          var pos = lastt;
          var f = false;
          _.each(design.allDirections(), function(dir) {
              var p = design.navigate(board.player, pos, dir);
              if (p === null) return;
              var piece = board.getPiece(p);
              if (piece === null) return;
              if (piece.player != board.player) return;
              p = design.navigate(board.player, p, dir);
              if (p === null) return;
              if (p == lastf) return;
              if (board.getPiece(p) !== null) return;
              f = true;
          });
          if (f) {
              moves.push(Dagaz.Model.createMove(1));
          }
      }
  }
  if (moves.length > 0) {
      board.moves = moves;
  }
  CheckInvariants(board);
}

})();
