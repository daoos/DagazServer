(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "camelot-invariant") {
      checkVersion(design, name, value);
  }
}

var getMode = function(design, player, move) {
  var r = 0;
  var start = null; var end = null;
  _.each(move.actions, function(a) {
      if (a[0] !== null) {
          if (a[1] === null) {
              r = 1;
          } else {
              if (start === null) {
                  start = a[0][0];
              }
              end = a[1][0];
          }
      }
  });
  if (design.inZone(1, player, end) && (r == 0)) {
      move.failed = true;
  }
  if ((start !== null) && (end !== null) && design.inZone(1, player, start) && !design.inZone(1, player, end)) {
      return 2 + r;
  }
  return {
      res: r,
      pos: start
  };
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;
  var mode = 0;
  _.each(board.moves, function(move) {
      if (_.isUndefined(move.failed)) {
          var m = getMode(design, board.player, move);
          if ((m.res == 1) && (m.pos !== null)) {
               var piece = board.getPiece(m.pos);
               if ((piece !== null) && (piece.type == 1)) {
                   m = 0;
               }
          }
          if (m.res > mode) {
              mode = m.res;
          }
      }
  });
  if (mode > 0) {
      _.each(board.moves, function(move) {
          if (getMode(design, board.player, move).res < mode) {
              move.failed = true;
          }
      });
  }
  CheckInvariants(board);
}

})();
