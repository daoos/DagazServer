(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "puluc-extension") {
      checkVersion(design, name, value);
  }
}

var moveToString = Dagaz.Model.moveToString;

Dagaz.Model.moveToString = function(move, part) {
  if ((move.actions.length > 0) && (move.actions[0][0] !== null) && (move.actions[0][1] !== null)) {
      return Dagaz.Model.posToString(move.actions[0][0][0]) + ' - ' +
             Dagaz.Model.posToString(move.actions[0][1][0]);
  }
  return moveToString(move, part);
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;
  _.each(board.moves, function(move) {
      if (!_.isUndefined(move.failed)) return;
      if (move.mode == 0) return;
      var stack = [];
      var pos = design.navigate(1, move.actions[0][0][0], 1);
      while (pos !== null) {
          var piece = board.getPiece(pos);
          if ((piece === null) || (piece.player == board.player)) break;
          stack.push(pos);
          pos = design.navigate(1, pos, 1);
      }
      pos = move.actions[0][1][0];
      if (design.inZone(1, board.player, pos)) {
          while (stack.length > 0) {
              move.capturePiece(stack.pop());
          }
      } else {
          while (stack.length > 0) {
              var p = stack.pop();
              move.movePiece(p, pos, board.getPiece(p));
              pos = design.navigate(1, pos, 0);
              if (pos === null) {
                  move.failed = true;
                  return;
              }
          }    
          move.actions[0][1] = [pos];
      }
  });
  CheckInvariants(board);
}

})();
