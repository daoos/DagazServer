(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "cyclic-checkers-extension") {
      checkVersion(design, name, value);
  }
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;
  var pos = design.navigate(board.player, 0, 4);
  while (pos !== null) {
      if (board.getPiece(pos) === null) break;
      pos = design.navigate(board.player, pos, 4);
  }
  _.each(board.moves, function(move) {
      var c = [];
      _.each(move.actions, function(a) {
          if (a[0] === null) return;
          if (a[1] !== null) return;
          var piece = board.getPiece(a[0][0]);
          if (piece === null) return;
          if (piece.player != board.player) return;
          c.push(a);
      });
      var q = pos;
      _.each(c, function(a) {
          if (q === null) return;
          var piece = board.getPiece(a[0][0]);
          if (piece === null) return;
          move.dropPiece(q, piece.promote(0), a[3]);
          q = design.navigate(board.player, q, 4);
      });
  });
  CheckInvariants(board);
}

})();
