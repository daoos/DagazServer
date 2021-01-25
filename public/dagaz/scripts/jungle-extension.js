(function() {

Dagaz.AI.AI_FRAME      = 3000;
Dagaz.AI.getForcedMove = Dagaz.AI.getChessForcedMove;
Dagaz.AI.strictMode    = false;

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name == "jungle-extension") {
      if (value == "strict") {
          Dagaz.AI.strictMode = true;
      }
  } else {
      checkVersion(design, name, value);
  }
}

var isGe = function(a, b) {
  if ((a == 1) && (b == 8)) {
      return true;
  }
  if (Dagaz.AI.strictMode) {
      if ((a == 8) && (b == 1)) return false;
  }
  return a >= b;
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;
  board.moves = _.chain(board.moves)
   .filter(function(move) {
       if (move.actions.length != 1) return false;
       return (move.actions[0][0] !== null) && (move.actions[0][1] !== null);
    })
   .filter(function(move) {
       var to = move.actions[0][1][0];
       var target = board.getPiece(to);
       if (target === null) return true;
       var from = move.actions[0][0][0];
       var piece = board.getPiece(from);
       if (design.inZone(1, board.player, from) != design.inZone(1, board.player, to)) return false;
       if (isGe(piece.getValue(0), target.getValue(0))) return true;
       if (design.inZone(0, target.player, to)) return true;
       return false;
    })
   .value();
  CheckInvariants(board);
}

})();
