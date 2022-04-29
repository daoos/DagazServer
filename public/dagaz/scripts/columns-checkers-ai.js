"use strict";

(function() {

Dagaz.AI.NOISE_FACTOR   = 5;
Dagaz.AI.g_timeout      = 3000;
Dagaz.AI.g_maxply       = 10;

var STACK_MASK          = 0x0F;
var MAX_STACK           = 32;

Dagaz.AI.PIECE_MASK     = 0x3F;
Dagaz.AI.TYPE_MASK      = 0x10;
Dagaz.AI.PLAYERS_MASK   = 0x60;
Dagaz.AI.TYPE_SIZE      = 5;
Dagaz.AI.STACK_SIZE     = 4;

Dagaz.AI.colorBlack     = 0x40;
Dagaz.AI.colorWhite     = 0x20;
Dagaz.AI.PLAYERS_MASK   = 0x60;

var pieceEmpty          = 0x00;
var pieceMan            = 0x00;
var pieceKing           = 0x10;
var pieceNo             = 0x80;

var moveflagPromotion   = 0x01000000;

var stacks = new Array();
var g_moveUndoStack = new Array();

var materialTable = [100, 1000];

var pieceSquareAdj = new Array(2);
var flipTable = new Array(256);

Dagaz.AI.pieceAdj = [
[   0,    0,   0,   0,   0,   0,    0,    0, // pieceMan
   50,    0,  50,   0,  50,   0,   50,    0, 
    0,   40,   0,  10,   0,  10,    0,    0, 
   -5,    0, 100,   0,   0,   0,    0,    0, 
    0,   20,   0,  20,   0,   0,    0,   -5, 
  -10,    0,  10,   0,  10,   0,    0,    0, 
    0,    0,   0,   0,   0,   0,    0,  -10, 
  -50,    0, -20,   0, -20,   0,  -20,    0 
], 
[   0,    0,   0,   0,   0,   0,    0,  100, // pieceKing
    0,    0,   0,   0,   0,   0,   70,    0, 
    0,    0,   0,   0,   0,  70,    0,    0, 
    0,    0,   0,   0,  70,   0,    0,    0, 
    0,    0,   0,  70,   0,   0,    0,    0, 
    0,    0,  70,   0,   0,   0,    0,    0, 
    0,   70,   0,   0,   0,   0,    0,    0, 
  100,    0,   0,   0,   0,   0,    0,    0 
]];

function clearStacks() {
  stacks = [];
  stacks.push([]);
  for (var i = 0; i < 15; i++) {
       var d = [];
       for (var j = 0; j < MAX_STACK; j++) {
           d.push(0);
       }
       stacks.push({
           head: 0, 
           tail: 0, 
           data: d
       });
  }
}

function isEmpty(ix) {
  return stacks[ix].head == stacks[ix].tail;
}

function getStack() {
  for (var ix = 1; ix < stacks.length; ix++) {
       if (isEmpty(ix)) return ix;
  }
  return 0;
}

function pushStack(ix, x) {
  var offset = stacks[ix].head + 1;
  if (offset >= MAX_STACK) offset = 0;
  if (offset == stacks[ix].tail) return false;
  stacks[ix].data[stacks[ix].head] = x;
  stacks[ix].head = offset;
  return true;
}

function popStack(ix) {
  if (stacks[ix].head == stacks[ix].tail) return null;
  stacks[ix].head--;
  if (stacks[ix].head < 0) stacks[ix].head = MAX_STACK - 1;
  return stacks[ix].data[stacks[ix].head];
}

function shiftStack(ix) {
  if (stacks[ix].head == stacks[ix].tail) return null;
  var r = stacks[ix].data[stacks[ix].tail];
  stacks[ix].tail++;
  if (stacks[ix].tail >= MAX_STACK) stacks[ix].tail = 0;
  return r;
}

function unshiftStack(ix, x) {
  var offset = stacks[ix].tail - 1;
  if (offset < 0) offset = MAX_STACK - 1;
  if (offset == stacks[ix].head) return false;
  stacks[ix].data[offset] = x;
  stacks[ix].tail = offset;
  return true;
}

function iterateStack(ix, f) {
  var offset = stacks[ix].tail;
  while (offset != stacks[ix].head) {
      f(stacks[ix].data[offset]);
      offset++;
      if (offset >= MAX_STACK) offset = 0;
  }
}

Dagaz.AI.MakeSquare = function(row, column) {
    return ((row + 2) << 4) | (column + 2);
}

Dagaz.AI.FormatSquare = function(square) {
    var letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    return letters[(square & 0xF) - 2] + (((Dagaz.Model.HEIGHT + 1) - (square >> 4)) + 1);
}

Dagaz.AI.FormatMove = function(move) {
    var result = null;
    for (var i = 0; i < move.length; i++) {
        if (result === null) {
            result = Dagaz.AI.FormatSquare(move[i] & 0xFF);
        }
        result = result + Dagaz.AI.FormatSquare((move[i] >> 8) & 0xFF);
    }
    return result;
}

function MakeTable(table) {
    var result = new Array(256);
    for (var i = 0; i < 256; i++) {
        result[i] = 0;
    }
    for (var row = 0; row < Dagaz.Model.HEIGHT; row++) {
        for (var col = 0; col < Dagaz.Model.WIDTH; col++) {
            result[Dagaz.AI.MakeSquare(row, col)] = table[row * Dagaz.Model.WIDTH + col];
        }
    }
    return result;
}

function Mobility(color) {
    var result = 0; var to;
    var me = color == Dagaz.AI.colorWhite ? Dagaz.AI.colorWhite : Dagaz.AI.colorBlack;
    var enemy = color == Dagaz.AI.colorWhite ? Dagaz.AI.colorBlack : Dagaz.AI.colorWhite;
    for (var pos = 0; pos < 256; pos++) {
        if (Dagaz.AI.g_board[pos] & me) {
            var player = Dagaz.AI.g_board[pos] & Dagaz.AI.PLAYERS_MASK;
            var inc = (player == Dagaz.AI.colorWhite) ? -16 : 16;
            var ix = Dagaz.AI.g_board[pos] & STACK_MASK;
            if (ix > 0) {
                iterateStack(ix, function(x) {
                     var pieceType = (x & Dagaz.AI.TYPE_MASK) >> Dagaz.AI.STACK_SIZE;
                     if (!(x & me)) result += materialTable[pieceType];
                });
            }
            to = pos + (inc - 1);
            if (Dagaz.AI.g_board[to] == pieceEmpty) {
                result += 20;
            } else if (Dagaz.AI.g_board[to] & enemy) {
                var pieceType = (Dagaz.AI.g_board[to] & Dagaz.AI.TYPE_MASK) >> Dagaz.AI.STACK_SIZE;
                to += inc - 1;
                if (Dagaz.AI.g_board[to] == pieceEmpty) result += materialTable[pieceType] >> 1;
            }
            to = pos + (inc + 1);
            if (Dagaz.AI.g_board[to] == pieceEmpty) {
                result += 20;
            } else if (Dagaz.AI.g_board[to] & enemy) {
                var pieceType = (Dagaz.AI.g_board[to] & Dagaz.AI.TYPE_MASK) >> Dagaz.AI.STACK_SIZE;
                to += inc + 1;
                if (Dagaz.AI.g_board[to] == pieceEmpty) result += materialTable[pieceType] >> 1;
            }
            to = pos - (inc - 1);
            if (Dagaz.AI.g_board[to] & enemy) {
                var pieceType = (Dagaz.AI.g_board[to] & Dagaz.AI.TYPE_MASK) >> Dagaz.AI.STACK_SIZE;
                to -= inc - 1;
                if (Dagaz.AI.g_board[to] == pieceEmpty) result += materialTable[pieceType] >> 1;
            }
            to = pos - (inc + 1);
            if (Dagaz.AI.g_board[to] & enemy) {
                var pieceType = (Dagaz.AI.g_board[to] & Dagaz.AI.TYPE_MASK) >> Dagaz.AI.STACK_SIZE;
                to -= inc + 1;
                if (Dagaz.AI.g_board[to] == pieceEmpty) result += materialTable[pieceType] >> 1;
            }
        }
    }
    return result;
}

Dagaz.AI.Evaluate = function() {
    var curEval = Dagaz.AI.g_baseEval;
    var mobility = Mobility(Dagaz.AI.colorWhite) - Mobility(0);
    if (Dagaz.AI.g_toMove == 0) {
        // Black
        curEval -= mobility;
    }
    else {
        curEval += mobility;
    }
    return curEval;
}

var ResetGame = Dagaz.AI.ResetGame;

Dagaz.AI.ResetGame = function() {
  ResetGame();

  for (var row = 0; row < Dagaz.Model.HEIGHT; row++) {
       for (var col = 0; col < Dagaz.Model.WIDTH; col++) {
            var square = Dagaz.AI.MakeSquare(row, col);
            flipTable[square] = Dagaz.AI.MakeSquare((Dagaz.Model.HEIGHT - 1) - row, (Dagaz.Model.WIDTH - 1) - col);
       }
  }

  pieceSquareAdj[pieceMan >> Dagaz.AI.STACK_SIZE]  = MakeTable(Dagaz.AI.pieceAdj[pieceMan >> Dagaz.AI.STACK_SIZE]);
  pieceSquareAdj[pieceKing >> Dagaz.AI.STACK_SIZE] = MakeTable(Dagaz.AI.pieceAdj[pieceKing >> Dagaz.AI.STACK_SIZE]);
}

Dagaz.AI.InitializeFromFen = function(fen) {
    var chunks = fen.split(' ');

    clearStacks();
    for (var i = 0; i < 256; i++) 
        Dagaz.AI.g_board[i] = pieceNo;

    var row = 0;
    var col = 0;

    var pieces = chunks[0];
    for (var i = 0; i < pieces.length; i++) {
        var c = pieces.charAt(i);
        
        if (c == '/') {
            row++;
            col = 0;
        } else {
            if (c >= '0' && c <= '9') {
                for (var j = 0; j < parseInt(c); j++) {
                    Dagaz.AI.g_board[Dagaz.AI.MakeSquare(row, col)] = pieceEmpty;
                    col++;
                }
            } else {
                var isBlack = c >= 'a' && c <= 'z';
                var piece = isBlack ? Dagaz.AI.colorBlack : Dagaz.AI.colorWhite;
                if (!isBlack) 
                    c = pieces.toLowerCase().charAt(i);
                switch (c) {
                    case 'p':
                        piece |= pieceMan;
                        break;
                    case 'k':
                        piece |= pieceKing;
                        break;
                }

                if ((i < pieces.length - 1) && (pieces.charAt(i + 1) == '[')) {
                    var ix = getStack(); i += 2;
                    var ps = 0;
                    for (; i < pieces.length; i++) {
                        var c = pieces.charAt(i);
                        if (c == ']') break;
                        if (ix > 0) {
                            var ib = c >= 'a' && c <= 'z';
                            var x = ib ? Dagaz.AI.colorBlack : Dagaz.AI.colorWhite;
                            if (!ib) 
                                c = pieces.toLowerCase().charAt(i);
                            switch (c) {
                                case 'p':
                                    x |= pieceMan;
                                    break;
                                case 'k':
                                    x |= pieceKing;
                                    break;
                            }
                            pushStack(ix, x);
                            ps++;
                        }
                    }
                    if (ps > 0) {
                        piece |= ix;
                    }
                }
                
                Dagaz.AI.g_board[Dagaz.AI.MakeSquare(row, col)] = piece;
                col++;
            }
        }
    }

    Dagaz.AI.g_toMove = chunks[1].charAt(0) == 'w' ? Dagaz.AI.colorWhite : pieceEmpty;

    var hashResult = Dagaz.AI.SetHash();
    Dagaz.AI.g_hashKeyLow = hashResult.hashKeyLow;
    Dagaz.AI.g_hashKeyHigh = hashResult.hashKeyHigh;

    Dagaz.AI.g_baseEval = 0;
    for (var i = 0; i < 256; i++) {
        var pieceType = (Dagaz.AI.g_board[i] & Dagaz.AI.TYPE_MASK) >> Dagaz.AI.STACK_SIZE;
        if (Dagaz.AI.g_board[i] & Dagaz.AI.colorWhite) {
            Dagaz.AI.g_baseEval += pieceSquareAdj[pieceType][i];
            Dagaz.AI.g_baseEval += materialTable[pieceType];
        } else if (Dagaz.AI.g_board[i] & Dagaz.AI.colorBlack) {
            Dagaz.AI.g_baseEval -= pieceSquareAdj[pieceType][flipTable[i]];
            Dagaz.AI.g_baseEval -= materialTable[pieceType];
        }
    }
    if (!Dagaz.AI.g_toMove) Dagaz.AI.g_baseEval = -Dagaz.AI.g_baseEval;
    Dagaz.AI.g_move50 = 0;

    return '';
}

function UndoHistory(move, step, baseEval, hashKeyLow, hashKeyHigh, move50) {
    this.move = move;
    this.step = step;
    this.baseEval = baseEval;
    this.hashKeyLow = hashKeyLow;
    this.hashKeyHigh = hashKeyHigh;
    this.move50 = move50;
}

function log(f, fv, t, tv, p, s) {
    var m = [s];
    if (_.indexOf(['c7', 'd6', 'f4', 'e5'], Dagaz.AI.FormatSquare(t)) < 0) return;
    var s = Dagaz.AI.FormatMove(m) + ': ' + Dagaz.AI.FormatSquare(t) + '[' + tv + '] ' + p + ' ';
    if (f) {
        s += Dagaz.AI.FormatSquare(f);
    }
    s += '[' + fv + ']';
//  console.log(s);
}

Dagaz.AI.MakeStep = function(move, step) {
    var me = Dagaz.AI.g_toMove >> Dagaz.AI.TYPE_SIZE;
    var flags = move & 0xFF000000;
    var to = (move >> 8) & 0xFF;
    var from = move & 0xFF;
    var target = (move >> 16) & 0xFF;

    var captured = target ? Dagaz.AI.g_board[target] : pieceEmpty;
    var piece = Dagaz.AI.g_board[from];

    g_moveUndoStack[Dagaz.AI.g_moveCount] = new UndoHistory(move, step, Dagaz.AI.g_baseEval, Dagaz.AI.g_hashKeyLow, Dagaz.AI.g_hashKeyHigh, Dagaz.AI.g_move50);
    Dagaz.AI.g_moveCount++;

    if (captured) {
        var capturedType = (captured & Dagaz.AI.TYPE_MASK) >> Dagaz.AI.STACK_SIZE;
        Dagaz.AI.g_baseEval += materialTable[capturedType];
        Dagaz.AI.g_baseEval += pieceSquareAdj[capturedType][me ? flipTable[target] : target];

        log(null, pieceEmpty, target, Dagaz.AI.g_board[target], '>1>', move);
        Dagaz.AI.g_board[target] = pieceEmpty;

        Dagaz.AI.g_hashKeyLow ^= Dagaz.AI.g_zobristLow[target][captured & Dagaz.AI.PIECE_MASK];
        Dagaz.AI.g_hashKeyHigh ^= Dagaz.AI.g_zobristHigh[target][captured & Dagaz.AI.PIECE_MASK];

        var ix = captured & STACK_MASK;
        var p = (ix > 0) ? popStack(ix) : null;
        if (p !== null) {
            var pType = (p & Dagaz.AI.TYPE_MASK) >> Dagaz.AI.STACK_SIZE;
            var enemy = me ? Dagaz.AI.colorBlack : Dagaz.AI.colorWhite;

            var v = materialTable[pType];
            v += pieceSquareAdj[pType][(p & Dagaz.AI.colorWhite) ? target : flipTable[target]];
            Dagaz.AI.g_baseEval -= (p & enemy) ? v : -v;

            if (!isEmpty(ix)) p |= ix;
            log(null, p, target, Dagaz.AI.g_board[target], '>2>', move);
            Dagaz.AI.g_board[target] = p;

            Dagaz.AI.g_hashKeyLow ^= Dagaz.AI.g_zobristLow[target][p & Dagaz.AI.PIECE_MASK];
            Dagaz.AI.g_hashKeyHigh ^= Dagaz.AI.g_zobristHigh[target][p & Dagaz.AI.PIECE_MASK];
        }
        Dagaz.AI.g_move50 = 0;
    }

    Dagaz.AI.g_hashKeyLow ^= Dagaz.AI.g_zobristLow[from][piece & Dagaz.AI.PIECE_MASK];
    Dagaz.AI.g_hashKeyHigh ^= Dagaz.AI.g_zobristHigh[from][piece & Dagaz.AI.PIECE_MASK];
    Dagaz.AI.g_hashKeyLow ^= Dagaz.AI.g_zobristLow[to][piece & Dagaz.AI.PIECE_MASK];
    Dagaz.AI.g_hashKeyHigh ^= Dagaz.AI.g_zobristHigh[to][piece & Dagaz.AI.PIECE_MASK];

    Dagaz.AI.g_baseEval -= pieceSquareAdj[(piece & Dagaz.AI.TYPE_MASK) >> Dagaz.AI.STACK_SIZE][me == 0 ? flipTable[from] : from];

    if (captured || (flags & moveflagPromotion)) {
        var newPiece = piece;
        if (flags & moveflagPromotion) {
            newPiece &= ~Dagaz.AI.TYPE_MASK;
            newPiece |= pieceKing;

            Dagaz.AI.g_baseEval -= materialTable[pieceMan];
            Dagaz.AI.g_baseEval += pieceSquareAdj[(newPiece & Dagaz.AI.TYPE_MASK) >> Dagaz.AI.STACK_SIZE][me == 0 ? flipTable[to] : to];
            Dagaz.AI.g_baseEval += materialTable[(newPiece & Dagaz.AI.TYPE_MASK) >> Dagaz.AI.STACK_SIZE];
        }

        var ix = piece & STACK_MASK;
        if (captured) {
            if (ix == 0) ix = getStack();
            if (ix > 0) {
                if (unshiftStack(ix, captured & (~STACK_MASK))) {
                    newPiece |= ix;
                }
            }
        }

        Dagaz.AI.g_hashKeyLow ^= Dagaz.AI.g_zobristLow[to][piece & Dagaz.AI.PIECE_MASK];
        Dagaz.AI.g_hashKeyHigh ^= Dagaz.AI.g_zobristHigh[to][piece & Dagaz.AI.PIECE_MASK];

        log(null, newPiece, to, Dagaz.AI.g_board[to], '>3>', move);
        Dagaz.AI.g_board[to] = newPiece;
        Dagaz.AI.g_hashKeyLow ^= Dagaz.AI.g_zobristLow[to][newPiece & Dagaz.AI.PIECE_MASK];
        Dagaz.AI.g_hashKeyHigh ^= Dagaz.AI.g_zobristHigh[to][newPiece & Dagaz.AI.PIECE_MASK];
    } else {
        log(from, Dagaz.AI.g_board[from], to, Dagaz.AI.g_board[to], '>4>', move);
        Dagaz.AI.g_board[to] = Dagaz.AI.g_board[from];
        Dagaz.AI.g_baseEval += pieceSquareAdj[(piece & Dagaz.AI.TYPE_MASK) >> Dagaz.AI.STACK_SIZE][me == 0 ? flipTable[to] : to];
    }
    log(null, pieceEmpty, from, Dagaz.AI.g_board[from], '>5>', move);
    Dagaz.AI.g_board[from] = pieceEmpty;

    Dagaz.AI.g_repMoveStack[Dagaz.AI.g_moveCount - 1] = Dagaz.AI.g_hashKeyLow;
    Dagaz.AI.g_move50++;

    return captured;
}

Dagaz.AI.UnmakeStep = function() {
    Dagaz.AI.g_moveCount--;
    var move = g_moveUndoStack[Dagaz.AI.g_moveCount].move;
    Dagaz.AI.g_baseEval = g_moveUndoStack[Dagaz.AI.g_moveCount].baseEval;
    Dagaz.AI.g_hashKeyLow = g_moveUndoStack[Dagaz.AI.g_moveCount].hashKeyLow;
    Dagaz.AI.g_hashKeyHigh = g_moveUndoStack[Dagaz.AI.g_moveCount].hashKeyHigh;
    Dagaz.AI.g_move50 = g_moveUndoStack[Dagaz.AI.g_moveCount].move50;

    var otherColor = Dagaz.AI.colorWhite - Dagaz.AI.g_toMove;

    var flags = move & 0xFF000000;
    var captured = null;
    var to = (move >> 8) & 0xFF;
    var from = move & 0xFF;
    var target = (move >> 16) & 0xFF;

    var piece = Dagaz.AI.g_board[to];
    var ix = piece & STACK_MASK;

    if (target && (ix > 0)) {
        captured = shiftStack(ix);
        if (isEmpty(ix)) {
            piece &= ~STACK_MASK;
        }
        var p = Dagaz.AI.g_board[target];
        if (p != pieceEmpty) {
            ix = p & STACK_MASK;
            if (ix == 0) ix = getStack();
            pushStack(ix, p & (~STACK_MASK));
            captured |= ix;
        }
        log(null, captured, target, Dagaz.AI.g_board[target], '<1<', move);
        Dagaz.AI.g_board[target] = captured;
    }

    if (captured || (flags & moveflagPromotion)) {
        if (flags & moveflagPromotion) {
            piece &= ~Dagaz.AI.TYPE_MASK;
            piece |= pieceMan;
        }
        log(null, piece, from, Dagaz.AI.g_board[from], '<2<', move);
        Dagaz.AI.g_board[from] = piece;
    } else {
        log(to, Dagaz.AI.g_board[to], from, Dagaz.AI.g_board[from], '<3<', move);
        Dagaz.AI.g_board[from] = Dagaz.AI.g_board[to];
    }

    log(null, pieceEmpty, to, Dagaz.AI.g_board[to], '<4<', move);
    Dagaz.AI.g_board[to] = pieceEmpty;

    return g_moveUndoStack[Dagaz.AI.g_moveCount].step;
}

Dagaz.AI.MakeMove = function(move) {
    for (var i = 0; i < move.length; i++) {
        if (Dagaz.AI.MakeStep(move[i], i) == pieceEmpty) break;
    }
    Dagaz.AI.g_toMove = Dagaz.AI.colorWhite - Dagaz.AI.g_toMove;
    Dagaz.AI.g_baseEval = -Dagaz.AI.g_baseEval;
    Dagaz.AI.g_hashKeyLow ^= Dagaz.AI.g_zobristBlackLow;
    Dagaz.AI.g_hashKeyHigh ^= Dagaz.AI.g_zobristBlackHigh;
    return true;
}

Dagaz.AI.UnmakeMove = function(move) {
    Dagaz.AI.g_toMove = Dagaz.AI.colorWhite - Dagaz.AI.g_toMove;
    Dagaz.AI.g_baseEval = -Dagaz.AI.g_baseEval;
    while (Dagaz.AI.UnmakeStep() > 0);
}

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

function isBad(move) {
  var captured = [];
  for (var i = 0; i < move.length; i++) {
       var pos = (move[i] >> 16) & 0xFF;
       if (_.indexOf(captured, pos) >= 0) return true;
       captured.push(pos);
  }
  return false;
}

function IsPrefix(a, b) {
  if (a.length >= b.length) return false;
  for (var i = 0; i < a.length; i++) {
       if (a[i] != b[i]) return false;
  }
  return true;
}

function CheckInvariant(moves) {
  var result = [];
  for (var i = 0; i < moves.length; i++) {
       var f = true;
       if (isBad(moves[i])) f = false;
       for (var j = 0; j < moves.length; j++) {
            if (!f) break;
            if ((i != j) && IsPrefix(moves[i], moves[j])) f = false;
       }
       if (f) {
           result.push(moves[i]);
       }
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
  moves = CheckInvariant(moves);
  if (moves.length == 0) {
      GenerateQuietMoves(moves);
  }
  return moves;
}

Dagaz.AI.GenerateCaptureMoves = function() {
  var moves = [];
  GenerateCaptureMoves(moves);
  moves = CheckInvariant(moves);
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
    var enemy = Dagaz.AI.g_toMove ? Dagaz.AI.colorBlack : Dagaz.AI.colorWhite;
    var captured = from + dir;
    if (!isMan) {
        while (Dagaz.AI.g_board[captured] == pieceEmpty) {
            captured += dir;
        }
    }
    if ((Dagaz.AI.g_board[captured] & enemy) == 0) return 0;
    var to = captured + dir;
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

function GenerateCaptureMovesFromTree(moves, from, isMan, stack, restricted) {
    var r = true;
    _.each([-17, -15, 15, 17], function(dir) {
        if (restricted && (restricted == dir)) return;
        var step = GenerateCaptureStep(from, dir, isMan);
        if (step == 0) return;
        var f = isMan;
        if (step & moveflagPromotion) f = false;
        var pos = (step >> 8) & 0xFF;
        stack.push(step);
        Dagaz.AI.MakeStep(step, 0);
        if (GenerateCaptureMovesFromTree(moves, pos, f, stack, -dir)) r = false;
        Dagaz.AI.UnmakeStep();
        stack.pop();
        if (!f) {
            pos += dir;
            while (Dagaz.AI.g_board[pos] == pieceEmpty) {
                step &= ~0xFF00;
                step |= pos << 8;
                stack.push(step);
                Dagaz.AI.MakeStep(step, 0);
                if (GenerateCaptureMovesFromTree(moves, pos, f, stack, -dir)) r = false;
                Dagaz.AI.UnmakeStep();
                stack.pop();
                pos += dir;
            }
        }
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
    var inc = Dagaz.AI.g_toMove ? -16 : 16;
    var piece = Dagaz.AI.g_board[from] & Dagaz.AI.TYPE_MASK;

    if (piece == pieceMan) {
        to = from + inc - 1; 
        if (Dagaz.AI.g_board[to] == 0) {
            steps = new Array();
            GenerateQuietStep(steps, from, to, true);
            moves.push(steps);
        }
        to = from + inc + 1; 
        if (Dagaz.AI.g_board[to] == 0) {
            steps = new Array();
            GenerateQuietStep(steps, from, to, true);
            moves.push(steps);
        }
    }

    if (piece == pieceKing) {
        to = from - 17;
        while (Dagaz.AI.g_board[to] == pieceEmpty) {
            steps = new Array();
            GenerateQuietStep(steps, from, to, false);
            moves.push(steps);
            to -= 17;
        }
        to = from - 15;
        while (Dagaz.AI.g_board[to] == pieceEmpty) {
            steps = new Array();
            GenerateQuietStep(steps, from, to, false);
            moves.push(steps);
            to -= 15;
        }
        to = from + 17;
        while (Dagaz.AI.g_board[to] == pieceEmpty) {
            steps = new Array();
            GenerateQuietStep(steps, from, to, false);
            moves.push(steps);
            to += 17;
        }
        to = from + 15;
        while (Dagaz.AI.g_board[to] == pieceEmpty) {
            steps = new Array();
            GenerateQuietStep(steps, from, to, false);
            moves.push(steps);
            to += 15;
        }
    }
}

})();
