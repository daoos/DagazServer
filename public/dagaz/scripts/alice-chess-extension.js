(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "alice-chess-extension") {
      checkVersion(design, name, value);
  }
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;
  _.each(board.moves, function(move) {
      _.each(move.actions, function(a) {
          var piece = board.getPiece(a[0][0]);
          if (piece !== null) {
              var m = +piece.type % 2;
              var target = board.getPiece(a[1][0]);
              if (target !== null) {
                  var t = +target.type % 2;
                  if (m != t) {
                      move.failed = true;
                      return;
                  }
              }
              var pieces = [];
              if ((a[2] !== null) && (a[2][0].type != piece.type)) {
                  piece = a[2][0];
                  if (m == 0) {
                      pieces.push(piece.promote(7));
                      pieces.push(piece.promote(5));
                      pieces.push(piece.promote(3));
                      pieces.push(piece.promote(9));
                  } else {
                      pieces.push(piece.promote(6));
                      pieces.push(piece.promote(4));
                      pieces.push(piece.promote(2));
                      pieces.push(piece.promote(8));
                  }
              } else {
                  if (m == 0) {
                      pieces.push(piece.promote(+piece.type + 1));
                  } else {
                      pieces.push(piece.promote(+piece.type - 1));
                  }
              }
              if (pieces.length > 0) {
                  a[2] = pieces;
              }
          }
      });
  });
  CheckInvariants(board);
}

})();
