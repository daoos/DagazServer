(function() {

var root   = null;
var curr   = null;
var top    = null;
var branch = 1;

Dagaz.Controller.init = function(setup, player) {
  root = {
      parent: null,
      turn:   0,
      branch: 0,
      player: player,
      setup:  setup,
      nodes:  []
  };
  curr = root;
  top = curr;
}

var findNode = function(turn) {
  var r = top;
  while (r !== null) {
      if (r.turn == turn) return r;
      r = r.parent;
  }
  return null;
}

var checkButtons = function() {
  if (curr.parent) {
      undo.style.display = "inline";
  } else {
      undo.style.display = "none";
  }
  if (curr.nodes.length) {
      redo.style.display = "inline";
  } else {
      redo.style.display = "none";
  }
}

Dagaz.Controller.addMoves = function(moves) {
  _.each(moves, function(move) {
      var node = findNode(move.turn_num - 1);
      if (node === null) return;
      var branch = 0;
      _.each(node.nodes, function(n) {
          if (n.branch <= branch) return;
          branch = n.branch;
      });
      if (move.branch_num <= branch) return;
      top = {
          parent: node,
          turn: move.turn_num,
          branch: move.branch_num,
          player: move.next_player,
          move: move.move_str,
          setup: move.setup_str,
          nodes:  []
      };
      node.nodes.push(top);   
  });
  checkButtons();
}

Dagaz.Controller.isStable = function(player) {
  return true;
}

Dagaz.Controller.undo = function() {
  if (!Dagaz.Controller.isBuzy()) return;
  var node = curr.parent;
  while (node.parent) {
      if (Dagaz.Controller.isStable(node.player)) break;
      node = node.parent;
  }
  if (!node) return false;
  curr = node;
  checkButtons();
  Dagaz.Controller.setup(node.setup, node.player);
  return true;
}

Dagaz.Controller.redo = function() {
  if (!Dagaz.Controller.isBuzy()) return;
  var node = null;
  _.each(curr.nodes, function(n) {
      if (n.branch > branch) return;
      if ((node !== null) && (node.branch >= n.branch)) return;
      node = n;
  });
  if (!node) return false;
  Dagaz.Controller.apply(node.move);
  curr = node;
  checkButtons();
  return true;
}

Dagaz.Controller.switch = function(move, setup, player) {
  var node = null; var mx = branch;
  _.each(curr.nodes, function(n) {
      if (n.branch > mx) mx = n.branch;
      if (n.move != move) return;
      node = n;
  });
  if (!node) {
      node = {
          parent: curr,
          turn: curr.turn + 1,
          branch: mx + 1,
          player: player,
          move: move,
          setup: setup,
          nodes:  []
      };
      curr.nodes.push(node);
      Dagaz.Controller.save(node.turn, node.move, node.setup, node.player, node.branch);
  }
  if (!node) return false;
  branch = node.branch
  curr = node;
  checkButtons();
  return true;
}

var DIR_NAMES   = {
    "PageUp":    "u",
    "PageDown":  "d"
};

var onkeyup = window.onkeyup;

window.onkeyup = function(event) {
  var name = DIR_NAMES[event.key];
  if (_.isUndefined(event.key)) {
      name = DIR_NAMES[event.keyIdentifier];
  }
  if (curr.parent && (name == 'd')) {
      Dagaz.Controller.undo();
  }
  if (curr.nodes.length && (name == 'u')) {
      Dagaz.Controller.redo();
  }
  if (onkeyup) {
      onkeyup(event);
  }
}

})();
