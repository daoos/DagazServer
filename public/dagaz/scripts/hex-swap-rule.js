(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "hex-swap-rule") {
     checkVersion(design, name, value);
  }
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = board.game.design;
  var positions = [];
  _.each(design.allPositions(), function(pos) {
      if (board.getPiece(pos) === null) return;
      positions.push(pos);
  });
  if ((positions.length == 1) && (board.getValue(0) === null)) {
      var move = Dagaz.Model.createMove(0);
      move.dropPiece(positions[0], Dagaz.Model.createPiece(0, board.player));
      move.setValue(0, board.player);
      board.moves.push(move);
      console.log(move);
  }
  CheckInvariants(board);
}

})();
