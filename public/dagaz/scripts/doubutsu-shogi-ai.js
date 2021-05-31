(function() {

Dagaz.AI.AI_FRAME     = 3000;
Dagaz.AI.REP_DEEP     = 10;
Dagaz.AI.STALEMATE    = -1;

var penalty = [
  [   0, 300, 300, 300,   0,    // King
      0, 200, 100, 200,   0,
      0, 100, 150, 100,   0,
      0,  50, 100,  50,   0  ],      
  [   0,   0,   0,   0,   0,    // Za
      0, 200, 200, 200,   0,
      0, 100, 100, 100,   0,
      0,   0,   0,   0,   0  ],        
  [   0, 100, 200, 100,   0,    // Sang
      0, 200, 400, 200,   0,
      0, 200, 400, 200,   0,
      0, 100, 200, 100,   0  ],        
  [   0, 200, 300, 200,   0,    // Jang
      0, 300, 400, 300,   0,
      0, 300, 400, 300,   0,
      0, 200, 300, 200,   0  ],      
  [   0, 200, 300, 200,   0,    // Hu
      0, 400, 600, 400,   0,
      0, 400, 600, 400,   0,
      0, 300, 500, 300,   0  ]
];

Dagaz.AI.getPrice = function(design, piece, pos) {
  var r = design.price[piece.type];
  if (piece.player == 1) {
      r += penalty[piece.type][pos];
  } else {
      r += penalty[piece.type][19 - pos];
  }
  return r;
}

Dagaz.AI.isMajorPiece = function(type) {
  return type > 1;
}

Dagaz.AI.isRepDraw = function(board) {
  var z = board.zSign;
  for (var i = 0; i < Dagaz.AI.REP_DEEP; i++) {
       if (board.parent === null) return false;
       board = board.parent;
       if (board.zSign == z) return true;
  }
  return false;
}

Dagaz.AI.heuristic = function(ai, design, board, move) {
  var r = 1;
  if (move.actions.length > 0) {
      var pos = move.actions[0][1][0];
      var piece = board.getPiece(pos);
      if (piece !== null) {
          r += Dagaz.AI.getPrice(design, piece, pos);
      }
  }
  return r;
}

Dagaz.AI.eval = function(design, params, board, player) {
  if (_.isUndefined(board.completeEval)) {
      board.completeEval = 0;
      _.each(design.allPositions(), function(pos) {
           var piece = board.getPiece(pos);
           if (piece === null) return;
           var v = Dagaz.AI.getPrice(design, piece, pos);
           if (piece.player == board.player) {
               board.completeEval += v;
           } else {
               board.completeEval -= v;
           }
      });
  }
  if (board.player == player) {
      return board.completeEval;
  } else {
      return -board.completeEval;
  }
}

})();
