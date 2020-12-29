(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "three-crowns-invariant") {
      checkVersion(design, name, value);
  }
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;
  _.each(board.moves, function(m) {
     if ((m.actions.length > 0) && (m.actions[0][0] !== null) && (m.actions[0][1] !== null)) {
         var dir = design.findDirection(m.actions[0][0][0], m.actions[0][1][0]);
         if ((dir === null) && (m.actions.length == 1)) {
             m.failed = true;
         }
     }
  });
  CheckInvariants(board);
}

})();
