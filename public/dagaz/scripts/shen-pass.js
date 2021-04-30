(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "shen-pass") {
     checkVersion(design, name, value);
  }
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;
  var move = null;
  for (var b = board; b.parent !== null; b = b.parent) {
       if (!_.isUndefined(b.move) && (b.move.mode >= 1) && (b.move.mode <= 5)) {
           if (b.parent.player != board.player) {
               move = b.move;
           }
           break;
       }
  }
  if (move !== null) {
      if (design.inZone(2, board.player, move.actions[0][1][0])) {
          _.each(board.moves, function(move) {
               move.failed = true;
          });
      }
      _.each(board.moves, function(move) {
          if (!move.isPass() && (move.mode == 0)) {
              _.each(design.allPositions(), function(pos) {
                    var piece = board.getPiece(pos);
                    if ((piece !== null) && (piece.type < 2) && (piece.player != board.player)) {
                        move.capturePiece(pos);
                    }
              });
          }
      });
  }
  CheckInvariants(board);
}

})();
