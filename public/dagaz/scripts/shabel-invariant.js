(function() {

Dagaz.AI.AI_FRAME      = 2000;
Dagaz.AI.getForcedMove = Dagaz.AI.getChessForcedMove;

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "shabel-invariant") {
      checkVersion(design, name, value);
  }
}

if (!_.isUndefined(Dagaz.Controller.addSound)) {
    Dagaz.Controller.addSound(10, "../sounds/wind.wav");
}

var canEatMan = function(design, board, pos, dir) {
  var p = design.navigate(board.player, pos, dir);
  if (p === null) return false;
  var piece = board.getPiece(p);
  if (piece === null) return false;
  if (piece.player == board.player) return false;
  p = design.navigate(board.player, p, dir);
  if (p === null) return false;
  return board.getPiece(p) === null;
}

var canEatDama = function(design, board, pos, dir) {
  var p = design.navigate(board.player, pos, dir);
  while (p !== null) {
      if (board.getPiece(p) !== null) break;
      p = design.navigate(board.player, p, dir);
  }
  var piece = board.getPiece(p);
  if (piece === null) return false;
  if (piece.player == board.player) return false;
  p = design.navigate(board.player, p, dir);
  if (p === null) return false;
  return board.getPiece(p) === null;
}

var canEat = function(design, board, pos) {
  var piece = board.getPiece(pos);
  if (piece === null) return false;
  if (piece.type == 0) {
      return canEatMan(design, board, pos, 3) || 
             canEatMan(design, board, pos, 5) ||
             canEatMan(design, board, pos, 6) ||
             canEatMan(design, board, pos, 7);
  } else {
      return canEatDama(design, board, pos, 3) || 
             canEatDama(design, board, pos, 5) ||
             canEatDama(design, board, pos, 6) ||
             canEatDama(design, board, pos, 7);
  }
}

var checkGoals = Dagaz.Model.checkGoals;

Dagaz.Model.checkGoals = function(design, board, player) {
  board.generate(design);
  if (board.moves.length == 0) {
      for (var pos = 0; pos < 64; pos++) {
           var piece = board.getPiece(pos);
           if ((piece !== null) && (piece.player == board.player) && (piece.type < 2)) {
               if (canEat(design, board, pos)) return 1;
           }
      }
  }
  return checkGoals(design, board, player);
}

var findPiece = function(design, board, player, type) {
  var positions = design.allPositions();
  for (var i = 0; i < positions.length; i++) {
       var piece = board.getPiece(positions[i]);
       if ((piece !== null) && (piece.type == type) && (piece.player == player)) {
           return positions[i];
       }
  }
  return null;
}

var notSafe = function(design, board, player, king) {
  var pos = findPiece(design, board, player, king);
  if (pos === null) return true;
  board.generateInternal(board, false);
  var r = false;
  _.chain(board.moves)
   .filter(function(move) {
       return move.actions.length > 0;
    })
   .each(function(move) {
       _.chain(move.actions)
        .filter(function(action) {
             return (action[0] !== null) && (action[1] !== null);
         })
        .each(function(action) {
             if (action[1][0] == pos) {
                 r = true;
             }
         });
    });
  return r;
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;
  var king   = design.getPieceType("King");
  _.chain(board.moves)
   .filter(function(move) {
       return move.actions.length > 0;
    })
   .each(function(move) {
       var b = board.apply(move);
       if (notSafe(design, b, board.player, king)) {
           move.failed = true;
       }
    });
  CheckInvariants(board);
}

})();
