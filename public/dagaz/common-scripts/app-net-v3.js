(function() {

var WAIT_FRAME      = 100;
var GAME_OVER_DELAY = 2000;
var AI_WAIT         = 3000;

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

var isPressed = false;
var isOnce    = false;
var onceGameOver = true;

var inProgress = false;
var auth = null;
var uid = null;
var bot = null;
var player_num = null;
var setup = null;
var last_move = null;
var sid = null;
var turn = 1;
var netstamp = null;

function App(canvas) {
  this.canvas = canvas;
  this.state  = STATE.INIT;
  this.design = Dagaz.Model.getDesign();
  this.view   = Dagaz.View.getView();
  this.params = [];
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
      _.delay(gameOver, GAME_OVER_DELAY, text, this, player);
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

App.prototype.getTargets = function() {
  if (_.isUndefined(this.list)) return [];
      else return _.union(this.list.getStarts(), this.list.getStops());
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
  this.view.markPositions(Dagaz.View.markType.TARGET, this.list.getStops());
  this.view.markPositions(Dagaz.View.markType.CURRENT, this.list.getCurrent());
  this.canvas.style.cursor = "default";
  this.state = STATE.EXEC;
}

App.prototype.mouseLocate = function(view, positions) {
  if (positions.length != 1) return;
  var pos = positions[0];
  if ((_.isUndefined(this.currPos)) || (this.currPos != pos)) {
      if ((this.state == STATE.IDLE) && !_.isUndefined(this.list)) {
          if (_.intersection(this.getTargets(), positions).length > 0) {
              Canvas.style.cursor = "pointer";
          } else {
              Canvas.style.cursor = "default";
          }
      }
      if (isPressed && !_.isUndefined(this.list)) {
          this.list.markPosition(pos);
          this.view.markPositions(Dagaz.View.markType.TARGET, this.list.getStops());
          this.view.markPositions(Dagaz.View.markType.CURRENT, this.list.getCurrent());
      }
  }
  this.currPos = pos;
}

App.prototype.mouseUp = function(view, positions) {
  isPressed = false;
}

App.prototype.mouseDown = function(view, pos) {
  if ((this.state == STATE.IDLE) && !_.isUndefined(this.list)) {
      var positions = _.intersection(this.getTargets(), pos);
      if (positions.length > 0) {
          this.setPosition(positions[0]);
      }
  }
  isPressed = true;
}

App.prototype.mouseWheel = function(view, delta) {}

App.prototype.boardApply = function(move) {
  this.board = this.board.apply(move);
  if (!_.isUndefined(this.view.sync)) {
      this.view.sync(this.board);
  }
}

App.prototype.getBoard = function() {
  if (_.isUndefined(this.board)) {
      this.board = Dagaz.Model.getInitBoard();
      Dagaz.Model.Done(this.design, this.board);
  }
  return this.board;
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
         if (data.ai) {
             bot = data.ai;
         }
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
             window.location = '/';
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
  if (netstamp !== null) {
      if (Date.now() - netstamp < 1000) return;
      netstamp = null;
  } else {
      netstamp = Date.now();
  }
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

var acceptAlert = function() {
  if (auth === null) return;
  if (!sid) return;
  inProgress = true;
  $.ajax({
     url: SERVICE + "move/accept",
     type: "POST",
     data: {
         session_id: sid
     },
     dataType: "json",
     beforeSend: function (xhr) {
         xhr.setRequestHeader('Authorization', 'Bearer ' + auth);
     },
     success: function(data) {
         console.log('Accept: Succeed');
         inProgress = false;
     },
     error: function() {
         Dagaz.Controller.app.state = STATE.STOP;
         console.log('Accept: Error!');
     },
     statusCode: {
        401: function() {
             Dagaz.Controller.app.state = STATE.STOP;
             console.log('Accept: Bad User!');
        },
        500: function() {
             Dagaz.Controller.app.state = STATE.STOP;
             console.log('Accept: Internal Error!');
        }
     }
  });
}

var sendAlert = function(result) {
  if (auth === null) return;
  if (!sid) return;
  if (!uid) return;
  inProgress = true;
  $.ajax({
     url: SERVICE + "move/alert",
     type: "POST",
     data: {
         session_id: sid,
         uid: uid,
         result_id: result
     },
     dataType: "json",
     beforeSend: function (xhr) {
         xhr.setRequestHeader('Authorization', 'Bearer ' + auth);
     },
     success: function(data) {
         console.log('Alert: Succeed [' + result +']');
         inProgress = false;
     },
     error: function() {
         Dagaz.Controller.app.state = STATE.STOP;
         console.log('Alert: Error!');
     },
     statusCode: {
        401: function() {
             Dagaz.Controller.app.state = STATE.STOP;
             console.log('Alert: Bad User!');
        },
        500: function() {
             Dagaz.Controller.app.state = STATE.STOP;
             console.log('Alert: Internal Error!');
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
         acceptAlert();
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
         acceptAlert();
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

var drawGame = function() {
  if (auth === null) return;
  if (!uid) return;
  $.ajax({
     url: SERVICE + "session/close",
     type: "POST",
     data: {
         winner: uid,
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
         acceptAlert();
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

var getConfirmed = function() {
  var app = Dagaz.Controller.app;
  if (inProgress) return;
  if (netstamp !== null) {
      if (Date.now() - netstamp < 1000) return;
      netstamp = null;
  }
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
         inProgress = false;
         if (data.length == 1) {
             if (data[0].result_id) {
                 var player = app.design.playerNames[app.board.player];
                 var r = data[0].result_id;
                 if (r == 1) {
                     loseGame();
                     if (!_.isUndefined(Dagaz.Controller.play)) {
                         Dagaz.Controller.play(Dagaz.Sounds.lose);
                     }
                     app.state = STATE.DONE;
                     app.doneMessage = player + " won";
                     app.winPlayer   = app.board.player;
                     gameOver(app.doneMessage, app, app.winPlayer);
                 } else if (r == 2) {
                     winGame();
                     if (!_.isUndefined(Dagaz.Controller.play)) {
                         Dagaz.Controller.play(Dagaz.Sounds.win);
                     }
                     app.state = STATE.DONE;
                     app.doneMessage = player + " lose";
                     app.winPlayer   = -app.board.player;
                     gameOver(app.doneMessage, app, app.winPlayer);
                 } else {
                     if (confirm("Do you agree to a draw?")) {
                         drawGame();
                         if (!_.isUndefined(Dagaz.Controller.play)) {
                             Dagaz.Controller.play(Dagaz.Sounds.draw);
                         }
                         app.state = STATE.DONE;
                         app.doneMessage = "Draw";
                         app.winPlayer   = 0;
                         gameOver(app.doneMessage, app, app.winPlayer);
                     } else {
                         acceptAlert();
                     }
                 }
             } else {
                 last_move = data[0].move_str;
                 console.log('Confirmed: Succeed [move = ' + last_move + ']');
             }
         } else {
             netstamp = Date.now();
         }
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

var addMove = function(move, setup, id) {
  if (auth === null) return;
  if (!id) return;
  inProgress = true;
  var app = Dagaz.Controller.app;
  var design = app.design;
  $.ajax({
     url: SERVICE + "move",
     type: "POST",
     data: {
         uid: id,
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

Dagaz.Controller.resign = function() {
  if (uid && !confirm("Resign?")) return;
  loseGame();
}

Dagaz.Controller.drawOffer = function() {
  if (uid && !confirm("Draw Offer?")) return;
  if (bot === null) {
      sendAlert(3);
  } else {
      drawGame();
  }
}

App.prototype.getContext = function(player, forced) {
  if (_.isUndefined(this.context)) {
      this.context = [];
  }
  if (_.isUndefined(this.context[player])) {
      this.context[player] = Dagaz.AI.createContext(this.design);
  }
  return this.context[player];
}

App.prototype.getAI = function() {
  if (_.isUndefined(this.ai)) {
      this.ai = Dagaz.AI.findBot("random",  this.params, null);
      this.ai = Dagaz.AI.findBot("common",  this.params, this.ai);
      this.ai = Dagaz.AI.findBot("smart",   this.params, this.ai);
      this.ai = Dagaz.AI.findBot("opening", this.params, this.ai);
  }
  return this.ai;
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
          Dagaz.Model.Done(this.design, this.board);
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
             this.list = Dagaz.Model.getMoveList(this.board);
             var ko = [];
             if (!_.isUndefined(this.board.ko)) {
                 ko = this.board.ko;
             }
             this.view.markPositions(Dagaz.View.markType.KO, ko);
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
          var ctx = this.getContext(this.getBoard().player);
          var ai  = this.getAI();
          if ((ctx !== null) && (ai !== null) && (bot !== null)) {
              ai.setContext(ctx, this.board);
              Canvas.style.cursor = "wait";
              this.timestamp = Date.now();
              var player = this.design.playerNames[this.board.player];
              var result = this.getAI().getMove(ctx);
              if (result) {
                  if (result.move) {
                      console.log("Player: " + player);
                      result.move.applyAll(this.view);
                      this.boardApply(result.move);
                      var s = result.move.toString();
                      if (!_.isUndefined(Dagaz.Model.getSetup)) {
                          s = Dagaz.Model.getSetup(this.design, this.board);
                          console.log("Setup: " + s);
                      }
                      Dagaz.Model.Done(this.design, this.board);
                      addMove(result.move.toString(), s, bot);
                      this.move = result.move;
                      this.state = STATE.WAIT;
                  } else {
                      winGame();
                      this.gameOver(player + " lose", -this.board.player);
                      this.state = STATE.DONE;
                      return;
                  }
              }
          } else {
              this.state = STATE.BUZY;
              this.timestamp = Date.now();
          }
      }
  }
  if (this.state == STATE.BUZY) {
      this.board.generate(this.design);
      this.board.moves = Dagaz.Model.Determinate(this.board.moves);
      if (this.board.moves.length == 0) {
          this.state = STATE.DONE;
          Canvas.style.cursor = "default";
          if (!_.isUndefined(Dagaz.Controller.play)) {
              Dagaz.Controller.play(Dagaz.Sounds.win);
          }
          var player = this.design.playerNames[this.board.player];
          this.gameOver(player + " lose", -this.board.player);
          if (bot === null) {
              winGame();
          }
          return;
      }
      if (Dagaz.Model.isHidden) {
          var ko = [];
          if (!_.isUndefined(this.board.ko)) {
              ko = this.board.ko;
          }
          this.view.markPositions(Dagaz.View.markType.KO, ko);
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
      this.state = STATE.EXEC;
      last_move = null;
  }
  if (this.state == STATE.EXEC) {
      this.state = STATE.IDLE;
      if (!this.move.isPass()) {
          this.view.markPositions(Dagaz.View.markType.TARGET, []);
          this.view.markPositions(Dagaz.View.markType.CURRENT, []);
          if (Dagaz.Model.showMoves) {
              console.log(this.move.toString());
          }
          this.move.applyAll(this.view);
          this.boardApply(this.move);
          if (!_.isUndefined(this.list)) {
              var s = this.move.toString();
              if (!_.isUndefined(Dagaz.Model.getSetup)) {
                  s = Dagaz.Model.getSetup(this.design, this.board);
              }
              addMove(this.move.toString(), s, uid);
              delete this.list;
          }
          this.state = STATE.WAIT;
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
                  if (player_num == this.board.parent.player) {
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
                  if (player_num == this.board.parent.player) {
                      loseGame();
                      if (!_.isUndefined(Dagaz.Controller.play)) {
                          Dagaz.Controller.play(Dagaz.Sounds.lose);
                      }
                  } else {
                      winGame();
                      if (!_.isUndefined(Dagaz.Controller.play)) {
                          Dagaz.Controller.play(Dagaz.Sounds.win);
                      }
                  }
                  this.doneMessage = player + " lose";
                  this.winPlayer   = -this.board.parent.player;
              } else {
                  drawGame();
                  if (!_.isUndefined(Dagaz.Controller.play)) {
                      Dagaz.Controller.play(Dagaz.Sounds.draw);
                  }
                  this.doneMessage = "Draw";
                  this.winPlayer   = 0;
              }
              this.gameOver(this.doneMessage, this.winPlayer);
          }
      }
  }
}

Dagaz.Model.InitGame();
Dagaz.Controller.createApp(Canvas);

App.prototype.run = function() {
  var timestamp = Date.now();
  this.exec();
  var delta = Date.now() - timestamp;
  _.delay(function() {
     Dagaz.Controller.app.run();
  }, (delta > WAIT_FRAME) ? 0 : WAIT_FRAME - delta);
}

Dagaz.View.getView().init(Canvas, Dagaz.Controller.app);
Dagaz.Controller.app.run();

})();
