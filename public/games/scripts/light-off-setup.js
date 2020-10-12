(function() {

Dagaz.Model.setup = function(board) {
  var design = Dagaz.Model.design;
  _.each(design.allPositions(), function(pos) {
      var piece = board.getPiece(pos);
      if (piece !== null) {
          if (_.random(0, 100) < 50) {
              piece = piece.promote(+piece.type + 1);
              board.setPiece(pos, piece);
          }
      }
  });
}

})();
