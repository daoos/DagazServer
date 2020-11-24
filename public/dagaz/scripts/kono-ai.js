(function() {

Dagaz.AI.AI_FRAME     = 2000;
Dagaz.AI.REP_DEEP     = 10;
Dagaz.AI.MAX_QS_LEVEL = 5;
Dagaz.AI.STALEMATE    = -1;

var penalty = 
  [-100, -50, -50,-100,
    -50,   0,   0, -50,
    -50,   0,   0, -50,
   -100, -50, -50,-100 ];

Dagaz.AI.getPrice = function(design, piece, pos) {
  var r = design.price[piece.type];
  r += penalty[pos];
  return r;
}

Dagaz.AI.isMajorPiece = function(type) {
  return true;
}

var getTarget = function(move) {
  for (var i = 0; i < move.actions.length; i++) {
       if (move.actions[i][0] !== null) {
           var pos = move.actions[i][0][0];
           if (move.actions[i][1] === null) return pos;
           return move.actions[i][1][0];
       }
  }
  return null;
}

Dagaz.AI.isRepDraw = function(board) {
  var z = board.zSign;
  for (var i = 0; i < Dagaz.AI.REP_DEEP; i++) {
       if (board.parent === null) return false;
       var pos = getTarget(board.move);
       board = board.parent;
       if (board.zSign == z) return true;
       if (pos === null) continue;
       if (board.getPiece(pos) !== null) return false;
  }
  return true;
}

Dagaz.AI.see = function(design, board, move) {
  return true;
}

Dagaz.AI.inCheck = function(design, board) {
  return false;
}

Dagaz.AI.heuristic = function(ai, design, board, move) {
  var r = 1;
  if (move.isSimpleMove()) {
      var pos = move.actions[0][1][0];
      var piece = board.getPiece(pos);
      if (piece !== null) {
          return Dagaz.AI.getPrice(design, piece, pos);
      }
  }
  return r;
}

Dagaz.AI.eval = function(design, params, board, player) {
  var r = 0;
  _.each(design.allPositions(), function(pos) {
      var piece = board.getPiece(pos);
      if (piece === null) return;
      var v = Dagaz.AI.getPrice(design, piece, pos);
      if (piece.player == player) {
          r += v;
      } else {
          r -= v;
      }
  });
  return r;
}

})();
