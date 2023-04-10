(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "dropper-goal") {
      checkVersion(design, name, value);
  }
}

var analyze = function(design, board) {
  var done = []; var r = [];
  _.each(design.allPositions(), function(pos) {
      if (_.indexOf(done, pos) >= 0) return;
      var piece = board.getPiece(pos);
      if (piece === null) return;
      var group = [pos];
      for (var i = 0; i < group.length; i++) {
          done.push(group[i]);
          _.each([1, 3, 4, 7], function(dir) {
              var p = design.navigate(1, group[i], dir);
              if (p === null) return;
              if (_.indexOf(group, p) >= 0) return;
              var x = board.getPiece(p);
              if (x === null) return;
              if (x.player != piece.player) return;
              group.push(p);
          });
      }
      r.push({
          p: piece.player,
          g: group
      });
  });
  return r;
}

var getScore = function(stat, player, limit) {
  var r = 0;
  _.each(stat, function (s) {
      if (s.p != player) return;
      if (!_.isUndefined(limit)) {
          if (s.g.length >= limit) return;
      }
      if (r < s.g.length) {
          r = s.g.length;
      }
  });
  return r;
}

var checkGoals = Dagaz.Model.checkGoals;

Dagaz.Model.checkGoals = function(design, board, player) {
  board.generate(design);
  if (board.moves.length == 0) {
      var stat = analyze(design, board);
      var b = getScore(stat, 1); var w = getScore(stat, 2);
      while (w == b) {
          b = getScore(stat, 1, b); 
          w = getScore(stat, 2, w);
      }
      console.log(b + '/' + w);
      if (b == w) return 0;
      if (b > w) {
          return (player == 1) ? 1 : -1;
      } else {
          return (player == 2) ? 1 : -1;
      }
  }
  return checkGoals(design, board, player);
}

})();
