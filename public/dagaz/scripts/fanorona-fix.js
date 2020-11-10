(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "fanorona-fix") {
     checkVersion(design, name, value);
  }
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;
  _.each(board.moves, function(move) {
      var piece = null;
      _.each(move.actions, function(a) {
          if ((a[0] !== null) && (a[1] !== null)) {
              if (piece === null) {
                  piece = board.getPiece(a[0][0]);
              }
              a[2] = [piece];
          }
      });
  });
  CheckInvariants(board);
}

})();
