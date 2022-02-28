"use strict";

(function() {

Dagaz.AI.NOISE_FACTOR     = 3;

var pieceEmpty            = 0x00;
var pieceMan              = 0x01;
var pieceKing             = 0x02;
var pieceNo               = 0x80;

var moveflagPromotion     = 0x01000000;

Dagaz.AI.pieceAdj = [
[   0,    0,   0,   0,   0,   0,    0,    0, // pieceEmpty
    0,    0,   0,   0,   0,   0,    0,    0, 
    0,    0,   0,   0,   0,   0,    0,    0, 
    0,    0,   0,   0,   0,   0,    0,    0, 
    0,    0,   0,   0,   0,   0,    0,    0, 
    0,    0,   0,   0,   0,   0,    0,    0, 
    0,    0,   0,   0,   0,   0,    0,    0, 
    0,    0,   0,   0,   0,   0,    0,    0
], 
[   0,    0,   0,   0,   0,   0,    0,    0, // pieceMan
   40,   50,  50,  50,  50,  50,   50,   40, 
   30,   40,  40,  40,  40,  40,   40,   30, 
   20,   30,  30,  30,  30,  30,   30,   20, 
   10,   20,  20,  20,  20,  20,   20,   10, 
  -10,   10,  10,  10,  10,  10,   10,  -10, 
  -10,    0,   0,   0,   0,   0,    0,  -10, 
    0,   30,  30,  30,  30,  30,   30,    0
], 
[ -50,  -10, -10, -10, -10, -10,  -10,  -50, // pieceKing
  -10,    0,   0,   0,   0,   0,    0,  -10, 
  -10,    0,   0,   0,   0,   0,    0,  -10, 
  -10,    0,   0,   0,   0,   0,    0,  -10, 
  -10,    0,   0,   0,   0,   0,    0,  -10, 
  -10,    0,   0,   0,   0,   0,    0,  -10, 
  -10,    0,   0,   0,   0,   0,    0,  -10, 
  -50,  -10, -10, -10, -10, -10,  -10,  -50
]];

function GenerateCaptureMoves(moves) {
  var color = Dagaz.AI.g_toMove ? Dagaz.AI.colorWhite : Dagaz.AI.colorBlack;
  for (var pos = 0; pos < 256; pos++) {
       if (Dagaz.AI.g_board[pos] & color) {
           GenerateCaptureMovesFrom(moves, pos);
       }
  }
}

function GenerateQuietMoves(moves) {
  var color = Dagaz.AI.g_toMove ? Dagaz.AI.colorWhite : Dagaz.AI.colorBlack;
  for (var pos = 0; pos < 256; pos++) {
       if (Dagaz.AI.g_board[pos] & color) {
           GenerateQuietMovesFrom(moves, pos);
       }
  }
}

function CheckKing(moves) {
  var result = [];
  for (var i = 0; i < moves.length; i++) {
      for (var j = 0; j < moves[i].length; j++) {
           var target = (moves[i][j] >> 16) & 0xFF;
           var pieceType = Dagaz.AI.g_board[target] & Dagaz.AI.TYPE_MASK;
           if (pieceType == pieceKing) {
               result.push(moves[i]);
               break;
           }
      }
  }
  return result;
}

function CheckInvariant(moves) {
  var mx = 0;
  for (var i = 0; i < moves.length; i++) {
      if (mx < moves[i].length) mx = moves[i].length;
  }
  var result = [];
  for (var i = 0; i < moves.length; i++) {
      if (moves[i].length == mx) result.push(moves[i]);
  }
  return result;
}

function CheckPromotion(moves) {
  var result = [];
  for (var i = 0; i < moves.length; i++) {
      if ((moves[i].length > 0) && (moves[i][0] & moveflagPromotion)) result.push(moves[i]);
  }
  return result;
}

Dagaz.AI.GenerateAllMoves = function() {
  var moves = [];
  GenerateCaptureMoves(moves);
  if (moves.length > 0) {
      var m = CheckKing(moves);
      if (m.length > 0) {
          moves = CheckInvariant(m);
      } else {
          moves = CheckInvariant(moves);
      }
  }
  if (moves.length == 0) {
      GenerateQuietMoves(moves);
  }
  return moves;
}

Dagaz.AI.GenerateCaptureMoves = function() {
  var moves = [];
  GenerateCaptureMoves(moves);
  if (moves.length > 0) {
      var m = CheckKing(moves);
      if (m.length > 0) {
          moves = CheckInvariant(m);
      } else {
          moves = CheckInvariant(moves);
      }
  }
  if (moves.length == 0) {
      GenerateQuietMoves(moves);
      moves = CheckPromotion(moves);
  }
  return moves;
}

function GenerateQuietStep(moves, from, to, isMan) {
    var flags = 0;
    if (isMan) {
        var row = to & 0xF0;
        if (!Dagaz.AI.g_toMove && (row == 0x90)) {
            flags = moveflagPromotion;
        }
        if (Dagaz.AI.g_toMove && (row == 0x20)) {
            flags = moveflagPromotion;
        }
    }
    moves.push(from | (to << 8) | flags);
}

function GenerateCaptureStep(from, dir, isMan) {
    var enemy = Dagaz.AI.g_toMove == Dagaz.AI.colorWhite ? Dagaz.AI.colorBlack : Dagaz.AI.colorWhite;
    var captured = +from + dir;
    if ((Dagaz.AI.g_board[captured] & enemy) == 0) return 0;
    if (isMan) {
        if ((Dagaz.AI.g_board[captured] & Dagaz.AI.TYPE_MASK) == pieceKing) return 0;
    }
    var to = +captured + dir;
    if (Dagaz.AI.g_board[to] != pieceEmpty) return 0;
    var flags = 0;
    if (isMan) {
        var row = to & 0xF0;
        if (!Dagaz.AI.g_toMove && (row == 0x90)) {
            flags = moveflagPromotion;
        }
        if (Dagaz.AI.g_toMove && (row == 0x20)) {
            flags = moveflagPromotion;
        }
    }
    return from | (to << 8) | (captured << 16) | flags;
}

function GenerateCaptureMovesFromTree(moves, from, isMan, stack, isDone) {
    var r = true;
    var inc = (Dagaz.AI.g_toMove == Dagaz.AI.colorWhite) ? -16 : 16;
    var dirs = [-17, -15, 15, 17];
    if (isMan) dirs = [inc - 1, inc + 1];
    _.each(dirs, function(dir) {
        if (isDone) return;
        var step = GenerateCaptureStep(from, dir, isMan);
        if (step == 0) return;
        var pos = (step >> 8) & 0xFF;
        stack.push(step);
        Dagaz.AI.MakeStep(step, 0);
        if (GenerateCaptureMovesFromTree(moves, pos, isMan, stack, step & moveflagPromotion)) r = false;
        Dagaz.AI.UnmakeStep();
        stack.pop();
    });
    if (r && (stack.length > 0)) {
        var move = new Array();
        for (var i = 0; i < stack.length; i++) {
            move.push(stack[i]);
        }
        moves.push(move);
    }
    return !r;
}

function GenerateCaptureMovesFrom(moves, from) {
    var piece = Dagaz.AI.g_board[from] & Dagaz.AI.TYPE_MASK;   
    GenerateCaptureMovesFromTree(moves, from, piece == pieceMan, new Array());
}

function GenerateQuietMovesFrom(moves, from) {
    var to; var steps;
    var inc = (Dagaz.AI.g_toMove == Dagaz.AI.colorWhite) ? -16 : 16;
    var piece = Dagaz.AI.g_board[from] & Dagaz.AI.TYPE_MASK;

    if (piece == pieceMan) {
        to = from + inc - 1; steps = new Array();
        if (Dagaz.AI.g_board[to] == 0) GenerateQuietStep(steps, from, to, true);
        moves.push(steps);
        to = from + inc + 1; steps = new Array();
        if (Dagaz.AI.g_board[to] == 0) GenerateQuietStep(steps, from, to, true);
        moves.push(steps);
    }

    if (piece == pieceKing) {
        to = from - 17; steps = new Array();
        if (Dagaz.AI.g_board[to] == 0) GenerateQuietStep(steps, from, to, false);
        moves.push(steps);
        to = from + 17; steps = new Array();
        if (Dagaz.AI.g_board[to] == 0) GenerateQuietStep(steps, from, to, false);
        moves.push(steps);
        to = from - 15; steps = new Array();
        if (Dagaz.AI.g_board[to] == 0) GenerateQuietStep(steps, from, to, false);
        moves.push(steps);
        to = from + 15; steps = new Array();
        if (Dagaz.AI.g_board[to] == 0) GenerateQuietStep(steps, from, to, false);
        moves.push(steps);
    }
}

Dagaz.AI.Mobility = function(color) {
    var mob, to, pos;
    var result = 0;
    var inc = color == Dagaz.AI.colorWhite ? -16 : 16;
    var me = color == Dagaz.AI.colorWhite ? Dagaz.AI.colorWhite : Dagaz.AI.colorBlack;
    var enemy = color == Dagaz.AI.colorWhite ? Dagaz.AI.colorBlack : Dagaz.AI.colorWhite;
    for (var from = 0; from < 256; from++) {
         if (Dagaz.AI.g_board[from] & me) {
             var piece = Dagaz.AI.g_board[from] & Dagaz.AI.TYPE_MASK;
             if (piece == pieceMan) {
                 mob = 0;
                 to = from + inc - 1; 
                 if (Dagaz.AI.g_board[to] == 0) mob++;
                 if (Dagaz.AI.g_board[to] & enemy) {
                     pos = to - inc + 1;
                     if (Dagaz.AI.g_board[pos] != 0) {
                         mob += 4;
                         to += inc - 1;
                         if (Dagaz.AI.g_board[to] == 0) mob += 4;
                     }
                 }
                 to = from + inc + 1; 
                 if (Dagaz.AI.g_board[to] == 0) mob++;
                 if (Dagaz.AI.g_board[to] & enemy) {
                     pos = to - inc - 1;
                     if (Dagaz.AI.g_board[pos] != 0) {
                         mob += 4;
                         to += inc + 1;
                         if (Dagaz.AI.g_board[to] == 0) mob += 4;
                     }
                 }
                 to = from - inc - 1;
                 if (Dagaz.AI.g_board[to] & enemy) mob++;
                 to = from - inc + 1;
                 if (Dagaz.AI.g_board[to] & enemy) mob++;
                 to = from + (inc * 2);
                 while (Dagaz.AI.g_board[to] == 0) to += inc * 2;
                 if ((Dagaz.AI.g_board[to] & enemy) && ((Dagaz.AI.g_board[to] & Dagaz.AI.TYPE_MASK) == pieceMan)) mob += 4;
                 result += 10 * mob;
             }
             if (piece == pieceKing) {
                 mob = -2;
                 to = from - 17; if (Dagaz.AI.g_board[to] == 0) mob++;
                 to = from - 15; if (Dagaz.AI.g_board[to] == 0) mob++;
                 to = from + 17; if (Dagaz.AI.g_board[to] == 0) mob++;
                 to = from + 15; if (Dagaz.AI.g_board[to] == 0) mob++;
                 to = from + 32; if (Dagaz.AI.g_board[to] & enemy) mob += 2;
                 to = from - 32; if (Dagaz.AI.g_board[to] & enemy) mob += 2;
                 to = from + 2;  if (Dagaz.AI.g_board[to] & enemy) mob += 2;
                 to = from - 2;  if (Dagaz.AI.g_board[to] & enemy) mob += 2;
                 result += 50 * mob;
             }
         }
    }
    return result;
}

})();
