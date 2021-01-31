(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "chess-setup") {
      checkVersion(design, name, value);
  }
}

var getSeed = function() {
  var str = window.location.search.toString();
  var result = str.match(/[?&](seed|sid)=([^&]*)/);
  if (result) {
      return result[2];
  } else {
      return "" + _.random(0, 10000);
  }
}

var getSetup = function(setup) {
  var str = window.location.search.toString();
  if (setup) {
      str = setup;
  }
  var result = str.match(/[?&]setup=([^&]*)/);
  if (result) {
      return result[1];
  } else {
      return "";
  }
}

var getPosition = function(design, board, piece, positions) {
  var ix = _.random(0, positions.length - 1);
  return positions[ix];
}

Dagaz.Model.getSetupRange = function() {
  return _.range(16, 47);
}

var setup = Dagaz.Model.setup;

Dagaz.Model.setup = function(board, init) {
  if (getSetup(init)) {
      setup(board, init);
      return;
  }
  var seed = getSeed();
  console.log("Seed: " + seed);
  Math.seedrandom(seed);
  var design = Dagaz.Model.design;
  var positions = Dagaz.Model.getSetupRange();
  if (!_.isUndefined(design.reserve)) {
      _.each(_.keys(design.reserve), function(type) {
          _.each(_.keys(design.reserve[type]), function(player) {
               var piece = Dagaz.Model.createPiece(+type, +player);
               for (var i = 0; i < design.reserve[type][player]; i++) {
                    var pos = getPosition(design, board, piece, positions);
                    board.setPiece(pos, piece);
                    positions = _.without(positions, pos);
               }
          });
      });
  }
}

})();
