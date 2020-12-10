(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "troitzky-invariant") {
      checkVersion(design, name, value);
  }
}

Dagaz.Model.findPiece = function(design, board, player, type) {
  var positions = design.allPositions();
  for (var i = 0; i < positions.length; i++) {
       var piece = board.getPiece(positions[i]);
       if ((piece !== null) && (piece.type == type) && (piece.player == player)) {
           return positions[i];
       }
  }
  return null;
}

var changePieces = function(design, board, move) {
  _.each(move.actions, function(action) {
      var piece = null;
      if (action[0] !== null) {
          piece = board.getPiece(action[0][0]);
      } else {
          piece = board.getPiece(action[1][0]);
      }
      if (action[2] !== null) {
          piece = action[2][0];
      }
      if (piece !== null) {
          piece = piece.setValue(0, true);
      }
      action[2] = [ piece ];
  });
}

var isMoved = function(board, pos) {
  var piece = board.getPiece(pos);
  if (piece === null) return true;
  return piece.getValue(0) !== null;
}

var checkDirection = function(design, board, player, pos, dir, leapers, riders) {
  var p = design.navigate(player, pos, dir);
  if (p === null) return false;
  var piece = board.getPiece(p);
  if (piece !== null) {
      if (piece.player == player) return false;
      return (_.indexOf(leapers, +piece.type) >= 0) || (_.indexOf(riders, +piece.type) >= 0);
  }
  while (piece === null) {
      p = design.navigate(player, p, dir);
      if (p === null) return false;
      piece = board.getPiece(p);
  }
  if (piece.player == player) return false;
  return _.indexOf(riders, +piece.type) >= 0;
}

Dagaz.Model.checkPositions = function(design, board, player, positions) {
  var king   = design.getPieceType("King");
  var pawn   = design.getPieceType("Pawn");
  var rook   = design.getPieceType("Rook");
  var knight = design.getPieceType("Knight");
  var bishop = design.getPieceType("Bishop");
  var queen  = design.getPieceType("Queen");
  var n   = design.getDirection("n");   var w   = design.getDirection("w");
  var s   = design.getDirection("s");   var e   = design.getDirection("e");
  var nw  = design.getDirection("nw");  var sw  = design.getDirection("sw");
  var ne  = design.getDirection("ne");  var se  = design.getDirection("se");
  var nne = design.getDirection("nne"); var ssw = design.getDirection("ssw");
  var sse = design.getDirection("sse"); var nnw = design.getDirection("nnw");
  var een = design.getDirection("een"); var wws = design.getDirection("wws");
  var ees = design.getDirection("ees"); var wwn = design.getDirection("wwn");
  for (var i = 0; i < positions.length; i++) {
       var pos = positions[i];
       if (checkDirection(design, board, player, pos, n,   [king], [rook, queen])) return true;
       if (checkDirection(design, board, player, pos, s,   [king], [rook, queen])) return true;
       if (checkDirection(design, board, player, pos, w,   [king], [rook, queen])) return true;
       if (checkDirection(design, board, player, pos, e,   [king], [rook, queen])) return true;
       if (checkDirection(design, board, player, pos, nw,  [king, pawn], [bishop, queen])) return true;
       if (checkDirection(design, board, player, pos, ne,  [king, pawn], [bishop, queen])) return true;
       if (checkDirection(design, board, player, pos, sw,  [king], [bishop, queen])) return true;
       if (checkDirection(design, board, player, pos, se,  [king], [bishop, queen])) return true;
       if (checkDirection(design, board, player, pos, nne, [knight], [])) return true;
       if (checkDirection(design, board, player, pos, ssw, [knight], [])) return true;
       if (checkDirection(design, board, player, pos, sse, [knight], [])) return true;
       if (checkDirection(design, board, player, pos, nnw, [knight], [])) return true;
       if (checkDirection(design, board, player, pos, een, [knight], [])) return true;
       if (checkDirection(design, board, player, pos, wws, [knight], [])) return true;
       if (checkDirection(design, board, player, pos, ees, [knight], [])) return true;
       if (checkDirection(design, board, player, pos, wwn, [knight], [])) return true;
  }
  return false;
}

var checkGoals = Dagaz.Model.checkGoals;

Dagaz.Model.checkGoals = function(design, board, player) {
  var king = design.getPieceType("King");
  board.generate(design);
  if (board.moves.length == 0) {
      var pos = Dagaz.Model.findPiece(design, board, board.player, king);
      if (pos === null) return 1;
      if (Dagaz.Model.checkPositions(design, board, board.player, [pos])) {
          return 1;
      } else {
          return 0;
      }
  }
  return checkGoals(design, board, player);
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;
  var king   = design.getPieceType("King");
  var rook   = design.getPieceType("Rook");
  _.each(board.moves, function(move) {
      var b = board.apply(move);
      var list = [];
      var pos  = Dagaz.Model.findPiece(design, b, board.player, king);
      if (pos !== null) {
          list.push(pos);
      }
      if (move.mode == 1) {
          _.each(move.actions, function(a) {
               if ((a[0] !== null) && (a[1] !== null)) {
                    if (isMoved(board, a[0][0]) || isMoved(board, a[1][0])) {
                        move.failed = true;
                    }
                    list.push(a[0][0]);
                    list.push(a[1][0]);
               }
          });
      }
      if (Dagaz.Model.checkPositions(design, b, board.player, list)) {
          move.failed = true;
          return;
      }
      changePieces(design, board, move);
  });
  CheckInvariants(board);
}

})();
