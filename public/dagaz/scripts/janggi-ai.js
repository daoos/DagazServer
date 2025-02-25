"use strict";

(function() {

Dagaz.AI.MIN_TURN         = 8;

Dagaz.AI.PIECE_MASK       = 0xF;
Dagaz.AI.TYPE_MASK        = 0x7;
Dagaz.AI.PLAYERS_MASK     = 0x18;
Dagaz.AI.COUNTER_SIZE     = 4;
Dagaz.AI.TYPE_SIZE        = 3;
Dagaz.AI.STALMATED        = true;

Dagaz.AI.colorBlack       = 0x10;
Dagaz.AI.colorWhite       = 0x08;

var pieceEmpty            = 0x00;
var piecePawn             = 0x01;
var pieceAdvisor          = 0x02;
var pieceBishop           = 0x03;
var pieceKnight           = 0x04;
var pieceCannon           = 0x05;
var pieceRook             = 0x06;
var pieceKing             = 0x07;
var pieceNo               = 0x80;

var g_moveUndoStack = new Array();

// Evaulation variables
var g_mobUnit;

var materialTable = [0, 800, 800, 1500, 3350, 4000, 5500, 600000];

Dagaz.AI.pieceAdj = [
[   0,    0,    0,    0,    0,    0,    0,    0,    0, // pieceEmpty
    0,    0,    0,    0,    0,    0,    0,    0,    0, 
    0,    0,    0,    0,    0,    0,    0,    0,    0, 
    0,    0,    0,    0,    0,    0,    0,    0,    0, 
    0,    0,    0,    0,    0,    0,    0,    0,    0, 
    0,    0,    0,    0,    0,    0,    0,    0,    0, 
    0,    0,    0,    0,    0,    0,    0,    0,    0, 
    0,    0,    0,    0,    0,    0,    0,    0,    0, 
    0,    0,    0,    0,    0,    0,    0,    0,    0, 
    0,    0,    0,    0,    0,    0,    0,    0,    0
],
[  10,   20,   30,  100,  100,  100,   30,   20,   10, // piecePawn
   10,   40,   60,  200,  200,  200,   60,   40,   10, 
   20,   40,   50,  100,  100,  100,   50,   40,   20, 
   20,   30,   40,   50,   50,   50,   40,   30,   20, 
   10,   20,   30,   40,   40,   40,   30,   20,   10, 
    5,    5,    5,    5,    5,    5,    5,    5,    5, 
    3,    3,    3,    3,    3,    3,    3,    3,    3, 
    0,    0,    0,    0,    0,    0,    0,    0,    0, 
    0,    0,    0,    0,    0,    0,    0,    0,    0, 
    0,    0,    0,    0,    0,    0,    0,    0,    0
],
[   0,    0,    0,    0,    0,    0,    0,    0,    0, // pieceAdvisor
    0,    0,    0,    0,    0,    0,    0,    0,    0, 
    0,    0,    0,    0,    0,    0,    0,    0,    0, 
    0,    0,    0,    0,    0,    0,    0,    0,    0, 
    0,    0,    0,    0,    0,    0,    0,    0,    0, 
    0,    0,    0,    0,    0,    0,    0,    0,    0, 
    0,    0,    0,    0,    0,    0,    0,    0,    0, 
    0,    0,    0,   10,    0,   10,    0,    0,    0, 
    0,    0,    0,    0,   15,    0,    0,    0,    0, 
    0,    0,    0,   10,    0,   10,    0,    0,    0
],
[   5,    0,    0,    0,    0,    0,    0,    0,    5, // pieceBishop
    0,    0,    0,    0,    0,    0,    0,    0,    0,
    0,    0,    0,    0,    0,    0,    0,    0,    0,
    0,    0,   30,    0,    0,    0,   30,    0,    0,
    0,    0,   50,    0,   80,    0,   50,    0,    0,
    0,    0,    0,    0,    0,    0,    0,    0,    0,
    0,   10,    0,   20,    0,   20,    0,   10,    0,
    0,    0,    0,    0,    0,    0,    0,    0,    0,
    0,    0,    0,    0,    0,    0,    0,    0,    0,
    0,    0,    0,    0,    0,    0,    0,    0,    0 
],
[-200, -100,  -50,  -50,  -50,  -50,  -50, -100, -200, // pieceKnight
 -100,    0,    0,    0,    0,    0,    0,    0, -100,
  -50,    0,   60,   60,   60,   60,   60,    0,  -50,
  -50,    0,   30,   60,   60,   60,   30,    0,  -50,
  -50,    0,   30,   60,   60,   60,   30,    0,  -50,
  -50,    0,   30,   60,   60,   60,   30,    0,  -50,
  -50,    0,   30,   60,   60,   60,   30,    0,  -50,
  -50,    0,   30,   30,   30,   30,   30,    0,  -50,
 -100,    0,    0,    0,    0,    0,    0,    0,  -100,
 -200,  -50,  -25,  -25,  -25,  -25,  -25,  -50,  -200
],
[  50,   10,   50,    0,    0,    0,   50,   10,   50, // pieceCannon
   50,   20,  -20,    5,    0,    5,  -20,   20,   50,
    5,   25,  -10,   10,    5,   10,  -10,   25,    5,
   10,    5,   15,  -10,  -20,  -10,   15,    5,   10,
   15,    0,   25,   20,   40,   20,   25,    0,   15,
   20,    0,   10,   30,   50,   30,   10,    0,   20,
   10,    5,   30,   20,   25,   20,   30,    5,   10,
   10,   30,   20,    0,    0,    0,   20,   30,   10,
   15,   10,    5,  -10,  -10,  -10,    5,   10,   15,
   20,   20,   30,  -10,  -10,  -10,   30,   20,   20 
],
[ -60,  -30,  -10,   20,   20,   20,  -10,  -30,   -60, // pieceRook
   40,   70,   90,  120,  120,  120,   90,   70,    40,
  -60,  -30,  -10,   20,   20,   20,  -10,  -30,   -60,
  -60,  -30,  -10,   20,   20,   20,  -10,  -30,   -60,
  -60,  -30,  -10,   20,   20,   20,  -10,  -30,   -60,
  -60,  -30,  -10,   20,   20,   20,  -10,  -30,   -60,
  -60,  -30,  -10,   20,   20,   20,  -10,  -30,   -60,
  -60,  -30,  -10,   20,   20,   20,  -10,  -30,   -60,
  -60,  -30,  -10,   20,   20,   20,  -10,  -30,   -60,
  -60,  -30,  -10,   20,   20,   20,  -10,  -30,   -60
],
[   0,    0,    0,    0,    0,    0,    0,    0,    0, // pieceKing
    0,    0,    0,    0,    0,    0,    0,    0,    0, 
    0,    0,    0,    0,    0,    0,    0,    0,    0, 
    0,    0,    0,    0,    0,    0,    0,    0,    0, 
    0,    0,    0,    0,    0,    0,    0,    0,    0, 
    0,    0,    0,    0,    0,    0,    0,    0,    0, 
    0,    0,    0,    0,    0,    0,    0,    0,    0, 
    0,    0,    0,    5,   10,    5,    0,    0,    0, 
    0,    0,    0,   10,   10,   10,    0,    0,    0, 
    0,    0,    0,    5,   10,    5,    0,    0,    0
]];

var pieceSquareAdj = new Array(8);
var flipTable = new Array(256);

var g_seeValues    = [0, 1, 2, 2, 3, 4, 5, 900,
                      0, 1, 2, 2, 3, 4, 5, 900];

function FormatSquare(square) {
    var letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'];
    return letters[(square & 0xF) - 4] + (((Dagaz.Model.HEIGHT + 1) - (square >> 4)) + 1);
}

Dagaz.AI.FormatMove = function(move, color) {
    var result = FormatSquare(move & 0xFF) + FormatSquare((move >> 8) & 0xFF);
    return result;
}

function Mobility(color) {
    var result = 0;
    var from, to, pos, mob, pieceIdx;
    var enemy = color == Dagaz.AI.colorWhite ? Dagaz.AI.colorBlack : Dagaz.AI.colorWhite
    var mobUnit = color == Dagaz.AI.colorWhite ? g_mobUnit[0] : g_mobUnit[1];

    // Knight mobility
    mob = -3;
    pieceIdx = (color | pieceKnight) << Dagaz.AI.COUNTER_SIZE;
    from = Dagaz.AI.g_pieceList[pieceIdx++];
    while (from != 0) {
        pos = from - 16;
        if (Dagaz.AI.g_board[pos] == 0) {
            to = pos - 15; mob += mobUnit[Dagaz.AI.g_board[to]];
            to = pos - 17; mob += mobUnit[Dagaz.AI.g_board[to]];
        }
        pos = from + 16;
        if (Dagaz.AI.g_board[pos] == 0) {
            to = pos + 15; mob += mobUnit[Dagaz.AI.g_board[to]];
            to = pos + 17; mob += mobUnit[Dagaz.AI.g_board[to]];
        }
        pos = from - 1;
        if (Dagaz.AI.g_board[pos] == 0) {
            to = pos - 17; mob += mobUnit[Dagaz.AI.g_board[to]];
            to = pos + 15; mob += mobUnit[Dagaz.AI.g_board[to]];
        }
        pos = from + 1;
        if (Dagaz.AI.g_board[pos] == 0) {
            to = pos - 15; mob += mobUnit[Dagaz.AI.g_board[to]];
            to = pos + 17; mob += mobUnit[Dagaz.AI.g_board[to]];
        }
        from = Dagaz.AI.g_pieceList[pieceIdx++];
    }
    result += 65 * mob;

    // Rook mobility
    mob = -4;
    pieceIdx = (color | pieceRook) << Dagaz.AI.COUNTER_SIZE;
    from = Dagaz.AI.g_pieceList[pieceIdx++];
    while (from != 0) {
        to = from - 1;  while (Dagaz.AI.g_board[to] == 0) { to--; mob++;}  if (Dagaz.AI.g_board[to] & enemy) mob++;
        to = from + 1;  while (Dagaz.AI.g_board[to] == 0) { to++; mob++; } if (Dagaz.AI.g_board[to] & enemy) mob++;
        to = from + 16; while (Dagaz.AI.g_board[to] == 0) { to += 16; mob++; } if (Dagaz.AI.g_board[to] & enemy) mob++;
        to = from - 16; while (Dagaz.AI.g_board[to] == 0) { to -= 16; mob++; } if (Dagaz.AI.g_board[to] & enemy) mob++;
        from = Dagaz.AI.g_pieceList[pieceIdx++];
    }
    result += 25 * mob;

    // Cannon mobility
    mob = -4;
    pieceIdx = (color | pieceCannon) << Dagaz.AI.COUNTER_SIZE;
    from = Dagaz.AI.g_pieceList[pieceIdx++];
    while (from != 0) {
            to = from - 1;  while (Dagaz.AI.g_board[to] == 0) { to--; }  
            if ((Dagaz.AI.g_board[to] & Dagaz.AI.PLAYERS_MASK) & ((Dagaz.AI.g_board[to] & Dagaz.AI.TYPE_MASK) != pieceCannon)) {
                to--; while (Dagaz.AI.g_board[to] == 0) { to--; mob++; }
                if ((Dagaz.AI.g_board[to] & enemy) && ((Dagaz.AI.g_board[to] & Dagaz.AI.TYPE_MASK) != pieceCannon)) mob++;
            }
            to = from + 1;  while (Dagaz.AI.g_board[to] == 0) { to++; }  
            if ((Dagaz.AI.g_board[to] & Dagaz.AI.PLAYERS_MASK) & ((Dagaz.AI.g_board[to] & Dagaz.AI.TYPE_MASK) != pieceCannon)) {
                to++; while (Dagaz.AI.g_board[to] == 0) { to++; mob++; }
                if ((Dagaz.AI.g_board[to] & enemy) && ((Dagaz.AI.g_board[to] & Dagaz.AI.TYPE_MASK) != pieceCannon)) mob++;
            }
            to = from - 16;  while (Dagaz.AI.g_board[to] == 0) { to -= 16; }  
            if ((Dagaz.AI.g_board[to] & Dagaz.AI.PLAYERS_MASK) & ((Dagaz.AI.g_board[to] & Dagaz.AI.TYPE_MASK) != pieceCannon)) {
                to -= 16; while (Dagaz.AI.g_board[to] == 0) { to -= 16; mob++; }
                if ((Dagaz.AI.g_board[to] & enemy) && ((Dagaz.AI.g_board[to] & Dagaz.AI.TYPE_MASK) != pieceCannon)) mob++;
            }
            to = from + 16;  while (Dagaz.AI.g_board[to] == 0) { to += 16; }  
            if ((Dagaz.AI.g_board[to] & Dagaz.AI.PLAYERS_MASK) & ((Dagaz.AI.g_board[to] & Dagaz.AI.TYPE_MASK) != pieceCannon)) {
                to += 16; while (Dagaz.AI.g_board[to] == 0) { to += 16; mob++; }
                if ((Dagaz.AI.g_board[to] & enemy) && ((Dagaz.AI.g_board[to] & Dagaz.AI.TYPE_MASK) != pieceCannon)) mob++;
            }
        from = Dagaz.AI.g_pieceList[pieceIdx++];
    }
    result += 25 * mob;

    return result;
}

Dagaz.AI.Evaluate = function() {
    var curEval = Dagaz.AI.g_baseEval;
    var evalAdjust = 0;

    // Black bishop pair
    if (Dagaz.AI.g_pieceCount[pieceBishop] >= 2)
        evalAdjust -= 500;
    // White bishop pair
    if (Dagaz.AI.g_pieceCount[pieceBishop | Dagaz.AI.colorWhite] >= 2)
        evalAdjust += 500;

    var mobility = Mobility(Dagaz.AI.colorWhite) - Mobility(0);

    if (Dagaz.AI.g_toMove == 0) {
        // Black
        curEval -= mobility;
        curEval -= evalAdjust;
    } else {
        curEval += mobility;
        curEval += evalAdjust;
    }
    
    return curEval;
}

Dagaz.AI.ScoreMove = function(move){
    var moveTo = (move >> 8) & 0xFF;
    var captured = Dagaz.AI.g_board[moveTo] & Dagaz.AI.TYPE_MASK;
    var piece = Dagaz.AI.g_board[move & 0xFF];
    var score;
    if (captured != pieceEmpty) {
        var pieceType = piece & Dagaz.AI.TYPE_MASK;
        score = (captured << 5) - pieceType;
    } else {
        score = Dagaz.AI.historyTable[piece & Dagaz.AI.PIECE_MASK][moveTo];
    }
    return score;
}

Dagaz.AI.IsHashMoveValid = function(hashMove) {
    var from = hashMove & 0xFF;
    var to = (hashMove >> 8) & 0xFF;
    var ourPiece = Dagaz.AI.g_board[from];
    var pieceType = ourPiece & Dagaz.AI.TYPE_MASK;
    if (pieceType < piecePawn || pieceType > pieceKing) return false;
    // Can't move a piece we don't control
    if (Dagaz.AI.g_toMove != (ourPiece & Dagaz.AI.colorWhite)) return false;
    // Can't move to a square that has something of the same color
    if (Dagaz.AI.g_board[to] != 0 && (Dagaz.AI.g_toMove == (Dagaz.AI.g_board[to] & Dagaz.AI.colorWhite))) return false;
    // This validates that this piece type can actually make the attack
    return IsSquareAttackableFrom(to, from);
}

Dagaz.AI.isNoZugzwang = function() {
    return true;
}

function MakeSquare(row, column) {
    return ((row + 2) << 4) | (column + 4);
}

function MakeTable(table) {
    var result = new Array(256);
    for (var i = 0; i < 256; i++) {
        result[i] = 0;
    }
    for (var row = 0; row < Dagaz.Model.HEIGHT; row++) {
        for (var col = 0; col < Dagaz.Model.WIDTH; col++) {
            result[MakeSquare(row, col)] = table[row * Dagaz.Model.WIDTH + col];
        }
    }
    return result;
}

var ResetGame = Dagaz.AI.ResetGame;

Dagaz.AI.ResetGame = function() {

  ResetGame();

  for (var row = 0; row < Dagaz.Model.HEIGHT; row++) {
       for (var col = 0; col < Dagaz.Model.WIDTH; col++) {
            var square = MakeSquare(row, col);
            flipTable[square] = MakeSquare((Dagaz.Model.HEIGHT - 1) - row, col);
       }
  }

  pieceSquareAdj[pieceEmpty]   = MakeTable(Dagaz.AI.pieceAdj[pieceEmpty]);
  pieceSquareAdj[piecePawn]    = MakeTable(Dagaz.AI.pieceAdj[piecePawn]);
  pieceSquareAdj[pieceKnight]  = MakeTable(Dagaz.AI.pieceAdj[pieceKnight]);
  pieceSquareAdj[pieceBishop]  = MakeTable(Dagaz.AI.pieceAdj[pieceBishop]);
  pieceSquareAdj[pieceRook]    = MakeTable(Dagaz.AI.pieceAdj[pieceRook]);
  pieceSquareAdj[pieceAdvisor] = MakeTable(Dagaz.AI.pieceAdj[pieceAdvisor]);
  pieceSquareAdj[pieceCannon]  = MakeTable(Dagaz.AI.pieceAdj[pieceCannon]);
  pieceSquareAdj[pieceKing]    = MakeTable(Dagaz.AI.pieceAdj[pieceKing]);

  InitializeEval();
}

function InitializeEval() {
    g_mobUnit = new Array(2);
    for (var i = 0; i < 2; i++) {
        g_mobUnit[i] = new Array();
        var enemy = i == 0 ? Dagaz.AI.colorBlack : Dagaz.AI.colorWhite;
        var friend = i == 0 ? Dagaz.AI.colorWhite : Dagaz.AI.colorBlack;
        g_mobUnit[i][0] = 1;
        g_mobUnit[i][pieceNo] = 0;
        g_mobUnit[i][enemy  | piecePawn]    = 1;
        g_mobUnit[i][enemy  | pieceKnight]  = 2;
        g_mobUnit[i][enemy  | pieceBishop]  = 2;
        g_mobUnit[i][enemy  | pieceRook]    = 5;
        g_mobUnit[i][enemy  | pieceAdvisor] = 1;
        g_mobUnit[i][enemy  | pieceCannon]  = 4;
        g_mobUnit[i][enemy  | pieceKing]    = 6;
        g_mobUnit[i][friend | piecePawn]    = 0;
        g_mobUnit[i][friend | pieceKnight]  = 0;
        g_mobUnit[i][friend | pieceBishop]  = 0;
        g_mobUnit[i][friend | pieceRook]    = 0;
        g_mobUnit[i][friend | pieceAdvisor] = 0;
        g_mobUnit[i][friend | pieceCannon]  = 0;
        g_mobUnit[i][friend | pieceKing]    = 0;
    }
}

Dagaz.AI.InitializeFromFen = function(fen) {
    var chunks = fen.split(' ');
    
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
        }
        else {
            if (c >= '0' && c <= '9') {
                for (var j = 0; j < parseInt(c); j++) {
                    Dagaz.AI.g_board[MakeSquare(row, col)] = 0;
                    col++;
                }
            }
            else {
                var isBlack = c >= 'a' && c <= 'z';
                var piece = isBlack ? Dagaz.AI.colorBlack : Dagaz.AI.colorWhite;
                if (!isBlack) 
                    c = pieces.toLowerCase().charAt(i);
                switch (c) {
                    case 'p':
                        piece |= piecePawn;
                        break;
                    case 'n':
                        piece |= pieceKnight;
                        break;
                    case 'b':
                        piece |= pieceBishop;
                        break;
                    case 'r':
                        piece |= pieceRook;
                        break;
                    case 'a':
                        piece |= pieceAdvisor;
                        break;
                    case 'c':
                        piece |= pieceCannon;
                        break;
                    case 'k':
                        piece |= pieceKing;
                        break;
                }
                
                if (piece & Dagaz.AI.TYPE_MASK) {
                    Dagaz.AI.g_board[MakeSquare(row, col)] = piece;
                }
                col++;
            }
        }
    }
    
    Dagaz.AI.InitializePieceList();
    
    Dagaz.AI.g_toMove = chunks[1].charAt(0) == 'w' ? Dagaz.AI.colorWhite : 0;
    var them = Dagaz.AI.colorWhite - Dagaz.AI.g_toMove;
    
    var hashResult = Dagaz.AI.SetHash();
    Dagaz.AI.g_hashKeyLow = hashResult.hashKeyLow;
    Dagaz.AI.g_hashKeyHigh = hashResult.hashKeyHigh;

    Dagaz.AI.g_baseEval = 0;
    for (var i = 0; i < 256; i++) {
        if (Dagaz.AI.g_board[i] & Dagaz.AI.colorWhite) {
            Dagaz.AI.g_baseEval += pieceSquareAdj[Dagaz.AI.g_board[i] & Dagaz.AI.TYPE_MASK][i];
            Dagaz.AI.g_baseEval += materialTable[Dagaz.AI.g_board[i] & Dagaz.AI.TYPE_MASK];
        } else if (Dagaz.AI.g_board[i] & Dagaz.AI.colorBlack) {
            Dagaz.AI.g_baseEval -= pieceSquareAdj[Dagaz.AI.g_board[i] & Dagaz.AI.TYPE_MASK][flipTable[i]];
            Dagaz.AI.g_baseEval -= materialTable[Dagaz.AI.g_board[i] & Dagaz.AI.TYPE_MASK];
        }
    }
    if (!Dagaz.AI.g_toMove) Dagaz.AI.g_baseEval = -Dagaz.AI.g_baseEval;

    Dagaz.AI.g_move50 = 0;
    var kingPos = Dagaz.AI.g_pieceList[(Dagaz.AI.g_toMove | pieceKing) << Dagaz.AI.COUNTER_SIZE];
    Dagaz.AI.g_inCheck = false;
    if (kingPos != 0) {
        Dagaz.AI.g_inCheck = IsSquareAttackable(kingPos, them);
    }

    // Check for king capture (invalid FEN)
/*  kingPos = Dagaz.AI.g_pieceList[(them | pieceKing) << Dagaz.AI.COUNTER_SIZE]
    if ((kingPos != 0) && IsSquareAttackable(kingPos, Dagaz.AI.g_toMove)) {
        return 'Invalid FEN: Can capture king';
    }*/

    // Checkmate/stalemate
    if (GenerateValidMoves().length == 0) {
        return Dagaz.AI.g_inCheck ? 'Checkmate' : 'Stalemate';
    } 

    return '';
}

function UndoHistory(inCheck, baseEval, hashKeyLow, hashKeyHigh, move50, captured) {
    this.inCheck = inCheck;
    this.baseEval = baseEval;
    this.hashKeyLow = hashKeyLow;
    this.hashKeyHigh = hashKeyHigh;
    this.move50 = move50;
    this.captured = captured;
}

Dagaz.AI.MakeMove = function(move) {
    var me = Dagaz.AI.g_toMove >> Dagaz.AI.TYPE_SIZE;
    var otherColor = Dagaz.AI.colorWhite - Dagaz.AI.g_toMove; 
    
    var to = (move >> 8) & 0xFF;
    var from = move & 0xFF;
    var captured = Dagaz.AI.g_board[to];
    var piece = Dagaz.AI.g_board[from];

    g_moveUndoStack[Dagaz.AI.g_moveCount] = new UndoHistory(Dagaz.AI.g_inCheck, Dagaz.AI.g_baseEval, Dagaz.AI.g_hashKeyLow, Dagaz.AI.g_hashKeyHigh, Dagaz.AI.g_move50, captured);
    Dagaz.AI.g_moveCount++;

    if (captured) {
        // Remove our piece from the piece list
        var capturedType = captured & Dagaz.AI.PIECE_MASK;
        Dagaz.AI.g_pieceCount[capturedType]--;
        var lastPieceSquare = Dagaz.AI.g_pieceList[(capturedType << Dagaz.AI.COUNTER_SIZE) | Dagaz.AI.g_pieceCount[capturedType]];
        Dagaz.AI.g_pieceIndex[lastPieceSquare] = Dagaz.AI.g_pieceIndex[to];
        Dagaz.AI.g_pieceList[(capturedType << Dagaz.AI.COUNTER_SIZE) | Dagaz.AI.g_pieceIndex[lastPieceSquare]] = lastPieceSquare;
        Dagaz.AI.g_pieceList[(capturedType << Dagaz.AI.COUNTER_SIZE) | Dagaz.AI.g_pieceCount[capturedType]] = 0;

        Dagaz.AI.g_baseEval += materialTable[captured & Dagaz.AI.TYPE_MASK];
        Dagaz.AI.g_baseEval += pieceSquareAdj[captured & Dagaz.AI.TYPE_MASK][me ? flipTable[to] : to];

        Dagaz.AI.g_hashKeyLow ^= Dagaz.AI.g_zobristLow[to][capturedType];
        Dagaz.AI.g_hashKeyHigh ^= Dagaz.AI.g_zobristHigh[to][capturedType];
        Dagaz.AI.g_move50 = 0;
    }

    Dagaz.AI.g_hashKeyLow ^= Dagaz.AI.g_zobristLow[from][piece & Dagaz.AI.PIECE_MASK];
    Dagaz.AI.g_hashKeyHigh ^= Dagaz.AI.g_zobristHigh[from][piece & Dagaz.AI.PIECE_MASK];
    Dagaz.AI.g_hashKeyLow ^= Dagaz.AI.g_zobristLow[to][piece & Dagaz.AI.PIECE_MASK];
    Dagaz.AI.g_hashKeyHigh ^= Dagaz.AI.g_zobristHigh[to][piece & Dagaz.AI.PIECE_MASK];
    Dagaz.AI.g_hashKeyLow ^= Dagaz.AI.g_zobristBlackLow;
    Dagaz.AI.g_hashKeyHigh ^= Dagaz.AI.g_zobristBlackHigh;
    
    Dagaz.AI.g_baseEval -= pieceSquareAdj[piece & Dagaz.AI.TYPE_MASK][me == 0 ? flipTable[from] : from];
    
    // Move our piece in the piece list
    Dagaz.AI.g_pieceIndex[to] = Dagaz.AI.g_pieceIndex[from];
    Dagaz.AI.g_pieceList[((piece & Dagaz.AI.PIECE_MASK) << Dagaz.AI.COUNTER_SIZE) | Dagaz.AI.g_pieceIndex[to]] = to;

    Dagaz.AI.g_board[to] = Dagaz.AI.g_board[from];
    Dagaz.AI.g_baseEval += pieceSquareAdj[piece & Dagaz.AI.TYPE_MASK][me == 0 ? flipTable[to] : to];
    Dagaz.AI.g_board[from] = pieceEmpty;

    Dagaz.AI.g_toMove = otherColor;
    Dagaz.AI.g_baseEval = -Dagaz.AI.g_baseEval;
    
    var kingPos = Dagaz.AI.g_pieceList[(pieceKing | (Dagaz.AI.colorWhite - Dagaz.AI.g_toMove)) << Dagaz.AI.COUNTER_SIZE];
    if ((kingPos != 0) && IsSquareAttackable(kingPos, otherColor)) {
        Dagaz.AI.UnmakeMove(move);
        return false;
    }
    
    Dagaz.AI.g_inCheck = false;
    
/*  var theirKingPos = Dagaz.AI.g_pieceList[(pieceKing | Dagaz.AI.g_toMove) << Dagaz.AI.COUNTER_SIZE];
    if (theirKingPos != 0) {
        Dagaz.AI.g_inCheck = IsSquareAttackable(theirKingPos, Dagaz.AI.g_toMove);
    }*/

    Dagaz.AI.g_repMoveStack[Dagaz.AI.g_moveCount - 1] = Dagaz.AI.g_hashKeyLow;
    Dagaz.AI.g_move50++;

    return true;
}

Dagaz.AI.UnmakeMove = function(move) {
    Dagaz.AI.g_toMove = Dagaz.AI.colorWhite - Dagaz.AI.g_toMove;
    Dagaz.AI.g_baseEval = -Dagaz.AI.g_baseEval;
    
    Dagaz.AI.g_moveCount--;
    Dagaz.AI.g_inCheck = g_moveUndoStack[Dagaz.AI.g_moveCount].inCheck;
    Dagaz.AI.g_baseEval = g_moveUndoStack[Dagaz.AI.g_moveCount].baseEval;
    Dagaz.AI.g_hashKeyLow = g_moveUndoStack[Dagaz.AI.g_moveCount].hashKeyLow;
    Dagaz.AI.g_hashKeyHigh = g_moveUndoStack[Dagaz.AI.g_moveCount].hashKeyHigh;
    Dagaz.AI.g_move50 = g_moveUndoStack[Dagaz.AI.g_moveCount].move50;
    
    var otherColor = Dagaz.AI.colorWhite - Dagaz.AI.g_toMove;
    var me = Dagaz.AI.g_toMove >> Dagaz.AI.TYPE_SIZE;
    var them = otherColor >> Dagaz.AI.TYPE_SIZE;
    
    var captured = g_moveUndoStack[Dagaz.AI.g_moveCount].captured;
    var to = (move >> 8) & 0xFF;
    var from = move & 0xFF;
    
    var piece = Dagaz.AI.g_board[to];
    Dagaz.AI.g_board[from] = Dagaz.AI.g_board[to];
    Dagaz.AI.g_board[to] = captured;

    // Move our piece in the piece list
    Dagaz.AI.g_pieceIndex[from] = Dagaz.AI.g_pieceIndex[to];
    Dagaz.AI.g_pieceList[((piece & Dagaz.AI.PIECE_MASK) << Dagaz.AI.COUNTER_SIZE) | Dagaz.AI.g_pieceIndex[from]] = from;

    if (captured) {
        // Restore our piece to the piece list
        var captureType = captured & Dagaz.AI.PIECE_MASK;
        Dagaz.AI.g_pieceIndex[to] = Dagaz.AI.g_pieceCount[captureType];
        Dagaz.AI.g_pieceList[(captureType << Dagaz.AI.COUNTER_SIZE) | Dagaz.AI.g_pieceCount[captureType]] = to;
        Dagaz.AI.g_pieceCount[captureType]++;
    }
}

function IsSquareAttackableFrom(target, from) {
    var to, pos, piece, pieceType, adj;

    piece = Dagaz.AI.g_board[from];
    pieceType = piece & Dagaz.AI.TYPE_MASK;

    if (pieceType == pieceEmpty) return false;
    var color = (piece & Dagaz.AI.colorWhite);
    var enemy = color ? Dagaz.AI.colorBlack : Dagaz.AI.colorWhite;
    var inc = color ? -16 : 16;
    var me = color >> Dagaz.AI.TYPE_SIZE;

    if (pieceType == piecePawn) {
        adj = pieceSquareAdj[piecePawn][me == 0 ? flipTable[from] : from];
        if (+from + inc == target) return true;
        if (adj != 0) {
            if (+from + 1 == target) return true;
            if (+from - 1 == target) return true;
        }
    }
    if (pieceType == pieceAdvisor) {
        to = from + 15; adj = pieceSquareAdj[pieceAdvisor][me == 0 ? flipTable[to] : to];
        if (adj != 0) {
            if (to == target) return true;
        }
        to = from + 17; adj = pieceSquareAdj[pieceAdvisor][me == 0 ? flipTable[to] : to];
        if (adj != 0) {
            if (to == target) return true;
        }
        to = from - 15; adj = pieceSquareAdj[pieceAdvisor][me == 0 ? flipTable[to] : to];
        if (adj != 0) {
            if (to == target) return true;
        }
        to = from - 17; adj = pieceSquareAdj[pieceAdvisor][me == 0 ? flipTable[to] : to];
        if (adj != 0) {
            if (to == target) return true;
        }
    }
    if (pieceType == pieceBishop) {
            pos = from - 16;
            if (Dagaz.AI.g_board[pos] == pieceEmpty) {
                to = pos - 15;
                if (Dagaz.AI.g_board[to] == pieceEmpty) {
                    to -= 15;
                    if (to == target) return true;
                }
                to = pos - 17;
                if (Dagaz.AI.g_board[to] == pieceEmpty) {
                    to -= 17;
                    if (to == target) return true;
                }
            }
            pos = from + 16;
            if (Dagaz.AI.g_board[pos] == pieceEmpty) {
                to = pos + 15;
                if (Dagaz.AI.g_board[to] == pieceEmpty) {
                    to += 15;
                    if (to == target) return true;
                }
                to = pos + 17;
                if (Dagaz.AI.g_board[to] == pieceEmpty) {
                    to += 17;
                    if (to == target) return true;
                }
            }
            pos = from - 1;
            if (Dagaz.AI.g_board[pos] == pieceEmpty) {
                to = pos + 15;
                if (Dagaz.AI.g_board[to] == pieceEmpty) {
                    to += 15;
                    if (to == target) return true;
                }
                to = pos - 17;
                if (Dagaz.AI.g_board[to] == pieceEmpty) {
                    to -= 17;
                    if (to == target) return true;
                }
            }
            pos = from + 1;
            if (Dagaz.AI.g_board[pos] == pieceEmpty) {
                to = pos - 15;
                if (Dagaz.AI.g_board[to] == pieceEmpty) {
                    to -= 15;
                    if (to == target) return true;
                }
                to = pos + 17;
                if (Dagaz.AI.g_board[to] == pieceEmpty) {
                    to += 17;
                    if (to == target) return true;
                }
            }
    }
    if (pieceType == pieceKnight) {
        pos = from - 16;
        if (Dagaz.AI.g_board[pos] == 0) {
            to = pos - 15; if (to == target) return true;
            to = pos - 17; if (to == target) return true;
        }
        pos = from + 16;
        if (Dagaz.AI.g_board[pos] == 0) {
            to = pos + 15; if (to == target) return true;
            to = pos + 17; if (to == target) return true;
        }
        pos = from - 1;
        if (Dagaz.AI.g_board[pos] == 0) {
            to = pos + 15; if (to == target) return true;
            to = pos - 17; if (to == target) return true;
        }
        pos = from + 1;
        if (Dagaz.AI.g_board[pos] == 0) {
            to = pos - 15; if (to == target) return true;
            to = pos + 17; if (to == target) return true;
        }
    }
    if (((target & 0xF) != (from & 0xF)) && ((target & 0xF0) != (from & 0xF0))) return false;
    if (pieceType == pieceRook) {
       to = from; do { to++; if (to == target) return true; } while (Dagaz.AI.g_board[to] == 0);
       to = from; do { to--; if (to == target) return true; } while (Dagaz.AI.g_board[to] == 0);
       to = from; do { to += 16; if (to == target) return true; } while (Dagaz.AI.g_board[to] == 0);
       to = from; do { to -= 16; if (to == target) return true; } while (Dagaz.AI.g_board[to] == 0);
    }
    if (pieceType == pieceCannon) {
            to = from + 1; while (Dagaz.AI.g_board[to] == 0) { if (to == target) return false; to++; }
            if ((Dagaz.AI.g_board[to] & Dagaz.AI.PLAYERS_MASK) && ((Dagaz.AI.g_board[to] & Dagaz.AI.TYPE_MASK) != pieceCannon)) {
                to++; while (Dagaz.AI.g_board[to] == 0) { if (to == target) return false; to++; }
                if (Dagaz.AI.g_board[to] & Dagaz.AI.TYPE_MASK == pieceCannon) return false;
                if (to == target) return true;
            }
            to = from - 1; while (Dagaz.AI.g_board[to] == 0) { if (to == target) return false; to--; }
            if ((Dagaz.AI.g_board[to] & Dagaz.AI.PLAYERS_MASK) && ((Dagaz.AI.g_board[to] & Dagaz.AI.TYPE_MASK) != pieceCannon)) {
                to--; while (Dagaz.AI.g_board[to] == 0) { if (to == target) return false; to--; }
                if (Dagaz.AI.g_board[to] & Dagaz.AI.TYPE_MASK == pieceCannon) return false;
                if (to == target) return true;
            }
            to = from - 16; while (Dagaz.AI.g_board[to] == 0) { if (to == target) return false; to -= 16; }
            if ((Dagaz.AI.g_board[to] & Dagaz.AI.PLAYERS_MASK) && ((Dagaz.AI.g_board[to] & Dagaz.AI.TYPE_MASK) != pieceCannon)) {
                to -= 16; while (Dagaz.AI.g_board[to] == 0) { if (to == target) return false; to -= 16; }
                if (Dagaz.AI.g_board[to] & Dagaz.AI.TYPE_MASK == pieceCannon) return false;
                if (to == target) return true;
            }
            to = from + 16; while (Dagaz.AI.g_board[to] == 0) { if (to == target) return false; to += 16; }
            if ((Dagaz.AI.g_board[to] & Dagaz.AI.PLAYERS_MASK) && ((Dagaz.AI.g_board[to] & Dagaz.AI.TYPE_MASK) != pieceCannon)) {
                to += 16; while (Dagaz.AI.g_board[to] == 0) { if (to == target) return false; to += 16; }
                if (Dagaz.AI.g_board[to] & Dagaz.AI.TYPE_MASK == pieceCannon) return false;
                if (to == target) return true;
            }
    }
    if (pieceType == pieceKing) {
       to = from + 1; adj = pieceSquareAdj[pieceKing][me == 0 ? flipTable[to] : to];
       if (adj != 0) {
           if (to == target) return true;
       }
       to = from - 1; adj = pieceSquareAdj[pieceKing][me == 0 ? flipTable[to] : to];
       if (adj != 0) {
           if (to == target) return true;
       }
       to = from + 16; adj = pieceSquareAdj[pieceKing][me == 0 ? flipTable[to] : to];
       if (adj != 0) {
           if (to == target) return true;
       }
       to = from - 16; adj = pieceSquareAdj[pieceKing][me == 0 ? flipTable[to] : to];
       if (adj != 0) {
           if (to == target) return true;
       }
/*     to = from + inc; while (Dagaz.AI.g_board[to] == 0) { to += inc; }
       if (to != target) return false;
       if ((Dagaz.AI.g_board[to] & Dagaz.AI.TYPE_MASK) == pieceKing) return true;*/
    }
    return false;
}

function IsSquareAttackable(target, color) {
    for (var i = piecePawn; i <= pieceKing; i++) {
        var index = (color | i) << Dagaz.AI.COUNTER_SIZE;
        var square = Dagaz.AI.g_pieceList[index];
        while (square != 0) {
            if (IsSquareAttackableFrom(target, square)) return true;
            square = Dagaz.AI.g_pieceList[++index];
        }
    }
    return false;
}

function GenerateMove(from, to) {
    return from | (to << 8);
}

function GenerateValidMoves() {
    var moveList = new Array();
    var allMoves = new Array();
    Dagaz.AI.GenerateCaptureMoves(allMoves, null);
    Dagaz.AI.GenerateAllMoves(allMoves);
    for (var i = allMoves.length - 1; i >= 0; i--) {
        if (Dagaz.AI.MakeMove(allMoves[i])) {
            moveList[moveList.length] = allMoves[i];
            Dagaz.AI.UnmakeMove(allMoves[i]);
//          console.log('*** ' + Dagaz.AI.FormatMove(allMoves[i]) + ' (' + allMoves[i] + ')');
        }
    }
    return moveList;
}

Dagaz.AI.GenerateAllMoves = function(moveStack) {
    var adj, from, to, pos, piece, pieceIdx;
    var me = Dagaz.AI.g_toMove >> Dagaz.AI.TYPE_SIZE;
    var inc = (Dagaz.AI.g_toMove == Dagaz.AI.colorWhite) ? -16 : 16;

    // Pawn quiet moves
    pieceIdx = (Dagaz.AI.g_toMove | piecePawn) << Dagaz.AI.COUNTER_SIZE;
    from = Dagaz.AI.g_pieceList[pieceIdx++];
    while (from != 0) {
        to = from + inc; if (Dagaz.AI.g_board[to] == 0) {moveStack[moveStack.length] = GenerateMove(from, to);}
        adj = pieceSquareAdj[piecePawn][me == 0 ? flipTable[from] : from];
        if (adj != 0) {
            to = from - 1; if (Dagaz.AI.g_board[to] == 0) {moveStack[moveStack.length] = GenerateMove(from, to);}
            to = from + 1; if (Dagaz.AI.g_board[to] == 0) {moveStack[moveStack.length] = GenerateMove(from, to);}
        }
	from = Dagaz.AI.g_pieceList[pieceIdx++];
    }

    // Advisor quiet moves
    pieceIdx = (Dagaz.AI.g_toMove | pieceAdvisor) << Dagaz.AI.COUNTER_SIZE;
    from = Dagaz.AI.g_pieceList[pieceIdx++];
    while (from != 0) {
        to = from - 15; adj = pieceSquareAdj[pieceAdvisor][me == 0 ? flipTable[to] : to];
        if (adj != 0) {
            if (Dagaz.AI.g_board[to] == 0) {moveStack[moveStack.length] = GenerateMove(from, to);}
        }
        to = from - 17; adj = pieceSquareAdj[pieceAdvisor][me == 0 ? flipTable[to] : to];
        if (adj != 0) {
            if (Dagaz.AI.g_board[to] == 0) {moveStack[moveStack.length] = GenerateMove(from, to);}
        }
        to = from + 15; adj = pieceSquareAdj[pieceAdvisor][me == 0 ? flipTable[to] : to];
        if (adj != 0) {
            if (Dagaz.AI.g_board[to] == 0) {moveStack[moveStack.length] = GenerateMove(from, to);}
        }
        to = from + 17; adj = pieceSquareAdj[pieceAdvisor][me == 0 ? flipTable[to] : to];
        if (adj != 0) {
            if (Dagaz.AI.g_board[to] == 0) {moveStack[moveStack.length] = GenerateMove(from, to);}
        }
	from = Dagaz.AI.g_pieceList[pieceIdx++];
    }

    // Bishop quiet moves
    pieceIdx = (Dagaz.AI.g_toMove | pieceBishop) << Dagaz.AI.COUNTER_SIZE;
    from = Dagaz.AI.g_pieceList[pieceIdx++];
    while (from != 0) {
            pos = from - 16;
            if (Dagaz.AI.g_board[pos] == 0) {
                to = pos - 17;
                if (Dagaz.AI.g_board[to] == 0) {
                    to -= 17;
                    if (Dagaz.AI.g_board[to] == 0) {moveStack[moveStack.length] = GenerateMove(from, to);}
                }
                to = pos - 15;
                if (Dagaz.AI.g_board[to] == 0) {
                    to -= 15;
                    if (Dagaz.AI.g_board[to] == 0) {moveStack[moveStack.length] = GenerateMove(from, to);}
                }
            }
            pos = from + 16;
            if (Dagaz.AI.g_board[pos] == 0) {
                to = pos + 17;
                if (Dagaz.AI.g_board[to] == 0) {
                    to += 17;
                    if (Dagaz.AI.g_board[to] == 0) {moveStack[moveStack.length] = GenerateMove(from, to);}
                }
                to = pos + 15;
                if (Dagaz.AI.g_board[to] == 0) {
                    to += 15;
                    if (Dagaz.AI.g_board[to] == 0) {moveStack[moveStack.length] = GenerateMove(from, to);}
                }
            }
            pos = from - 1;
            if (Dagaz.AI.g_board[pos] == 0) {
                to = pos - 17;
                if (Dagaz.AI.g_board[to] == 0) {
                    to -= 17;
                    if (Dagaz.AI.g_board[to] == 0) {moveStack[moveStack.length] = GenerateMove(from, to);}
                }
                to = pos + 15;
                if (Dagaz.AI.g_board[to] == 0) {
                    to += 15;
                    if (Dagaz.AI.g_board[to] == 0) {moveStack[moveStack.length] = GenerateMove(from, to);}
                }
            }
            pos = from + 1;
            if (Dagaz.AI.g_board[pos] == 0) {
                to = pos + 17;
                if (Dagaz.AI.g_board[to] == 0) {
                    to += 17;
                    if (Dagaz.AI.g_board[to] == 0) {moveStack[moveStack.length] = GenerateMove(from, to);}
                }
                to = pos - 15;
                if (Dagaz.AI.g_board[to] == 0) {
                    to -= 15;
                    if (Dagaz.AI.g_board[to] == 0) {moveStack[moveStack.length] = GenerateMove(from, to);}
                }
            }
	from = Dagaz.AI.g_pieceList[pieceIdx++];
    }

    // Knight quiet moves
    pieceIdx = (Dagaz.AI.g_toMove | pieceKnight) << Dagaz.AI.COUNTER_SIZE;
    from = Dagaz.AI.g_pieceList[pieceIdx++];
    while (from != 0) {
        pos = from - 16;
        if (Dagaz.AI.g_board[pos] == 0) {
            to = pos - 15; if (Dagaz.AI.g_board[to] == 0) {moveStack[moveStack.length] = GenerateMove(from, to);}
            to = pos - 17; if (Dagaz.AI.g_board[to] == 0) {moveStack[moveStack.length] = GenerateMove(from, to);}
        }
        pos = from + 16;
        if (Dagaz.AI.g_board[pos] == 0) {
            to = pos + 15; if (Dagaz.AI.g_board[to] == 0) {moveStack[moveStack.length] = GenerateMove(from, to);}
            to = pos + 17; if (Dagaz.AI.g_board[to] == 0) {moveStack[moveStack.length] = GenerateMove(from, to);}
        }
        pos = from - 1;
        if (Dagaz.AI.g_board[pos] == 0) {
            to = pos - 17; if (Dagaz.AI.g_board[to] == 0) {moveStack[moveStack.length] = GenerateMove(from, to);}
            to = pos + 15; if (Dagaz.AI.g_board[to] == 0) {moveStack[moveStack.length] = GenerateMove(from, to);}
        }
        pos = from + 1;
        if (Dagaz.AI.g_board[pos] == 0) {
            to = pos - 15; if (Dagaz.AI.g_board[to] == 0) {moveStack[moveStack.length] = GenerateMove(from, to);}
            to = pos + 17; if (Dagaz.AI.g_board[to] == 0) {moveStack[moveStack.length] = GenerateMove(from, to);}
        }
	from = Dagaz.AI.g_pieceList[pieceIdx++];
    }

    // Rook quiet moves
    pieceIdx = (Dagaz.AI.g_toMove | pieceRook) << Dagaz.AI.COUNTER_SIZE;
    from = Dagaz.AI.g_pieceList[pieceIdx++];
    while (from != 0) {
	to = from - 1;  while (Dagaz.AI.g_board[to] == 0) { moveStack[moveStack.length] = GenerateMove(from, to); to--; }
	to = from + 1;  while (Dagaz.AI.g_board[to] == 0) { moveStack[moveStack.length] = GenerateMove(from, to); to++; }
	to = from + 16; while (Dagaz.AI.g_board[to] == 0) { moveStack[moveStack.length] = GenerateMove(from, to); to += 16; }
	to = from - 16; while (Dagaz.AI.g_board[to] == 0) { moveStack[moveStack.length] = GenerateMove(from, to); to -= 16; }
	from = Dagaz.AI.g_pieceList[pieceIdx++];
    }

    // Cannon quiet moves
    pieceIdx = (Dagaz.AI.g_toMove | pieceCannon) << Dagaz.AI.COUNTER_SIZE;
    from = Dagaz.AI.g_pieceList[pieceIdx++];
    while (from != 0) {
            to = from; do { to--; } while (Dagaz.AI.g_board[to] == 0);
            if ((Dagaz.AI.g_board[to] & Dagaz.AI.PLAYERS_MASK) && ((Dagaz.AI.g_board[to] & Dagaz.AI.TYPE_MASK) != pieceCannon)) {
                to--; while (Dagaz.AI.g_board[to] == 0) { moveStack[moveStack.length] = GenerateMove(from, to); to--; }
            }
            to = from; do { to++; } while (Dagaz.AI.g_board[to] == 0);
            if ((Dagaz.AI.g_board[to] & Dagaz.AI.PLAYERS_MASK) && ((Dagaz.AI.g_board[to] & Dagaz.AI.TYPE_MASK) != pieceCannon)) {
                to++; while (Dagaz.AI.g_board[to] == 0) { moveStack[moveStack.length] = GenerateMove(from, to); to++; }
            }
            to = from; do { to -= 16; } while (Dagaz.AI.g_board[to] == 0);
            if ((Dagaz.AI.g_board[to] & Dagaz.AI.PLAYERS_MASK) && ((Dagaz.AI.g_board[to] & Dagaz.AI.TYPE_MASK) != pieceCannon)) {
                to -= 16; while (Dagaz.AI.g_board[to] == 0) { moveStack[moveStack.length] = GenerateMove(from, to); to -= 16; }
            }
            to = from; do { to += 16; } while (Dagaz.AI.g_board[to] == 0);
            if ((Dagaz.AI.g_board[to] & Dagaz.AI.PLAYERS_MASK) && ((Dagaz.AI.g_board[to] & Dagaz.AI.TYPE_MASK) != pieceCannon)) {
                to += 16; while (Dagaz.AI.g_board[to] == 0) { moveStack[moveStack.length] = GenerateMove(from, to); to += 16; }
            }
	from = Dagaz.AI.g_pieceList[pieceIdx++];
    }

    // King quiet moves
    pieceIdx = (Dagaz.AI.g_toMove | pieceKing) << Dagaz.AI.COUNTER_SIZE;
    from = Dagaz.AI.g_pieceList[pieceIdx];
    to = from - 16; adj = pieceSquareAdj[pieceKing][me == 0 ? flipTable[to] : to];
    if (adj != 0) {
        if (Dagaz.AI.g_board[to] == 0) {moveStack[moveStack.length] = GenerateMove(from, to);}
    }
    to = from + 16; adj = pieceSquareAdj[pieceKing][me == 0 ? flipTable[to] : to];
    if (adj != 0) {
        if (Dagaz.AI.g_board[to] == 0) {moveStack[moveStack.length] = GenerateMove(from, to);}
    }
    to = from - 1; adj = pieceSquareAdj[pieceKing][me == 0 ? flipTable[to] : to];
    if (adj != 0) {
        if (Dagaz.AI.g_board[to] == 0) {moveStack[moveStack.length] = GenerateMove(from, to);}
    }
    to = from + 1; adj = pieceSquareAdj[pieceKing][me == 0 ? flipTable[to] : to];
    if (adj != 0) {
        if (Dagaz.AI.g_board[to] == 0) {moveStack[moveStack.length] = GenerateMove(from, to);}
    }
}

Dagaz.AI.GenerateCaptureMoves = function(moveStack) {
    var adj, from, to, pos, piece, pieceIdx;
    var me = Dagaz.AI.g_toMove >> Dagaz.AI.TYPE_SIZE;
    var enemy = Dagaz.AI.g_toMove == Dagaz.AI.colorWhite ? Dagaz.AI.colorBlack : Dagaz.AI.colorWhite;
    var inc = (Dagaz.AI.g_toMove == Dagaz.AI.colorWhite) ? -16 : 16;

    // Pawn captures
    pieceIdx = (Dagaz.AI.g_toMove | piecePawn) << Dagaz.AI.COUNTER_SIZE;
    from = Dagaz.AI.g_pieceList[pieceIdx++];
    while (from != 0) {
        to = from + inc; if (Dagaz.AI.g_board[to] & enemy) {moveStack[moveStack.length] = GenerateMove(from, to);}
        adj = pieceSquareAdj[piecePawn][me == 0 ? flipTable[from] : from];
        if (adj != 0) {
            to = from - 1; if (Dagaz.AI.g_board[to] & enemy) {moveStack[moveStack.length] = GenerateMove(from, to);}
            to = from + 1; if (Dagaz.AI.g_board[to] & enemy) {moveStack[moveStack.length] = GenerateMove(from, to);}
        }
	from = Dagaz.AI.g_pieceList[pieceIdx++];
    }

    // Advisor captures
    pieceIdx = (Dagaz.AI.g_toMove | pieceAdvisor) << Dagaz.AI.COUNTER_SIZE;
    from = Dagaz.AI.g_pieceList[pieceIdx++];
    while (from != 0) {
        to = from - 15; adj = pieceSquareAdj[pieceAdvisor][me == 0 ? flipTable[to] : to];
        if (adj != 0) {
            if (Dagaz.AI.g_board[to] & enemy) {moveStack[moveStack.length] = GenerateMove(from, to);}
        }
        to = from - 17; adj = pieceSquareAdj[pieceAdvisor][me == 0 ? flipTable[to] : to];
        if (adj != 0) {
            if (Dagaz.AI.g_board[to] & enemy) {moveStack[moveStack.length] = GenerateMove(from, to);}
        }
        to = from + 15; adj = pieceSquareAdj[pieceAdvisor][me == 0 ? flipTable[to] : to];
        if (adj != 0) {
            if (Dagaz.AI.g_board[to] & enemy) {moveStack[moveStack.length] = GenerateMove(from, to);}
        }
        to = from + 17; adj = pieceSquareAdj[pieceAdvisor][me == 0 ? flipTable[to] : to];
        if (adj != 0) {
            if (Dagaz.AI.g_board[to] & enemy) {moveStack[moveStack.length] = GenerateMove(from, to);}
        }
	from = Dagaz.AI.g_pieceList[pieceIdx++];
    }

    // Bishop captures
    pieceIdx = (Dagaz.AI.g_toMove | pieceBishop) << Dagaz.AI.COUNTER_SIZE;
    from = Dagaz.AI.g_pieceList[pieceIdx++];
    while (from != 0) {
            pos = from - 16;
            if (Dagaz.AI.g_board[pos] == 0) {
                to = pos - 17;
                if (Dagaz.AI.g_board[to] == 0) {
                    to -= 17;
                    if (Dagaz.AI.g_board[to] & enemy) {moveStack[moveStack.length] = GenerateMove(from, to);}
                }
                to = pos - 15;
                if (Dagaz.AI.g_board[to] == 0) {
                    to -= 15;
                    if (Dagaz.AI.g_board[to] & enemy) {moveStack[moveStack.length] = GenerateMove(from, to);}
                }
            }
            pos = from + 16;
            if (Dagaz.AI.g_board[pos] == 0) {
                to = pos + 17;
                if (Dagaz.AI.g_board[to] == 0) {
                    to += 17;
                    if (Dagaz.AI.g_board[to] & enemy) {moveStack[moveStack.length] = GenerateMove(from, to);}
                }
                to = pos + 15;
                if (Dagaz.AI.g_board[to] == 0) {
                    to += 15;
                    if (Dagaz.AI.g_board[to] & enemy) {moveStack[moveStack.length] = GenerateMove(from, to);}
                }
            }
            pos = from - 1;
            if (Dagaz.AI.g_board[pos] == 0) {
                to = pos - 17;
                if (Dagaz.AI.g_board[to] == 0) {
                    to -= 17;
                    if (Dagaz.AI.g_board[to] & enemy) {moveStack[moveStack.length] = GenerateMove(from, to);}
                }
                to = pos + 15;
                if (Dagaz.AI.g_board[to] == 0) {
                    to += 15;
                    if (Dagaz.AI.g_board[to] & enemy) {moveStack[moveStack.length] = GenerateMove(from, to);}
                }
            }
            pos = from + 1;
            if (Dagaz.AI.g_board[pos] == 0) {
                to = pos + 17;
                if (Dagaz.AI.g_board[to] == 0) {
                    to += 17;
                    if (Dagaz.AI.g_board[to] & enemy) {moveStack[moveStack.length] = GenerateMove(from, to);}
                }
                to = pos - 15;
                if (Dagaz.AI.g_board[to] == 0) {
                    to -= 15;
                    if (Dagaz.AI.g_board[to] & enemy) {moveStack[moveStack.length] = GenerateMove(from, to);}
                }
            }
	from = Dagaz.AI.g_pieceList[pieceIdx++];
    }

    // Knight captures
    pieceIdx = (Dagaz.AI.g_toMove | pieceKnight) << Dagaz.AI.COUNTER_SIZE;
    from = Dagaz.AI.g_pieceList[pieceIdx++];
    while (from != 0) {
        pos = from - 16;
        if (Dagaz.AI.g_board[pos] == 0) {
            to = pos - 15; if (Dagaz.AI.g_board[to] & enemy) {moveStack[moveStack.length] = GenerateMove(from, to);}
            to = pos - 17; if (Dagaz.AI.g_board[to] & enemy) {moveStack[moveStack.length] = GenerateMove(from, to);}
        }
        pos = from + 16;
        if (Dagaz.AI.g_board[pos] == 0) {
            to = pos + 15; if (Dagaz.AI.g_board[to] & enemy) {moveStack[moveStack.length] = GenerateMove(from, to);}
            to = pos + 17; if (Dagaz.AI.g_board[to] & enemy) {moveStack[moveStack.length] = GenerateMove(from, to);}
        }
        pos = from - 1;
        if (Dagaz.AI.g_board[pos] == 0) {
            to = pos - 17; if (Dagaz.AI.g_board[to] & enemy) {moveStack[moveStack.length] = GenerateMove(from, to);}
            to = pos + 15; if (Dagaz.AI.g_board[to] & enemy) {moveStack[moveStack.length] = GenerateMove(from, to);}
        }
        pos = from + 1;
        if (Dagaz.AI.g_board[pos] == 0) {
            to = pos - 15; if (Dagaz.AI.g_board[to] & enemy) {moveStack[moveStack.length] = GenerateMove(from, to);}
            to = pos + 17; if (Dagaz.AI.g_board[to] & enemy) {moveStack[moveStack.length] = GenerateMove(from, to);}
        }
	from = Dagaz.AI.g_pieceList[pieceIdx++];
    }

    // Rook captures
    pieceIdx = (Dagaz.AI.g_toMove | pieceRook) << Dagaz.AI.COUNTER_SIZE;
    from = Dagaz.AI.g_pieceList[pieceIdx++];
    while (from != 0) {
	to = from; do { to--; } while (Dagaz.AI.g_board[to] == 0); if (Dagaz.AI.g_board[to] & enemy) moveStack[moveStack.length] = GenerateMove(from, to);
	to = from; do { to++; } while (Dagaz.AI.g_board[to] == 0); if (Dagaz.AI.g_board[to] & enemy) moveStack[moveStack.length] = GenerateMove(from, to);
	to = from; do { to -= 16; } while (Dagaz.AI.g_board[to] == 0); if (Dagaz.AI.g_board[to] & enemy) moveStack[moveStack.length] = GenerateMove(from, to);
	to = from; do { to += 16; } while (Dagaz.AI.g_board[to] == 0); if (Dagaz.AI.g_board[to] & enemy) moveStack[moveStack.length] = GenerateMove(from, to);
	from = Dagaz.AI.g_pieceList[pieceIdx++];
    }

    // Cannon captures
    pieceIdx = (Dagaz.AI.g_toMove | pieceCannon) << Dagaz.AI.COUNTER_SIZE;
    from = Dagaz.AI.g_pieceList[pieceIdx++];
    while (from != 0) {
            to = from; do { to--; } while (Dagaz.AI.g_board[to] == 0);
            if ((Dagaz.AI.g_board[to] & Dagaz.AI.PLAYERS_MASK) && ((Dagaz.AI.g_board[to] & Dagaz.AI.TYPE_MASK) != pieceCannon)) {
                to--; while (Dagaz.AI.g_board[to] == 0) { to--; }
                if ((Dagaz.AI.g_board[to] & enemy) && ((Dagaz.AI.g_board[to] & Dagaz.AI.TYPE_MASK) != pieceCannon)) moveStack[moveStack.length] = GenerateMove(from, to);
            }
            to = from; do { to++; } while (Dagaz.AI.g_board[to] == 0);
            if ((Dagaz.AI.g_board[to] & Dagaz.AI.PLAYERS_MASK) && ((Dagaz.AI.g_board[to] & Dagaz.AI.TYPE_MASK) != pieceCannon)) {
                to++; while (Dagaz.AI.g_board[to] == 0) { to++; }
                if ((Dagaz.AI.g_board[to] & enemy) && ((Dagaz.AI.g_board[to] & Dagaz.AI.TYPE_MASK) != pieceCannon)) moveStack[moveStack.length] = GenerateMove(from, to);
            }
            to = from; do { to -= 16; } while (Dagaz.AI.g_board[to] == 0);
            if ((Dagaz.AI.g_board[to] & Dagaz.AI.PLAYERS_MASK) && ((Dagaz.AI.g_board[to] & Dagaz.AI.TYPE_MASK) != pieceCannon)) {
                to -= 16; while (Dagaz.AI.g_board[to] == 0) { to -= 16; }
                if ((Dagaz.AI.g_board[to] & enemy) && ((Dagaz.AI.g_board[to] & Dagaz.AI.TYPE_MASK) != pieceCannon)) moveStack[moveStack.length] = GenerateMove(from, to);
            }
            to = from; do { to += 16; } while (Dagaz.AI.g_board[to] == 0);
            if ((Dagaz.AI.g_board[to] & Dagaz.AI.PLAYERS_MASK) && ((Dagaz.AI.g_board[to] & Dagaz.AI.TYPE_MASK) != pieceCannon)) {
                to += 16; while (Dagaz.AI.g_board[to] == 0) { to += 16; }
                if ((Dagaz.AI.g_board[to] & enemy) && ((Dagaz.AI.g_board[to] & Dagaz.AI.TYPE_MASK) != pieceCannon)) moveStack[moveStack.length] = GenerateMove(from, to);
            }
	from = Dagaz.AI.g_pieceList[pieceIdx++];
    }

    // King captures
    pieceIdx = (Dagaz.AI.g_toMove | pieceKing) << Dagaz.AI.COUNTER_SIZE;
    from = Dagaz.AI.g_pieceList[pieceIdx];
    to = from - 16; adj = pieceSquareAdj[pieceKing][me == 0 ? flipTable[to] : to];
    if (adj != 0) {
        if (Dagaz.AI.g_board[to] & enemy) {moveStack[moveStack.length] = GenerateMove(from, to);}
    }
    to = from + 16; adj = pieceSquareAdj[pieceKing][me == 0 ? flipTable[to] : to];
    if (adj != 0) {
        if (Dagaz.AI.g_board[to] & enemy) {moveStack[moveStack.length] = GenerateMove(from, to);}
    }
    to = from - 1; adj = pieceSquareAdj[pieceKing][me == 0 ? flipTable[to] : to];
    if (adj != 0) {
        if (Dagaz.AI.g_board[to] & enemy) {moveStack[moveStack.length] = GenerateMove(from, to);}
    }
    to = from + 1; adj = pieceSquareAdj[pieceKing][me == 0 ? flipTable[to] : to];
    if (adj != 0) {
        if (Dagaz.AI.g_board[to] & enemy) {moveStack[moveStack.length] = GenerateMove(from, to);}
    }
}

Dagaz.AI.See = function(move) {
    var from = move & 0xFF;
    var to = (move >> 8) & 0xFF;

    var fromPiece = Dagaz.AI.g_board[from];

    var fromValue = g_seeValues[fromPiece & Dagaz.AI.PIECE_MASK];
    var toValue = g_seeValues[Dagaz.AI.g_board[to] & Dagaz.AI.PIECE_MASK];

    if (fromValue <= toValue) {
        return true;
    }

    var us = (fromPiece & Dagaz.AI.colorWhite) ? Dagaz.AI.colorWhite : 0;
    var them = Dagaz.AI.colorWhite - us;

    var themAttacks = new Array();

    // Pawn attacks 
    // If any opponent pawns can capture back, this capture is probably not worthwhile (as we must be using knight or above).
    if (SeeAddSliderAttacks(to, them, themAttacks, piecePawn)) {
        return false;
    }

    // Knight attacks 
    // If any opponent knights can capture back, and the deficit we have to make up is greater than the knights value, 
    // it's not worth it.  We can capture on this square again, and the opponent doesn't have to capture back. 
    var captureDeficit = fromValue - toValue;

    // Slider attacks
    Dagaz.AI.g_board[from] = 0;
    for (var pieceType = pieceAdvisor; pieceType <= pieceRook; pieceType++) {
        if (SeeAddSliderAttacks(to, them, themAttacks, pieceType)) {
            if (captureDeficit > g_seeValues[pieceType]) {
                Dagaz.AI.g_board[from] = fromPiece;
                return false;
            }
        }
    }

    var usAttacks = new Array();

    // Pawn defenses 
    // At this point, we are sure we are making a "losing" capture.  The opponent can not capture back with a 
    // pawn.  They cannot capture back with a minor/major and stand pat either.  So, if we can capture with 
    // a pawn, it's got to be a winning or equal capture. 
    if (SeeAddSliderAttacks(to, us, usAttacks, piecePawn)) {
        Dagaz.AI.g_board[from] = fromPiece;
        return true;
    }

    // King attacks
    SeeAddSliderAttacks(to, them, themAttacks, pieceKing);

    // Our attacks
    for (var pieceType = pieceAdvisor; pieceType <= pieceKing; pieceType++) {
        SeeAddSliderAttacks(to, us, usAttacks, pieceType);
    }

    Dagaz.AI.g_board[from] = fromPiece;

    // We are currently winning the amount of material of the captured piece, time to see if the opponent 
    // can get it back somehow.  We assume the opponent can capture our current piece in this score, which 
    // simplifies the later code considerably. 
    var seeValue = toValue - fromValue;

    for (; ; ) {
        var capturingPieceValue = 1000;
        var capturingPieceIndex = -1;

        // Find the least valuable piece of the opponent that can attack the square
        for (var i = 0; i < themAttacks.length; i++) {
            if (themAttacks[i] != 0) {
                var pieceValue = g_seeValues[Dagaz.AI.g_board[themAttacks[i]] & Dagaz.AI.TYPE_MASK];
                if (pieceValue < capturingPieceValue) {
                    capturingPieceValue = pieceValue;
                    capturingPieceIndex = i;
                }
            }
        }

        if (capturingPieceIndex == -1) {
            // Opponent can't capture back, we win
            return true;
        }

        // Now, if seeValue < 0, the opponent is winning.  If even after we take their piece, 
        // we can't bring it back to 0, then we have lost this battle. 
        seeValue += capturingPieceValue;
        if (seeValue < 0) {
            return false;
        }

        var capturingPieceSquare = themAttacks[capturingPieceIndex];
        themAttacks[capturingPieceIndex] = 0;

        // Add any x-ray attackers
        SeeAddXrayAttack(to, capturingPieceSquare, us, usAttacks, themAttacks);

        // Our turn to capture
        capturingPieceValue = 1000;
        capturingPieceIndex = -1;

        // Find our least valuable piece that can attack the square
        for (var i = 0; i < usAttacks.length; i++) {
            if (usAttacks[i] != 0) {
                var pieceValue = g_seeValues[Dagaz.AI.g_board[usAttacks[i]] & Dagaz.AI.TYPE_MASK];
                if (pieceValue < capturingPieceValue) {
                    capturingPieceValue = pieceValue;
                    capturingPieceIndex = i;
                }
            }
        }

        if (capturingPieceIndex == -1) {
            // We can't capture back, we lose :( 
            return false;
        }

        // Assume our opponent can capture us back, and if we are still winning, we can stand-pat 
        // here, and assume we've won. 
        seeValue -= capturingPieceValue;
        if (seeValue >= 0) {
            return true;
        }

        capturingPieceSquare = usAttacks[capturingPieceIndex];
        usAttacks[capturingPieceIndex] = 0;

        // Add any x-ray attackers
        SeeAddXrayAttack(to, capturingPieceSquare, us, usAttacks, themAttacks);
    }
}

function SeeAddXrayAttack(target, square, us, usAttacks, themAttacks) {
  var inc;
  if ((target & 0xF) == (square & 0xF)) {
      inc = (square > target) ? 16 : -16;
  }
  if ((target & 0xF0) == (square & 0xF0)) {
      inc = (square > target) ? 1 : -1;
  }
  var to = square + inc; while (Dagaz.AI.g_board[to] == 0) { to += inc; }
  if ((Dagaz.AI.g_board[to] & Dagaz.AI.TYPE_MASK) == pieceRook) {
      if ((Dagaz.AI.g_board[to] & Dagaz.AI.colorWhite) == us) {
          usAttacks[usAttacks.length] = to;
      } else {
          themAttacks[themAttacks.length] = to;
      }
      return;
  }
  if ((Dagaz.AI.g_board[to] & Dagaz.AI.PLAYERS_MASK) == 0) return;
  to += inc; while (Dagaz.AI.g_board[to] == 0) { to += inc; }
  if ((Dagaz.AI.g_board[to] & Dagaz.AI.TYPE_MASK) != pieceCannon) return;
  if ((Dagaz.AI.g_board[to] & Dagaz.AI.colorWhite) == us) {
      usAttacks[usAttacks.length] = to;
  } else {
      themAttacks[themAttacks.length] = to;
  }
}

function SeeAddSliderAttacks(target, us, attacks, pieceType) {
    var pieceIdx = (us | pieceType) << Dagaz.AI.COUNTER_SIZE;
    var attackerSq = Dagaz.AI.g_pieceList[pieceIdx++];
    var hit = false;
    while (attackerSq != 0) {
        if (IsSquareAttackableFrom(target, attackerSq)) {
            if (pieceType > piecePawn) {
                attacks[attacks.length] = attackerSq;
            }
            hit = true;
        }
        attackerSq = Dagaz.AI.g_pieceList[pieceIdx++];
    }
    return hit;
}

})();
