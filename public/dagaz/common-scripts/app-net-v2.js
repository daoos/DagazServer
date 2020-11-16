(function() {

var STATE = {
    INIT: 0,
    IDLE: 1,
    WAIT: 2,
    BUZY: 3,
    EXEC: 4,
    DONE: 5,
    STOP: 6
};

var SERVICE = "/api/";

var isDrag = false;
var lastPosition = null;
var determinated = null;
var dropIndex = 0;
var onceGameOver = true;

var inProgress = false;
var auth = null;
var uid = null;
var player_num = null;
var setup = null;
var last_move = null;
var sid = null;
var turn = 1;

function App(canvas, params) {
  this.design = Dagaz.Model.getDesign();
  this.canvas = canvas;
  this.view   = Dagaz.View.getView();
  this.state  = STATE.INIT;
  if (params) {
      this.params = params;
  } else {
      this.params = [];
  }
  if (_.isUndefined(this.params.WAIT_FRAME)) {
      this.params.WAIT_FRAME = 100;
  }
  if (_.isUndefined(this.params.SHOW_TARGETS)) {
      this.params.SHOW_TARGETS = true;
  }
  if (_.isUndefined(this.params.SHOW_ATTACKING)) {
      this.params.SHOW_ATTACKING = true;
  }
}

var gameOver = function(text, self, player) {
  if (!Dagaz.Model.silent || (player != 0)) {
      if (!_.isUndefined(Dagaz.Controller.clearGame)) {
          Dagaz.Controller.clearGame();
      }
      alert(text);
  }
}

App.prototype.gameOver = function(text, player) {
  Dagaz.Controller.Done(this.board);
  this.view.markPositions(Dagaz.View.markType.KO, []);
  if (onceGameOver) {
      _.delay(gameOver, 1000, text, this, player);
      onceGameOver = false;
  }
  if (this.board && Dagaz.Model.showLose) {
     var captured = [];
     _.each(this.design.allPositions(), function(pos) {
        var piece = this.board.getPiece(pos);
        if (piece !== null) {
            if ((player == 0) || 
                ((player < 0) && (piece.player == -player)) ||
                ((player > 0) && (piece.player != player))) {
                captured.push(pos);
            }
        }
     }, this);
     this.view.markPositions(Dagaz.View.markType.ATTACKING, captured);
  }
}

Dagaz.Controller.createApp = function(canvas) {
  if (_.isUndefined(Dagaz.Controller.app)) {
      Dagaz.Controller.app = new App(canvas);
  }
  return Dagaz.Controller.app;
}

App.prototype.done = function() {
  if ((this.state != STATE.DONE) && (this.state != STATE.INIT)) {
      this.state = STATE.STOP;
  } else {
      if (this.doneMessage) {
          this.gameOver(this.doneMessage, this.winPlayer);
      }
  }
}

App.prototype.getStarts = function() {
  if (_.isUndefined(this.starts)) {
      if (_.isUndefined(this.list)) {
          this.starts = [];
      } else {
          this.starts = this.list.getStarts();
      }
  }
  return this.starts;
}

App.prototype.getStops = function() {
  if (_.isUndefined(this.stops)) {
      if (_.isUndefined(this.list)) {
          this.stops = [];
      } else {
          this.stops = this.list.getStops();
      }
  }
  return this.stops;
}

App.prototype.getTargets = function() {
  if (_.isUndefined(this.targets)) {
      if (_.isUndefined(this.list)) {
          this.targets = [];
      } else {
          this.targets = this.list.getTargets();
      }
  }
  return this.targets;
}

App.prototype.getDrops = function() {
  if (_.isUndefined(this.list) || (Dagaz.Model.showDrops == 0)) {
      this.drops = [];
  } else {
      if (_.isUndefined(this.drops) || (this.drops.length == 0)) {
          this.drops = this.list.getDrops();
      }
  }
  return this.drops;
}

App.prototype.clearPositions = function() {
  delete this.starts;
  delete this.stops;
  delete this.targets;
  delete this.drops;
  this.view.clearDrops();
}

App.prototype.setPosition = function(pos) {
  this.move = this.list.setPosition(pos);
  this.clearPositions();
  if (this.params.SHOW_TARGETS) {
      this.view.markPositions(Dagaz.View.markType.TARGET, this.getTargets());
  }
  if (this.params.SHOW_ATTACKING && Dagaz.Model.showCaptures && _.isUndefined(Dagaz.Model.getMarked)) {
      this.view.markPositions(Dagaz.View.markType.ATTACKING, this.list.getCaptures());
  }
  this.state = STATE.EXEC;
  Canvas.style.cursor = "default";
  this.view.markPositions(Dagaz.View.markType.CURRENT, [ pos ]);
}

App.prototype.syncCaptures = function(move) {
  var m = Dagaz.Model.createMove(move.mode, move.sound);
  _.each(move.actions, function(a) {
      if ((a[0] !== null) && (a[1] === null)) {
          m.actions.push(a);
      }
  });
  m.applyAll(this.view);
}

App.prototype.mouseWheel = function(view, delta) {
  dropIndex += delta;
  if (dropIndex < 0) dropIndex = 0;
  var pos = this.currPos;
  this.currPos = -1;
  this.mouseLocate(view, pos);
}

App.prototype.mouseLocate = function(view, pos) {
  if (this.currPos != pos) {
      this.getDrops();
      if ((Dagaz.Model.showDrops == -1) || (!_.isUndefined(this.drops) && (Dagaz.Model.showDrops > 0) && (this.drops.length > Dagaz.Model.showDrops))) {
          if (!_.isUndefined(this.list) && (_.intersection(this.getDrops(), pos).length >= 0)) {
              var p = _.intersection(this.getDrops(), pos)[0];
              var pieces = this.list.getDropPieces(p);
              if (!_.isUndefined(Dagaz.View.getDropPieces)) {
                  pieces = Dagaz.View.getDropPieces(this.design, this.board, p);
              }
              if ((pieces !== null) && (pieces.length > 0)) {
                  if (dropIndex >= pieces.length) {
                     if (Dagaz.Controller.cyclicDropIndex){
                         dropIndex = 0;
                     } else {
                         dropIndex = pieces.length - 1;
                     }
                  }
                  this.view.setDrops(pieces[dropIndex].toString(), [p]);
              }
          } else {
              this.view.clearDrops();
          }
      }
      if ((this.state == STATE.IDLE) && !_.isUndefined(this.list)) {
          if (isDrag) {
              if (_.intersection(this.getStops(), pos).length > 0) {
                  Canvas.style.cursor = "pointer";
              } else {
                  Canvas.style.cursor = "move";
              }
          } else {
              if (_.intersection(this.getStarts(), pos).length > 0) {
                  Canvas.style.cursor = "pointer";
              } else {
                  Canvas.style.cursor = "default";
              }
          }
      }
      this.view.markPositions(Dagaz.View.markType.GOAL, []);
      if (!isDrag && !_.isUndefined(this.board)) {
          var piece = this.board.getPiece(pos);
          if (piece !== null) {
              var types = Dagaz.Model.getPieceTypes(piece, this.board);
              if (Dagaz.Model.showGoals) {
                  var positions = this.design.getGoalPositions(this.board.player, types);
                  this.view.markPositions(Dagaz.View.markType.GOAL, positions);
              }
          }
      }
  }
  this.currPos = pos;
}

App.prototype.boardApply = function(move) {
  this.board = this.board.apply(move);
  if (!_.isUndefined(this.view.sync)) {
      this.view.sync(this.board);
  }
}

App.prototype.mouseDown = function(view, pos) {
  this.view.markPositions(Dagaz.View.markType.GOAL, []);
  if ((this.state == STATE.IDLE) && !_.isUndefined(this.list)) {
      var positions = _.intersection(this.getTargets(), pos);
      if (positions.length == 0) {
          positions = _.intersection(this.getStops(), pos);
      }
      if (positions.length == 0) {
          positions = _.intersection(this.getStarts(), pos);
      }
      if (positions.length > 0) {
          Canvas.style.cursor = "move";
          this.setPosition(positions[0]);
          if (this.move && this.move.isPass() && (lastPosition == positions[0])) {
              if (this.list && this.list.canPass()) {
                  var moves = this.list.getMoves();
                  if (moves.length == 1) {
                      this.boardApply(moves[0]);
                      this.syncCaptures(moves[0]);
                      this.state = STATE.IDLE;
                      delete this.list;
                      this.view.clearDrops();
                      lastPosition = null;
                      if (_.isUndefined(Dagaz.Model.getMarked)) {
                          this.view.markPositions(Dagaz.View.markType.ATTACKING, []);
                      }
                      this.view.markPositions(Dagaz.View.markType.CURRENT, []);
                      this.view.markPositions(Dagaz.View.markType.TARGET, []);
                      return;
                  }
              }
          }
          lastPosition = positions[0];
          isDrag = true;
      }
  }
}

App.prototype.mouseUp = function(view, pos) {
  if ((this.state == STATE.IDLE) && !_.isUndefined(this.list) && Dagaz.Model.dragNdrop) {
      var positions = _.intersection(this.getTargets(), pos);
      if (positions.length > 0) {
          this.setPosition(positions[0]);
      }
  }
  Canvas.style.cursor = "default";
  isDrag = false;
}

App.prototype.getBoard = function() {
  if (_.isUndefined(this.board)) {
      this.board = Dagaz.Model.getInitBoard();
      Dagaz.Model.Done(this.design, this.board);
  }
  return this.board;
}

App.prototype.determinate = function(move) {
  var moves = move.determinate();
  determinated = null;
  if (moves.length > 1) {
      var promote = confirm("Promote piece?");
      if (promote) {
          move = moves[1];
      } else {
          move = moves[0];
      }
      determinated = move;
  }
  return move;
}

App.prototype.isReady = function() {
  return this.state == STATE.IDLE;
}

App.prototype.setBoard = function(board, isForced) {
  if (this.isReady() || isForced) {
      this.board = board;
      this.view.reInit(board);
      delete this.list;
      this.clearPositions();
      this.view.markPositions(Dagaz.View.markType.TARGET, []);
  }
}

App.prototype.setMove = function(move) {
  if (this.state == STATE.IDLE) {
      delete this.list;
      this.boardApply(move);
      Dagaz.Model.Done(this.design, this.board);
      this.move = move;
      this.state = STATE.EXEC;
  }
}

var getSid = function() {
  var str = window.location.search.toString();
  var result = str.match(/[?&]sid=([^&]*)/);
  if (result) {
      return result[1];
  } else {
      return null;
  }
}

var authorize = function() {
  if (auth !== null) return;
  auth = localStorage.getItem('myAuthToken');
  console.log(auth);
  if (!auth) {
      window.location = '/';
  }
}

var recovery = function() {
  if (auth === null) return;
  if (sid === null) return;
  if (setup !== null) return;
  if (uid !== null) return;
  inProgress = true;
  $.ajax({
     url: SERVICE + "session/recovery",
     type: "POST",
     data: {
         id: sid
     },
     dataType: "json",
     beforeSend: function (xhr) {
         xhr.setRequestHeader('Authorization', 'Bearer ' + auth);
     },
     success: function(data) {
         uid = data.uid;
         player_num = data.player_num;
         setup = data.last_setup;
         console.log('Recovery: Succeed [uid = ' + uid + ']');
         inProgress = false;
     },
     error: function() {
         Dagaz.Controller.app.state = STATE.STOP;
         console.log('Recovery: Error!');
     },
     statusCode: {
        401: function() {
             Dagaz.Controller.app.state = STATE.STOP;
             console.log('Recovery: Bad User!');
        },
        404: function() {
             Dagaz.Controller.app.state = STATE.STOP;
             console.log('Recovery: Not found!');
             window.location = '/';
        },
        500: function() {
             Dagaz.Controller.app.state = STATE.STOP;
             console.log('Recovery: Internal Error!');
        }
     }
  });
}

var watchMove = function() {
  if (inProgress) return;
  if (auth === null) return;
  if (sid === null) return;
  if (turn === null) return;
  inProgress = true;
  $.ajax({
     url: SERVICE + "move/all/" + sid + "/" + turn,
     type: "GET",
     dataType: "json",
     beforeSend: function (xhr) {
        xhr.setRequestHeader('Authorization', 'Bearer ' + auth);
     },
     success: function(data) {
         if (data.length > 0) {
             last_move = data[0].move_str;
             turn++;
             console.log('Watch Move: Succeed [move = ' + last_move + ']');
         }
         inProgress = false;
     },
     error: function() {
         Dagaz.Controller.app.state = STATE.STOP;
         console.log('Watch Move: Error!');
     },
     statusCode: {
        401: function() {
             Dagaz.Controller.app.state = STATE.STOP;
             console.log('Watch Move: Bad User!');
        },
        500: function() {
             Dagaz.Controller.app.state = STATE.STOP;
             console.log('Watch Move: Internal Error!');
        }
     }
  });
}

var getConfirmed = function() {
  if (inProgress) return;
  if (auth === null) return;
  if (!uid) return;
  if (last_move !== null) return;
  inProgress = true;
  $.ajax({
     url: SERVICE + "move/confirmed/" + uid,
     type: "GET",
     dataType: "json",
     beforeSend: function (xhr) {
        xhr.setRequestHeader('Authorization', 'Bearer ' + auth);
     },
     success: function(data) {
         if (data.length == 1) {
             last_move = data[0].move_str;
             console.log('Confirmed: Succeed [move = ' + last_move + ']');
         }
         inProgress = false;
     },
     error: function() {
         Dagaz.Controller.app.state = STATE.STOP;
         console.log('Confirmed: Error!');
         window.location = '';
     },
     statusCode: {
        401: function() {
             Dagaz.Controller.app.state = STATE.STOP;
             console.log('Confirmed: Bad User!');
             window.location = '/';
        },
        404: function() {
             Dagaz.Controller.app.state = STATE.STOP;
             console.log('Confirmed: Not Found!');
             window.location = '/';
        },
        500: function() {
             Dagaz.Controller.app.state = STATE.STOP;
             console.log('Confirmed: Internal Error!');
        }
     }
  });
}

var addMove = function(move, setup) {
  if (auth === null) return;
  if (!uid) return;
  inProgress = true;
  var app = Dagaz.Controller.app;
  var design = app.design;
  $.ajax({
     url: SERVICE + "move",
     type: "POST",
     data: {
         uid: uid,
         next_player: design.currPlayer(app.board.turn),
         move_str: move,
         setup_str: setup
     },
     dataType: "json",
     beforeSend: function (xhr) {
         xhr.setRequestHeader('Authorization', 'Bearer ' + auth);
     },
     success: function(data) {
         console.log('Move: Succeed [move = ' + move + ']');
         inProgress = false;
     },
     error: function() {
         Dagaz.Controller.app.state = STATE.STOP;
         console.log('Move: Error!');
     },
     statusCode: {
        401: function() {
             Dagaz.Controller.app.state = STATE.STOP;
             console.log('Move: Bad User!');
        },
        404: function() {
             Dagaz.Controller.app.state = STATE.STOP;
             console.log('Move: Not Found!');
        },
        500: function() {
             Dagaz.Controller.app.state = STATE.STOP;
             console.log('Move: Internal Error!');
        }
     }
  });
}

var winGame = function() {
  if (auth === null) return;
  if (!uid) return;
  $.ajax({
     url: SERVICE + "session/close",
     type: "POST",
     data: {
         winner: uid
     },
     dataType: "json",
     beforeSend: function (xhr) {
         xhr.setRequestHeader('Authorization', 'Bearer ' + auth);
     },
     success: function(data) {
         console.log('Close: Succeed');
         inProgress = false;
         this.state = STATE.STOP;
     },
     error: function() {
         Dagaz.Controller.app.state = STATE.STOP;
         console.log('Close: Error!');
     },
     statusCode: {
        401: function() {
             Dagaz.Controller.app.state = STATE.STOP;
             console.log('Close: Bad User!');
        },
        403: function() {
             Dagaz.Controller.app.state = STATE.STOP;
             console.log('Close: Not Found!');
        },
        500: function() {
             Dagaz.Controller.app.state = STATE.STOP;
             console.log('Close: Internal Error!');
        }
     }
  });
}

var loseGame = function() {
  if (auth === null) return;
  if (!uid) return;
  $.ajax({
     url: SERVICE + "session/close",
     type: "POST",
     data: {
         loser: uid
     },
     dataType: "json",
     beforeSend: function (xhr) {
         xhr.setRequestHeader('Authorization', 'Bearer ' + auth);
     },
     success: function(data) {
         console.log('Close: Succeed');
         inProgress = false;
         this.state = STATE.STOP;
     },
     error: function() {
         Dagaz.Controller.app.state = STATE.STOP;
         console.log('Close: Error!');
     },
     statusCode: {
        401: function() {
             Dagaz.Controller.app.state = STATE.STOP;
             console.log('Close: Bad User!');
        },
        403: function() {
             Dagaz.Controller.app.state = STATE.STOP;
             console.log('Close: Not Found!');
        },
        500: function() {
             Dagaz.Controller.app.state = STATE.STOP;
             console.log('Close: Internal Error!');
        }
     }
  });
}

App.prototype.exec = function() {
  this.view.configure();
  this.view.draw(this.canvas);
  if (this.state == STATE.STOP) {
      this.state = STATE.IDLE;
      return;
  }
  if (this.state == STATE.INIT) {
      if (inProgress) return;
      authorize();
      if (auth === null) return;
      if (sid === null) {
          sid = getSid();
          if (sid === null) {
              window.location = '/';
          }
      }
      recovery();
      if (setup && uid) {
          Dagaz.Model.setup(this.board, setup);
          this.view.reInit(this.board);
          setup = null;
      }
      if (player_num === null) return;
      this.state = STATE.IDLE;
  }
  if (this.state == STATE.IDLE) {
      if (player_num == this.board.player) {
          if (_.isUndefined(this.list)) {
              var player = this.design.playerNames[this.board.player];
              console.log("Player: " + player);
              if (!_.isUndefined(Dagaz.Model.getSetup)) {
                  console.log("Setup: " + Dagaz.Model.getSetup(this.design, this.board));
              }
              if (!Dagaz.Controller.noDropIndex) {
                  dropIndex = 0;
              }
              this.list = Dagaz.Model.getMoveList(this.board);
              var ko = [];
              if (!_.isUndefined(this.board.ko)) {
                  ko = this.board.ko;
              }
              this.view.markPositions(Dagaz.View.markType.KO, ko);
              if (!_.isUndefined(Dagaz.Model.getMarked)) {
                  this.view.markPositions(Dagaz.View.markType.ATTACKING, Dagaz.Model.getMarked(this.list));
              } else {
                  if (this.params.SHOW_ATTACKING && Dagaz.Model.showCaptures) {
                      this.view.markPositions(Dagaz.View.markType.ATTACKING, this.list.getCaptures());
                  }
              }
              var drops = this.getDrops();
              if ((Dagaz.Model.showDrops == -2) || (!_.isUndefined(this.drops) && (Dagaz.Model.showDrops > 0) && (this.drops.length <= Dagaz.Model.showDrops))) {
                  if (drops.length > 0) {
                      var pieces = this.list.getDropPieces(drops[0]);
                      if ((pieces !== null) && (pieces.length > 0)) {
                          if (dropIndex >= pieces.length) {
                              if (Dagaz.Controller.cyclicDropIndex){
                                  dropIndex = 0;
                              } else {
                                  dropIndex = pieces.length - 1;
                              }
                          }
                          this.view.setDrops(pieces[dropIndex].toString(), drops);
                      }
                  }
                  this.view.invalidate();
              }
              if (this.list.isEmpty()) {
                  this.state = STATE.DONE;
                  Canvas.style.cursor = "default";
                  if (!_.isUndefined(Dagaz.Controller.play)) {
                      Dagaz.Controller.play(Dagaz.Sounds.lose);
                  }
                  loseGame();
                  this.gameOver(player + " lose", -this.board.player);
                  return;
              }
          }
      } else {
          this.state = STATE.BUZY;
          this.timestamp = Date.now();
      }
  }
  if (this.state == STATE.BUZY) {
      this.board.generate(this.design);
      if (this.board.moves.length == 0) {
          this.state = STATE.DONE;
          Canvas.style.cursor = "default";
          if (!_.isUndefined(Dagaz.Controller.play)) {
              Dagaz.Controller.play(Dagaz.Sounds.win);
          }
          var player = this.design.playerNames[this.board.player];
          this.gameOver(player + " lose", -this.board.player);
          return;
      }
      if (uid) {
          getConfirmed();
      } else {
          watchMove();
      }
      if (last_move === null) return;
      this.move = null;
      _.each(this.board.moves, function(move) {
          if (move.toString() == last_move) {
              this.move = move;
          }
      }, this);
      if (this.move === null) {
          this.state = STATE.STOP;
          console.log('Buzy: Bad move [' + last_move + ']');
      }
      var player = this.design.playerNames[this.board.player];
      console.log("Player: " + player);
      if (!_.isUndefined(Dagaz.Model.getSetup)) {
          console.log("Setup: " + Dagaz.Model.getSetup(this.design, this.board));
      }
      this.boardApply(this.move);
      Dagaz.Model.Done(this.design, this.board);
      this.state = STATE.EXEC;
      last_move = null;
  }
  if (this.state == STATE.EXEC) {
      this.state = STATE.IDLE;
      isDrag = false;
      if (!_.isUndefined(this.list) && this.list.isDone()) {
          var moves = this.list.filterDrops(this.list.getMoves(), dropIndex);
          if ((moves.length == 1) && (moves[0].isDropMove())) this.move = moves[0];
      }
      if (!this.move.isPass()) {
          if (Dagaz.View.CLEAR_KO) {
              this.view.markPositions(Dagaz.View.markType.KO, []);
          }
          this.view.markPositions(Dagaz.View.markType.TARGET, []);
          this.view.markPositions(Dagaz.View.markType.CURRENT, []);
          lastPosition = null;
          if (Dagaz.Model.showMoves) {
              console.log(this.move.toString());
          }
          this.move = this.determinate(this.move);
          this.move.applyAll(this.view);
          if (!_.isUndefined(this.list)) {
              this.view.markPositions(Dagaz.View.markType.CURRENT, [ this.move.getTarget() ]);
          }
          this.state = STATE.WAIT;
      }
      if (!_.isUndefined(this.list)) {
          if (this.list.isDone() || (Dagaz.Model.completePartial && !this.move.isPass())) {
              this.view.markPositions(Dagaz.View.markType.CURRENT, []);
              var moves = this.list.filterDrops(this.list.getMoves(), dropIndex);
              delete this.list;
              this.view.clearDrops();
              var m = this.move;
              if (!Dagaz.Model.completePartial && ((moves.length > 0) || (determinated !== null))) {
                  m = moves[0];
                  if (determinated !== null) {
                      m.clarify(determinated);
                      determinated = null;
                  }
              }
              this.boardApply(m);
              var s = null;
              if (!_.isUndefined(Dagaz.Model.getSetup)) {
                  s = Dagaz.Model.getSetup(this.design, this.board);
              }
              addMove(m.toString(), s);
              Dagaz.Model.Done(this.design, this.board);
              console.log("Debug: " + m.toString());
              this.view.markPositions(Dagaz.View.markType.KO, []);
          }
      }
      if (!this.move.isPass()) {
          if (!_.isUndefined(Dagaz.Controller.play)) {
              var sound = Dagaz.Sounds.move;
              if (!_.isUndefined(this.move.sound)) {
                  sound = this.move.sound;
              }
              Dagaz.Controller.play(sound, this.board.player);
          }
      }
      if (this.board.parent !== null) {
          var g = this.board.checkGoals(this.design, this.board.parent.player);
          if (g !== null) {
              var player = this.design.playerNames[this.board.parent.player];
              this.state = STATE.DONE;
              Canvas.style.cursor = "default";
              if (g > 0) {
                  if (this.board.parent.player == 1) {
                      winGame();
                      if (!_.isUndefined(Dagaz.Controller.play)) {
                          Dagaz.Controller.play(Dagaz.Sounds.win);
                      }
                  } else {
                      loseGame();
                      if (!_.isUndefined(Dagaz.Controller.play)) {
                          Dagaz.Controller.play(Dagaz.Sounds.lose);
                      }
                  }
                  this.doneMessage = player + " won";
                  this.winPlayer   = this.board.parent.player;
              } else if (g < 0) {
                  if (this.board.parent.player != 1) {
                      winGame();
                      if (!_.isUndefined(Dagaz.Controller.play)) {
                          Dagaz.Controller.play(Dagaz.Sounds.win);
                      }
                  } else {
                      loseGame();
                      if (!_.isUndefined(Dagaz.Controller.play)) {
                          Dagaz.Controller.play(Dagaz.Sounds.lose);
                      }
                  }
                  this.doneMessage = player + " lose";
                  this.winPlayer   = -this.board.parent.player;
              } else {
                  if (!_.isUndefined(Dagaz.Controller.play)) {
                      Dagaz.Controller.play(Dagaz.Sounds.draw);
                  }
                  this.doneMessage = "Draw";
                  this.winPlayer   = 0;
              }
          }
     }
  }
}

Dagaz.Model.InitGame();
Dagaz.Controller.app = Dagaz.Controller.createApp(Canvas);

App.prototype.run = function() {
  var timestamp = Date.now();
  this.exec();
  var delta = Date.now() - timestamp;
  _.delay(function() {
     Dagaz.Controller.app.run();
  }, (delta > this.params.WAIT_FRAME) ? 0 : this.params.WAIT_FRAME - delta);
}

Dagaz.Controller.app.view.init(Dagaz.Controller.app.canvas, Dagaz.Controller.app);
Dagaz.Controller.app.run();

})();
