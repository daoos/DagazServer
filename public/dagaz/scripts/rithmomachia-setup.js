(function() {

var checkVersion = Dagaz.Model.checkVersion;

Dagaz.Model.checkVersion = function(design, name, value) {
  if (name != "rithmomachia-setup") {
      checkVersion(design, name, value);
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

var setup = Dagaz.Model.setup;

Dagaz.Model.setup = function(board, init) {
  if (getSetup(init)) {
      setup(board, init);
      return;
  }
  var design = Dagaz.Model.design;
  _.each(design.allPositions(), function(pos) {
      var piece = board.getPiece(pos);
      if (piece === null) return;
      if (piece.type == 93) {
          piece = piece.setValue(0, 0)   // C1
                       .setValue(1, 2)   // C4
                       .setValue(2, 16)  // T9
                       .setValue(3, 17)  // T16
                       .setValue(4, 33)  // S25
                       .setValue(5, 34); // S36
          board.setPiece(pos, piece);
      }
      if (piece.type == 111) {
          piece = piece.setValue(0, 5)   // C16
                       .setValue(1, 19)  // T25
                       .setValue(2, 27)  // T36
                       .setValue(3, 41)  // S49
                       .setValue(4, 42); // S64
          board.setPiece(pos, piece);
      }
  });
}

})();
