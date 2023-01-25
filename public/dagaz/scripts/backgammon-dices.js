(function() {

var isFuzzy = true;
var isBonus = false;

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name == "backgammon-dices") {
      if (value == "bonus") isBonus = true;
  } else {
      checkVersion(design, name, value);
  }
}

var moveToString = Dagaz.Model.moveToString;

Dagaz.Model.moveToString = function(move, part) {
  if ((move.actions.length > 0) && (move.actions[0][0] !== null) && (move.actions[0][1] !== null)) {
      return Dagaz.Model.posToString(move.actions[0][0][0]) + ' - ' +
             Dagaz.Model.posToString(move.actions[0][1][0]);
  }
  return moveToString(move, part);
}

var isPermited = function(design, board, move, value, alt) {
  if (move.mode == value) return true;
  if (alt === null) return false;
  return (value > alt) && (move.mode == alt);
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;
  var inHome = true;
  if (isFuzzy) {
      _.each(design.allPositions(), function(pos) {
          if (!inHome) return;
          var piece = board.getPiece(pos);
          if ((piece === null) || (piece.type > 0) || (piece.player != board.player)) return;
          if (!design.inZone(0, piece.player, pos)) inHome = false;
      });
  }
  var alt = null;
  if (inHome && isFuzzy) {
      var pos = design.navigate(board.player, 0, 6);
      for (var ix = 1; pos !== null; ix++) {
           var piece = board.getPiece(pos);
           if ((piece !== null) && (piece.player == board.player)) {
               alt = ix;
           }
           pos = design.navigate(board.player, pos, 6);
      }
  }
  _.each(board.moves, function(move) {
      if ((move.mode > 0) && (move.mode < 7)) {
          for (var pos = design.navigate(board.player, 0, 0); pos !== null; pos = design.navigate(board.player, pos, 0)) {
               var piece = board.getPiece(pos);
               if ((piece !== null) && isPermited(design, board, move, design.price[piece.type], alt)) {
                   var v = piece.getValue(0);
                   if ((v !== null) && (v > 1)) {
                        piece = piece.setValue(0, v - 1);
                        move.movePiece(pos, pos, piece);
                   } else {
                        if (isBonus && ((board.turn == 5) || (board.turn == 11))) {
                            if (piece.type < 7) {
                                var dice = Dagaz.Model.createPiece(design.price[piece.type] + 6, board.player).setValue(0, 2);
                                _.each(design.allPositions(), function(pos) {
                                    if (!design.inZone(1, board.player, pos)) return;
                                    move.dropPiece(pos, dice);
                                });
                                if (board.turn == 5) {
                                    move.goTo(2);
                                } else {
                                    move.goTo(8);
                                }
                            } else {
                                if (board.turn == 5) {
                                    move.goTo(0);
                                } else {
                                    move.goTo(6);
                                }
                            }
                        } else {
                            move.capturePiece(pos);
                        }
                   }
                   return;
               }
          }
          move.failed = true;
      }
  });
  CheckInvariants(board);
}

})();
