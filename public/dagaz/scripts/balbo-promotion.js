(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "balbo-promotion") {
     checkVersion(design, name, value);
  }
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;
  _.each(board.moves, function(move) {
      if (move.isSimpleMove()) {
          var pos = move.actions[0][0][0];
          var piece = board.getPiece(pos);
          if ((piece !== null) && (piece.type == 0)) {
              var pieces = [];
              if (design.inZone(0, piece.player, move.actions[0][1][0])) {
                  pieces.push(piece.promote(design.getPieceType("Bishop")));
                  pieces.push(piece.promote(design.getPieceType("Knight")));
                  pieces.push(piece.promote(design.getPieceType("Rook")));
                  pieces.push(piece.promote(design.getPieceType("Queen")));
              }
              if (design.inZone(1, piece.player, move.actions[0][1][0])) {
                  pieces.push(piece.promote(design.getPieceType("Bishop")));
                  pieces.push(piece.promote(design.getPieceType("Knight")));
              }
              if (pieces.length > 0) {
                  move.actions[0][2] = pieces;
              }
          }
      }
  });
  CheckInvariants(board);
}

})();
