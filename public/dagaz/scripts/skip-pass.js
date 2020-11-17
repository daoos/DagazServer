(function() {

var inProgress = false;

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "skip-pass") {
      checkVersion(design, name, value);
  }
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = board.game.design;
  if (!inProgress) {
      _.each(board.moves, function(move) {
          var b = board.apply(move);
          inProgress = true;
          b.generate();
          inProgress = false;
          if ((b.moves.length == 1) && (b.moves[0].isPass())) {
              move.goTo(board.turn);
          }
      });
  }
  CheckInvariants(board);
}

})();
