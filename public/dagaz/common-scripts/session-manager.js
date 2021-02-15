(function() {

var root = null; // Дерево состояний
var curr = null; // Текущий узел
var branch = 1;  // Текущий бранч (меньший или равный)

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
}

var findNode = function(turn) {
  var r = curr;
  while (r !== null) {
      if (r.turn == turn) return r;
      r = r.parent;
  }
  return null;
}

// TODO: Кнопки перемотки в начало и конец (и кнопка включения анимации)
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

// TODO: Автоматическая анимация ходов полученных в текущий узел
Dagaz.Controller.addMoves = function(moves) {
  _.each(moves, function(move) {
      var node = findNode(move.turn_num - 1);
      if (node === null) return;
      var branch = 0;
      _.each(node.nodes, function(n) {
          if (n.branch <= branch) return;
          branch = n.branch;
      });
      // Добавить branch_num
      if (move.branch_num <= branch) return;
      nodes.push({
          parent: node,
          turn: move.turn_num,
          branch: move.branch_num, // TODO: Добавить
          player: move.next_player,
          move: move.move_str,
          setup: move.setup_str,
          nodes:  []
      });   
  });
  checkButtons();
}

// TODO: Переопределить в app
// true - если коалиция или режим разбора партии
Dagaz.Controller.isStable = function(player) {
  return true;
}

// TODO: Согласование отката
Dagaz.Controller.undo = function() {
  var node = curr.parent;
  while (node.parent) {
      // Если перемотка может быть завершена на этом игроке
      if (Dagaz.Controller.isStable(node.player)) break;
      node = node.parent;
  }
  if (!node) return false;
  curr = node;
  checkButtons();
  // TODO: Определить в app (установка состояния игры)
  Dagaz.Controller.setup(node.setup, node.player);
  return true;
}

Dagaz.Controller.redo = function() {
  var node = null;
  _.each(curr.nodes, function(n) {
      if (n.branch > branch) return;
      if ((node !== null) && (node.branch >= n.branch)) return;
      node = n;
  });
  if (!node) return false;
  // TODO: Определить в app (воспроизведение хода)
  Dagaz.Controller.apply(node.move);
  curr = node;
  checkButtons();
  return true;
}

// Переключиться на branch хода
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
      // TODO: Сохранить новый branch в БД
      Dagaz.Controller.save(node.turn, node.move, node.setup, node.player, node.branch);
  }
  if (!node) return false;
  branch = node.branch
  curr = node;
  checkButtons();
  return true;
}

})();
