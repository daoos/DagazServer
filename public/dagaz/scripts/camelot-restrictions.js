(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "camelot-restrictions") {
      checkVersion(design, name, value);
  }
}

var isEq = function(a, b) {
  if ((a[0] === null) && (b[0] !== null)) return false;
  if ((b[0] === null) && (a[0] !== null)) return false;
  if ((a[1] === null) && (b[1] !== null)) return false;
  if ((b[1] === null) && (a[1] !== null)) return false;
  if ((a[0] !== null) && (a[0][0] != b[0][0])) return false;
  if ((a[1] !== null) && (a[1][0] != b[1][0])) return false;
  return true;
}

var isPrefix = function(move, prefix) {
  if (move.actions.length <= prefix.actions.length) return false;
  for (var i = 0; i < prefix.actions.length; i++) {
       if (i >= move.actions.length) return false;
       if (!isEq(move.actions[i], prefix.actions[i])) return false;
  }
  return true;
}

var prefixFound = function(board, move) {
  var r = false;
  _.each(board.moves, function(m) {
      if (_.isUndefined(m.failed) && isPrefix(m, move)) {
          r = true;
      }
  });
  return r;
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;
  _.each(board.moves, function(move) {
      if (_.isUndefined(move.failed)) {
          var cnt = 0;
          _.each(move.actions, function(a) {
              if ((a[0] !== null) && (a[1] === null)) cnt++;
          });
          if ((cnt > 0) && prefixFound(board, move)) {
              move.failed = true;
          }
      }
  });
  var moves = [];
  _.each(board.moves, function(move) {
      if (!_.isUndefined(move.failed)) return;
      var c = 0;
      _.each(move.actions, function(a) {
          if (a[0] === null) return;
          if (a[1] !== null) return;
          c++;
      });
      if (c == 0) return;
      moves.push(move);
  });
  if (moves.length > 0) {
      board.moves = moves;
  }
  CheckInvariants(board);
}

})();
