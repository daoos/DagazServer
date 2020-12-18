(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "chessence-extension") {
      checkVersion(design, name, value);
  }
}

var getX = function(pos) {
  return pos % 8;
}

var getY = function(pos) {
  return (pos / 8) | 0;
}

var notFriend = function(design, board, pos, dir) {
  var p = design.navigate(board.player, pos, dir);
  if (p === null) return true;
  if (design.inZone(0, board.player, p)) return true;
  var piece = board.getPiece(p);
  if (piece === null) return true;
  return piece.player != board.player;
}

var Extension = Dagaz.Model.Extension;

Dagaz.Model.Extension = function(board) {
  var design = Dagaz.Model.design;
  var n   = design.getDirection("n");   var w   = design.getDirection("w");
  var s   = design.getDirection("s");   var e   = design.getDirection("e");
  var nw  = design.getDirection("nw");  var sw  = design.getDirection("sw");
  var ne  = design.getDirection("ne");  var se  = design.getDirection("se");
  var nnw = design.getDirection("nnw"); var ssw = design.getDirection("ssw");
  var nne = design.getDirection("nne"); var sse = design.getDirection("sse");
  var wwn = design.getDirection("wwn"); var wws = design.getDirection("wws");
  var een = design.getDirection("een"); var ees = design.getDirection("ees");
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
             var pos = action[0][0];
             if (design.inZone(0, board.player, pos)) return;
             var fx  = getX(action[0][0]); var fy = getY(action[0][0]);
             var tx  = getX(action[1][0]); var ty = getY(action[1][0]);
             if ((fx == tx) || (fy == ty)) {
                 if (notFriend(design, board, pos, n) &&
                     notFriend(design, board, pos, s) &&
                     notFriend(design, board, pos, w) &&
                     notFriend(design, board, pos, e)) {
                     move.failed = true;
                 }
                 return;
             }
             if (Math.abs(tx - fx) == Math.abs(ty - fy)) {
                 if (notFriend(design, board, pos, nw) &&
                     notFriend(design, board, pos, se) &&
                     notFriend(design, board, pos, sw) &&
                     notFriend(design, board, pos, ne)) {
                     move.failed = true;
                 }
                 return;
             }
             if (notFriend(design, board, pos, nnw) &&
                 notFriend(design, board, pos, nne) &&
                 notFriend(design, board, pos, ssw) &&
                 notFriend(design, board, pos, sse) &&
                 notFriend(design, board, pos, wwn) &&
                 notFriend(design, board, pos, een) &&
                 notFriend(design, board, pos, wws) &&
                 notFriend(design, board, pos, ees)) {
                 move.failed = true;
             }
         });
    });
  Extension(board);
}

})();
