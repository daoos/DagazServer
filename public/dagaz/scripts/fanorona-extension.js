(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "fanorona-extension") {
     checkVersion(design, name, value);
  }
}

Dagaz.AI.MAX_DEEP  = 2;
Dagaz.AI.heuristic = Dagaz.AI.simpleHeuristic;

Dagaz.AI.eval = function(design, params, board, player) {
  var r = 0;
  _.each(design.allPositions(), function(pos) {
      var piece = board.getPiece(pos);
      if (piece !== null) {
          var v = design.price[piece.type];
          var bonus = 8;
          if (_.indexOf([19, 29, 11, 21, 31, 13, 23, 33, 15, 25], +pos) >= 0) {
              bonus -= 4;
          }
          if (_.indexOf([27, 9, 37, 39, 41, 43, 1, 3, 5, 7, 35, 17], +pos) >= 0) {
              bonus -= 3;
          }
          if (_.indexOf([36, 0, 44, 8], +pos) >= 0) {
              bonus -= 5;
          }
          v += bonus;
          if (!Dagaz.AI.isFriend(player, piece.player)) {
              v = -v;
          }
          r += v;
      }
  });
  return r;
}

var CheckInvariants = Dagaz.Model.CheckInvariants;

Dagaz.Model.CheckInvariants = function(board) {
  var design = Dagaz.Model.design;
  _.chain(board.moves)
   .filter(function(move) {
        return move.actions.length > 1;
    })
   .each(function(move) {
        var capturing = [];
        var actions = [];
        var mx = _.chain(move.actions)
         .map(function(action) {
              return action[3];
          }).max().value();
        var last = null;
        var p = 1;
        for (var part = 1; part <= mx; part++) {
             var from = null;
             var to   = null;
             var pos  = null;
             _.chain(move.actions)
              .filter(function(action) {
                   return (action[3] == part);
               })
              .each(function(action) {
                   if ((action[0] !== null) && (action[1] !== null)) {
                       from = action[0][0];
                       to = action[1][0];
                   }
                   if ((action[0] !== null) && (action[1] === null)) {
                       pos = action[0][0];
                   }
               });
             if ((last !== null) && (design.findDirection(last, from) == design.findDirection(from, to))) {
                 move.failed = true;
                 break;
             }
             last = from;
             var captured = [];
             _.each(board.moves, function(m) {
                 _.each(m.actions, function(a) {
                     if ((a[3] == part) && (a[0] !== null) && (a[1] !== null) && (a[0][0] == from) && (a[1][0] == to)) {
                         _.each(m.actions, function(c) {
                              if ((c[3] == part) && (c[0] !== null) && (c[1] === null) && (_.indexOf(captured, c[0][0]) < 0)) {
                                  captured.push(c[0][0]);
                                  return;
                              }
                         });
                         return;
                     }
                 });
             });
             var cn = captured.length;
             var dir = design.findDirection(from, pos);
             if (dir === null) {
                 dir = design.findDirection(to, pos);
             }
             if ((pos === null) || (dir == null)) {
                 move.failed = true;
                 return;
             }
             actions.push([ [from], [to], null, p ]);
             while (pos !== null) {
                  if (_.indexOf(capturing, pos) >= 0) {
                      move.failed = true;
                      return;
                  }
                  capturing.push(pos);
                  actions.push([ [pos], null, null, (cn > 1) ? (p + 1) : p ]);
                  pos = design.navigate(board.player, pos, dir);
                  if (pos !== null) {
                      var piece = board.getPiece(pos);
                      if ((piece === null) || (piece.player == board.player)) {
                          pos = null;
                          break;
                      }
                  }
             }
             if (cn > 1) {
                 p++;
             }
             p++;
        }
        move.a = actions;
    });
  _.each(board.moves, function(move) {
      if (move.actions.length > 1) {
          move.actions = move.a;
          delete move.a;
      }
  });
  CheckInvariants(board);
}

})();
