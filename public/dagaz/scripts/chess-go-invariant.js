(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "chess-go-invariant") {
     checkVersion(design, name, value);
  }
}

var kingFound = function(design, board, pos, dir) {
  var p = design.navigate(board.player, pos, dir);
  while (p !== null) {
      var piece = board.getPiece(p);
      if ((piece !== null) && (piece.type != 0)) {
          return piece.type == 7;
      }
      p = design.navigate(board.player, p, dir);
  }
  return false;
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;
  _.each(board.moves, function(move) {
      if (!_.isUndefined(move.failed)) return;
      var b = board.apply(move);
      var kings = [];
      _.each(design.allPositions(), function(pos) {
          var piece = b.getPiece(pos);
          if (piece === null) return;
          if (piece.type != 7) return;
          kings.push(pos);
      });
      if (kings.length != 2) return;
      if ((Dagaz.Model.getX(kings[0]) == Dagaz.Model.getX(kings[1]))) {
          var pos = _.min(kings, function(pos) {
              return Dagaz.Model.getY(pos);
          });
          if (kingFound(design, b, pos, 1)) move.failed = true;
      }
      if ((Dagaz.Model.getY(kings[0]) == Dagaz.Model.getY(kings[1]))) {
          var pos = _.min(kings, function(pos) {
              return Dagaz.Model.getX(pos);
          });
          if (kingFound(design, b, pos, 3)) move.failed = true;
      }
  });
  CheckInvariants(board);
}

})();
