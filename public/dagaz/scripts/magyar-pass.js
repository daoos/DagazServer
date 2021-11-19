(function() {

var inProgress = false;

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "magyar-pass") {
     checkVersion(design, name, value);
  }
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;
  if (!inProgress && (_.indexOf([0, 2], +board.turn) >= 0)) {
      _.each(board.moves, function(move) {
          var b = board.apply(move);
          inProgress = true;
          b.generate(design);
          inProgress = false;
          if ((b.moves.length == 0) || ((b.moves.length == 1) && (b.moves[0].actions.length == 0))) {
              if (board.turn == 0) {
                  move.goTo(2);
              } else {
                  move.goTo(0);
              }
          }
      });
  }
  CheckInvariants(board);
}

})();
