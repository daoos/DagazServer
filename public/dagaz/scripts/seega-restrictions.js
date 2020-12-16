(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "seega-restrictions") {
     checkVersion(design, name, value);
  }
}

var noCaptures = function(move) {
  var r = true;
  _.each(move.actions, function(a) {
      if (a[0] === null) return;
      if (a[1] !== null) return;
      r = false;
  });
  return r;
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;
  var pos = board.getValue(0);
  if (pos !== null) {
      _.each(board.moves, function(move) {
          if (move.actions.length < 1) return;
          if (move.actions[0][0] === null) return;
          if ((move.actions[0][0][0] != pos) || noCaptures(move)) {
              move.failed = true;
          }          
      });
  }
  CheckInvariants(board);
}

})();
