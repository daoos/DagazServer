(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "chaturaji-pass") {
      checkVersion(design, name, value);
  }
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;
  if (_.indexOf([1, 2, 5, 6, 9, 10, 13, 14], +board.turn) >= 0) {
      _.each(board.moves, function(move) {      
           if (!_.isUndefined(move.failed)) return;
           var b = board.apply(move);
           b.generate();
           if (b.moves.length == 0) {
               if (_.indexOf([13, 14], +board.turn) >= 0) {
                   move.goTo(0);
               } else {
                   var t = +board.turn;
                   if ((t % 2) != 0) {
                       t++;
                   }
                   move.goTo(t + 2);
               }
           }
      });
  }
  CheckInvariants(board);
}

})();
