(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "shatra-promotion") {
     checkVersion(design, name, value);
  }
}

var getX = function(pos) {
  return pos % 7;
}

var getY = function(pos) {
  return (pos / 7) | 0;
}

var isCantCapture = function(design, board, a, b, piece) {
  if (piece.type == 4) return false;
  var dx = Math.abs(getX(a) - getX(b));
  var dy = Math.abs(getY(a) - getY(b));
  if ((dx == 0) || (dy == 0)) {
      return piece.type == 2;
  }
  if (dx == dy) {
      return piece.type == 3;
  }
  if ((dx <= 1) && (dy <= 1)) {
      return false;
  }
  return true;
}

var calcPieces = function(design, board, player, type) {
  var cnt = 0;
  _.each(design.allPositions(), function(p) {
      var piece = board.getPiece(p);
      if ((piece !== null) && (piece.player == player) && (piece.type == type)) {
          cnt++;
      }
  });
  return cnt;
}

var promotePiece = function(design, board, player, piece) {
  var type = 4;
  var cnt  = calcPieces(design, board, player, type);
  if (cnt >= 1) {
      type = 3;
      cnt  = calcPieces(design, board, player, type);
  }
  if (cnt >= 2) {
      type = 2;
      cnt  = calcPieces(design, board, player, type);
  }
  if (cnt >= 2) {
      type = 0;
  }
  if (piece.type == type) return piece;
  return piece.promote(type);
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;
  _.each(board.moves, function(m) {
      var piece     = null;
      var promoted  = null;
      var last      = null;
      var restrict  = null;
      _.each(m.actions, function(a) {
          if ((a[0] !== null) && (a[1] === null) && (last !== null) && (promoted !== null)) {
              if (isCantCapture(design, board, last, a[0][0], promoted)) {
                  restrict = a[3];
                  return;
              }
          }
          if ((a[0] !== null) && (a[1] !== null)) {
              if (piece === null) {
                  piece = board.getPiece(a[0][0]);
              }
              last = a[1][0];
              var p = null;
              if (a[2] !== null) {
                  p = a[2][0];
              }
              if ((p !== null) && (p.type != piece.type)) {
                  if (promoted === null) {
                      promoted = promotePiece(design, board, board.player, p);
                  }
                  a[2] = [ promoted ];
              }
          }
      });
      if (restrict !== null) {
          m.actions = _.filter(m.actions, function(a) {
              return a[3] < restrict;
          });
      }
  });  
  CheckInvariants(board);
}

})();
