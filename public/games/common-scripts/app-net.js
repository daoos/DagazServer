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
var passForced = 0;
var once = false;
var onceGameOver = true;

var inProgress = false;
var auth = null;
var sid = null;
var uid = null;
var url = null;
var wait = false;
var won = false;

var getName = function() {
  var str = window.location.pathname.toString();
  var result = str.match(/\/([^.\/]+)\./);
  if (result) {
      return result[1];
  } else {
      return str;
  }
}

var getVar = function(name) {
  var result = name.match(/-(\d+)$/);
  if (result) {
      return result[1];
  } else {
      return null;
  }
}

var cutName = function(name, num) {
  return name.substr(0, name.length - num.length - 1);
}

var authorize = function() {
  if (auth !== null) return;
  inProgress = true;
  $.ajax({
     url: SERVICE + "auth/anonymous",
     type: "GET",
     dataType: "json",
     success: function(data) {
         auth = data.access_token;
         console.log('Auth: Succeed ' + auth);
         inProgress = false;
     },
     error: function() {
         Dagaz.Controller.app.state = STATE.STOP;
         alert('Auth: Error!');
     },
     statusCode: {
        401: function() {
             Dagaz.Controller.app.state = STATE.STOP;
             alert('Auth: Bad User!');
        },
        500: function() {
             Dagaz.Controller.app.state = STATE.STOP;
             alert('Auth: Internal Error!');
        }
     }
  });
}

var connect = function() {
  if (inProgress) return;
  if (auth === null) return;
  if (uid !== null) return;
  var name = getName();
  var num = getVar(name);
  if (num) {
      name = cutName(name, num);
  }
  inProgress = true;
  $.ajax({
     url: SERVICE + "session/anonymous",
     type: "POST",
     data: {
         filename: name,
         var_num: +num,
         player_num: 1
     },
     dataType: "json",
     beforeSend: function (xhr) {
         xhr.setRequestHeader('Authorization', 'Bearer ' + auth);
     },
     success: function(data) {
         sid = data.id;
         uid = data.uid;     
         console.log('Connect: Succeed [uid = ' + uid + ']');
         inProgress = false;
     },
     error: function() {
         Dagaz.Controller.app.state = STATE.STOP;
         alert('Connect: Error!');
     },
     statusCode: {
        401: function() {
             Dagaz.Controller.app.state = STATE.STOP;
             alert('Connect: Bad User!');
        },
        404: function() {
             Dagaz.Controller.app.state = STATE.STOP;
             alert('Connect: Not Found!');
        },
        500: function() {
             Dagaz.Controller.app.state = STATE.STOP;
             alert('Connect: Internal Error!');
        }
     }
  });
}

var addMove = function(id, move, setup) {
  if (inProgress) return;
  if (auth === null) return;
  if (id === null) return;
  inProgress = true;
  $.ajax({
     url: SERVICE + "move",
     type: "POST",
     data: {
         uid: id,
         move_str: move,
         setup_str: setup
     },
     dataType: "json",
     success: function(data) {
         console.log('Move: Succeed [move = ' + move + ']');
         inProgress = false;
     },
     error: function() {
         Dagaz.Controller.app.state = STATE.STOP;
         alert('Move: Error!');
     },
     statusCode: {
        404: function() {
             Dagaz.Controller.app.state = STATE.STOP;
             alert('Move: Not Found!');
        },
        500: function() {
             Dagaz.Controller.app.state = STATE.STOP;
             alert('Move: Internal Error!');
        }
     }
  });
}

var winGame = function(id) {
  if (inProgress) return;
  if (auth === null) return;
  if (id === null) return;
  inProgress = true;
  $.ajax({
     url: SERVICE + "session/close",
     type: "POST",
     data: {
         winner: id
     },
     dataType: "json",
     success: function(data) {
         wait = false;
         console.log('Close: Succeed');
         inProgress = false;
     },
     error: function() {
         Dagaz.Controller.app.state = STATE.STOP;
         alert('Close: Error!');
     },
     statusCode: {
        403: function() {
             Dagaz.Controller.app.state = STATE.STOP;
             alert('Close: Not Found!');
        },
        500: function() {
             Dagaz.Controller.app.state = STATE.STOP;
             alert('Close: Internal Error!');
        }
     }
  });
}

var getBonus = function() {
  if (auth === null) return;
  if (uid === null) return;
  if (url === null) return;
  inProgress = true;
  $.ajax({
     url: SERVICE + "bonus",
     type: "POST",
     data: {
         uid: uid
     },
     dataType: "json",
     success: function(data) {
         wait = false;
         won = false;
         url = url + "&bonus=" + data.bonus;
         console.log('Bonus: Succeed [' + data.bonus + "]");
         inProgress = false;
     },
     error: function() {
         Dagaz.Controller.app.state = STATE.STOP;
         alert('Close: Error!');
     },
     statusCode: {
        403: function() {
             Dagaz.Controller.app.state = STATE.STOP;
             alert('Close: Not Found!');
        },
        500: function() {
             Dagaz.Controller.app.state = STATE.STOP;
             alert('Close: Internal Error!');
        }
     }
  });
}

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
  if (_.isUndefined(this.params.AI_WAIT)) {
      this.params.AI_WAIT = 3000;
  }
  if (_.isUndefined(this.params.WAIT_FRAME)) {
      this.params.WAIT_FRAME = 100;
  }
  if (_.isUndefined(this.params.SHOW_TARGETS)) {
      this.params.SHOW_TARGETS = true;
  }
}

Dagaz.Controller.createApp = function(canvas) {
  if (_.isUndefined(Dagaz.Controller.app)) {
      Dagaz.Controller.app = new App(canvas);
  }
  return Dagaz.Controller.app;
}

Dagaz.Controller.newGame = function() {
  if (!_.isUndefined(Dagaz.Controller.clearGame)) {
      Dagaz.Controller.clearGame();
  }
  var str = window.location.toString();
  var result = str.match(/^([^?]+)/);
  if (result) {
      str = result[1];
  }
  window.location = str;
}

var win = function() {
   winGame(uid);
   url = "bonus.html?back=" + getName() + ".html";
   wait = true;
   won = true;
}

var lose = function() {
   window.location = "lose.html?back=" + getName() + ".html";
   wait = true;
}

var go = function() {
   if (url === null) return;
   window.location = url;
}

App.prototype.gameOver = function(text, player) {
  Dagaz.Controller.Done(this.board);
  this.view.markPositions(Dagaz.View.markType.KO, []);
  if (onceGameOver) {
      if ((player == 1) || (player == -2)) {
           _.delay(win, 1000);
      } else {
           _.delay(lose, 1000);
      }
      onceGameOver = false;
  }
}

App.prototype.done = function() {
  if (this.state != STATE.DONE) {
      this.state = STATE.STOP;
  } else {
      if (this.doneMessage) {
          this.gameOver(this.doneMessage, this.winPlayer);
      }
  }
}

App.prototype.clearPositions = function() {
  delete this.starts;
  delete this.stops;
  delete this.targets;
  delete this.drops;
  this.view.clearDrops();
}

App.prototype.setPosition = function(pos) {
  this.list.setPosition(pos);
  var moves = this.list.getMoves();
  if (this.list.canDone()  && (moves.length > 0)) {
      this.move = moves[0];
      this.state = STATE.EXEC;
      Canvas.style.cursor = "default";
      return;
  }
  if (this.list.getLevel() > 0) {
      if (this.params.SHOW_TARGETS) {
          var targets = this.list.getPositions();
          this.view.markPositions(Dagaz.View.markType.TARGET, targets);
      }
  }
  if (this.params.SHOW_ATTACKING) {
      var attacking = this.list.getAttacking();
      this.view.markPositions(Dagaz.View.markType.ATTACKING, attacking);
  }
}

App.prototype.mouseLocate = function(view, pos) {
  if (this.currPos != pos) {
      if ((this.state == STATE.IDLE) && !_.isUndefined(this.list) && !isDrag) {
          if (_.isUndefined(this.positions)) {
              this.positions = this.list.getPositions();
          }
          if (_.indexOf(this.positions, pos) >= 0) {
              Canvas.style.cursor = "pointer";
          } else {
              Canvas.style.cursor = "default";
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
  if (!_.isUndefined(Dagaz.Controller.addState)) {
      Dagaz.Controller.addState(move, this.board);
  }
}

App.prototype.mouseDown = function(view, pos) {
  if ((this.state == STATE.IDLE) && !_.isUndefined(this.list)) {
      if (this.list && this.positions && (_.indexOf(this.positions, pos) >= 0)) {
          Canvas.style.cursor = "move";
          this.setPosition(pos);
          isDrag = true;
      }
  }
  this.view.markPositions(Dagaz.View.markType.GOAL, []);
}

App.prototype.mouseUp = function(view, pos) {
  if ((this.state == STATE.IDLE) && !_.isUndefined(this.list)) {
      this.setPosition(pos);
      Canvas.style.cursor = "default";
  }
  isDrag = false;
}

App.prototype.mouseWheel = function(view, delta) {}

App.prototype.getAI = function() {
  if (_.isUndefined(this.ai)) {
      this.ai = null;
      if (this.design.isPuzzle()) {
          this.ai = Dagaz.AI.findBot("solver",  this.params, this.ai);
      } else {
          this.ai = Dagaz.AI.findBot("random",  this.params, this.ai);
          this.ai = Dagaz.AI.findBot("common",  this.params, this.ai);
          this.ai = Dagaz.AI.findBot("smart",   this.params, this.ai);
          this.ai = Dagaz.AI.findBot("opening", this.params, this.ai);
      }
  }
  return this.ai;
}

App.prototype.getBoard = function() {
  if (_.isUndefined(this.board)) {
      this.board = Dagaz.Model.getInitBoard();
      if (!_.isUndefined(Dagaz.Controller.addState)) {
          Dagaz.Controller.addState(Dagaz.Model.createMove(), this.board);
      }
      Dagaz.Model.Done(this.design, this.board);
  }
  return this.board;
}

App.prototype.getContext = function(player) {
  if ((player == 1) && !this.design.isPuzzle()) return null;
  if (_.isUndefined(this.context)) {
      this.context = [];
  }
  if (_.isUndefined(this.context[player])) {
      this.context[player] = Dagaz.AI.createContext(this.design);
  }
  return this.context[player];
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
      this.move = move;
      this.state = STATE.EXEC;
  }
}

App.prototype.exec = function() {
  this.view.configure();
  if (!_.isUndefined(Dagaz.Model.load) && (Dagaz.Controller.persistense == "session")) {
      var board = Dagaz.Model.getInitBoard();
      Dagaz.Model.load(board);
      delete Dagaz.Model.load;
  }
  this.view.draw(this.canvas);
  if (inProgress) return;
  authorize();
  if (auth === null) return;
  connect();
  if (uid === null) return;
  if (wait) return;
  if (won) {
      getBonus();
      wait = true;
      return;
  }
  if (url !== null) {
      go();
      return;
  }
  if (this.state == STATE.STOP) {
      this.state = STATE.IDLE;
      return;
  }
  if (this.state == STATE.IDLE) {
      var ctx = this.getContext(this.getBoard().player);
      var ai  = this.getAI();
      if ((ctx !== null) && (ai !== null)) {
         ai.setContext(ctx, this.board);
         this.state = STATE.BUZY;
         Canvas.style.cursor = "wait";
         this.timestamp = Date.now();
         once = true;
      } else {
         if (_.isUndefined(this.list)) {
             var player = this.design.playerNames[this.board.player];
             console.log("Player: " + player);
             if (!_.isUndefined(Dagaz.Model.getSetup)) {
                 console.log("Setup: " + Dagaz.Model.getSetup(this.design, this.board));
             }
             this.list  = Dagaz.Model.getMoveList(this.board);
             var ko = [];
             if (!_.isUndefined(this.board.ko)) {
                 ko = this.board.ko;
             }
             this.view.markPositions(Dagaz.View.markType.KO, ko);
             if (!_.isUndefined(this.move)) {
                 this.list.setLastMove(this.move);
             }
             if ((this.list.getMoves().length == 1) && this.list.getMoves()[0].isPass()) {
                  if (passForced >= this.design.getPlayersCount()) {
                      this.state = STATE.DONE;
                      Canvas.style.cursor = "default";
                      if (!_.isUndefined(Dagaz.Controller.play)) {
                          Dagaz.Controller.play(Dagaz.Sounds.draw);
                      }
                      this.gameOver("Draw", 0);
                  } else {
                      this.boardApply(this.list.getMoves()[0]);
                      this.state = STATE.IDLE;
                      delete this.list;
                      passForced++;
                  }
                  return;
             }
             passForced = 0;
             if (this.list.getMoves().length == 0) {
                 this.state = STATE.DONE;
                 Canvas.style.cursor = "default";
                 if (!_.isUndefined(Dagaz.Controller.play)) {
                     Dagaz.Controller.play(Dagaz.Sounds.lose);
                 }
                 this.gameOver(player + " lose", -this.board.player);
                 return;
             }
         }
      }
  }
  if (this.state == STATE.BUZY) {
      var ctx = this.getContext(this.board.player);
      var player = this.design.playerNames[this.board.player];
      var result = this.getAI().getMove(ctx);
      if (once) {
          console.log("Player: " + player);
          if (!_.isUndefined(Dagaz.Model.getSetup)) {
              console.log("Setup: " + Dagaz.Model.getSetup(this.design, this.board));
          }
          once = false;
      }
      if (result) {
          if (_.isUndefined(result.move)) {
              this.state = STATE.DONE;
              Canvas.style.cursor = "default";
              if (!_.isUndefined(Dagaz.Controller.play)) {
                  Dagaz.Controller.play(Dagaz.Sounds.win);
              }
              this.gameOver(player + " lose", -this.board.player);
              return;
          }
          if (result.done || (Date.now() - this.timestamp >= this.params.AI_WAIT)) {
              if (result.move.isPass()) {
                  if (passForced >= this.design.getPlayersCount()) {
                      this.state = STATE.DONE;
                      Canvas.style.cursor = "default";
                      if (!_.isUndefined(Dagaz.Controller.play)) {
                          Dagaz.Controller.play(Dagaz.Sounds.draw);
                      }
                      this.gameOver("Draw", 0);
                  } else {
                      this.boardApply(result.move);
                      this.state = STATE.IDLE;
                      delete this.list;
                      passForced++;
                      return;
                  }
              } else {
                  passForced = 0;
              }
              this.move  = result.move;
              this.state = STATE.EXEC;
          }
      }
  }
  if (this.state == STATE.EXEC) {
      this.view.markPositions(Dagaz.View.markType.TARGET, []);
      if (Dagaz.View.CLEAR_KO) {
          this.view.markPositions(Dagaz.View.markType.KO, []);
      }
      if (!_.isUndefined(this.list)) {
          this.list.done();
          this.view.markPositions(Dagaz.View.markType.ATTACKING, []);
          delete this.list;
      }
      if (Dagaz.Model.showMoves) {
          console.log(this.move.toString());
      }
      this.move.applyAll(this.view);
      this.boardApply(this.move);
      var s = this.move.toString();
      if (!_.isUndefined(Dagaz.Model.getSetup)) {
          s = Dagaz.Model.getSetup(this.design, this.board);
      }
      addMove(uid, this.move.toString(), s);
      if (!_.isUndefined(this.positions)) {
          delete this.positions;
      }
      var g = this.board.checkGoals(this.design, this.board.parent.player);
      if (g !== null) {
          var player = this.design.playerNames[this.board.parent.player];
          this.state = STATE.DONE;
          Canvas.style.cursor = "default";
          if (g > 0) {
              if (!_.isUndefined(Dagaz.Controller.play)) {
                  if (this.design.isPuzzle() || (this.board.parent.player == 1)) {
                      Dagaz.Controller.play(Dagaz.Sounds.win);
                  } else {
                      Dagaz.Controller.play(Dagaz.Sounds.lose);
                  }
              }
              this.doneMessage = player + " won";
              this.winPlayer   = this.board.parent.player;
              if (!_.isUndefined(Dagaz.Controller.play)) {
                  Dagaz.Controller.play(Dagaz.Sounds.win);
              }
          } else if (g < 0) {
              if (!_.isUndefined(Dagaz.Controller.play)) {
                  if (this.board.parent.player != 1) {
                     Dagaz.Controller.play(Dagaz.Sounds.win);
                  } else {
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
      } else {
          this.state = STATE.WAIT;
          if (!_.isUndefined(Dagaz.Controller.play)) {
              var sound = Dagaz.Sounds.move;
              if (!_.isUndefined(this.move.sound)) {
                  sound = this.move.sound;
              }
              Dagaz.Controller.play(sound);
          }
      }
  }
}

Dagaz.Model.InitGame();
Dagaz.Controller.app = Dagaz.Controller.createApp(Canvas);

if (!_.isUndefined(Dagaz.Controller.getSessionManager)) {
  Dagaz.Controller.getSessionManager(Dagaz.Controller.app);
}
if (!_.isUndefined(Dagaz.Controller.play)) {
  Dagaz.Controller.play(Dagaz.Sounds.start);
}

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
