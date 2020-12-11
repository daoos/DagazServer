(function() {

var STATE = {
    INIT: 0,
    IDLE: 1,
    WAIT: 2,
    BUZY: 3,
    EXEC: 4,
    MENU: 5,
    DONE: 6,
    STOP: 7
};

var SERVICE = "/api/";

var isDrag = false;
var passForced = 0;
var once = false;
var lastPosition = null;
var dropIndex = 0;
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

var getPieces = function(move) {
  var r = null;
  _.each(move.actions, function(a) {
      if ((a[0] !== null) && (a[1] !== null) && (a[2] !== null) && (a[2].length > 1)) {
           r = _.map(a[2], function(piece) {
                if (Dagaz.Model.remapPromote) {
                    return piece.changeOwner(1);
                } else {
                    return piece;
                }
           }); 
      }
  });
  return r;
}

App.prototype.clarify = function(move) {
  if (!_.isUndefined(this.selected) && _.isUndefined(Dagaz.Controller.SelectPiece)) {
      for (var i = 0; i < move.actions.length; i++) {
          if ((move.actions[i][0] !== null) && (move.actions[i][2] !== null) && (move.actions[i][2].length > 1)) {
               move.actions[i][2] = [ this.selected.changeOwner(this.board.player) ];
               break;
          }
      }
  }
  return move;
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
  var pieces = getPieces(this.move);
  if (pieces !== null) {
     var popup = this.view.findPopup(pieces.length);
     if (!_.isUndefined(Dagaz.Sounds) && !_.isUndefined(Dagaz.Sounds.popup)) {
         Dagaz.Controller.play(Dagaz.Sounds.popup);
     }
     this.view.openPopup(popup, pieces);
     this.stops = this.view.getPopupPositions(popup);
     this.state = STATE.MENU;
  } else {
     this.state = STATE.EXEC;
     this.view.markPositions(Dagaz.View.markType.CURRENT, [ pos ]);
  }
  Canvas.style.cursor = "default";
}

App.prototype.boardApply = function(move) {
  this.board = this.board.apply(move);
  if (!_.isUndefined(this.view.sync)) {
      this.view.sync(this.board);
  }
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
          if (!_.isUndefined(this.list) && (pos.length == 1) && (_.indexOf(this.getDrops(), pos[0]) >= 0)) {
              var pieces = this.list.getDropPieces(pos[0]);
              if ((pieces !== null) && (pieces.length > 0)) {
                  if (dropIndex >= pieces.length) {
                     if (Dagaz.Controller.cyclicDropIndex){
                         dropIndex = 0;
                     } else {
                         dropIndex = pieces.length - 1;
                     }
                  }
                  this.view.setDrops(pieces[dropIndex].toString(), [ pos[0] ]);
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
      if (this.state == STATE.MENU) {
          if (_.intersection(this.getStops(), pos).length > 0) {
              Canvas.style.cursor = "pointer";
          } else {
              Canvas.style.cursor = "move";
          }
      }
  }
  this.currPos = pos;
}

App.prototype.mouseDown = function(view, pos) {
  if (this.state == STATE.MENU) {
      var positions = _.intersection(this.getStops(), pos);
      if (positions.length > 0) {
          this.selected = this.view.getSelected(positions[0]);
          if (!_.isUndefined(this.list) && !_.isUndefined(Dagaz.Controller.SelectPiece)) {
              this.move = this.list.setPiece(this.selected.changeOwner(this.board.player));
          }
          if (this.selected === null) {
              delete this.selected;
          }
          delete this.stops;
          this.view.closePopup();
          this.state = STATE.EXEC;
      }
  }
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
                      var m = moves[0];
                      this.boardApply(m);
                      var s = m.toString();
                      if (!_.isUndefined(Dagaz.Model.getSetup)) {
                          s = Dagaz.Model.getSetup(this.design, this.board);
                      }
                      addMove(m.toString(), s, uid);
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
      if (Date.now() - netstamp < 5000) return;
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
  if (bot === null) {
      sendAlert(2);
  } else {
      loseGame();
  }
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
                      this.boardApply(result.move);
                      var s = result.move.toString();
                      if (!_.isUndefined(Dagaz.Model.getSetup)) {
                          s = Dagaz.Model.getSetup(this.design, this.board);
                          console.log("Setup: " + s);
                      }
                      Dagaz.Model.Done(this.design, this.board);
                      addMove(result.move.toString(), s, bot);
                      this.move = result.move;
                      this.state = STATE.EXEC;
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
              sendAlert(1);
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
          if (moves.length == 1) this.move = moves[0];
      }
      if (!this.move.isPass()) {
          this.move = this.clarify(this.move);
          if (!_.isUndefined(Dagaz.Model.PostProcessing)) {
              Dagaz.Model.PostProcessing(this.board, [this.move]);
          }
          this.view.markPositions(Dagaz.View.markType.TARGET, []);
          this.view.markPositions(Dagaz.View.markType.CURRENT, []);
          lastPosition = null;
          if (Dagaz.Model.showMoves) {
              console.log(this.move.toString());
          }
          this.move.applyAll(this.view);
          if (!_.isUndefined(this.list)) {
              this.view.markPositions(Dagaz.View.markType.CURRENT, [ this.move.getTarget() ]);
          }
          this.state = STATE.WAIT;
      }
      if (!_.isUndefined(this.list)) {
          if (this.list.isDone()) {
              this.view.markPositions(Dagaz.View.markType.CURRENT, []);
              var moves = this.list.filterDrops(this.list.getMoves(), dropIndex);
              delete this.list;
              this.view.clearDrops();
              if (moves.length > 0) {
                  var m = this.clarify(moves[0]);
                  delete this.selected;
                  if (!_.isUndefined(Dagaz.Model.PostProcessing)) {
                      Dagaz.Model.PostProcessing(this.board, [m]);
                  }
                  this.boardApply(m);
                  var s = m.toString();
                  if (!_.isUndefined(Dagaz.Model.getSetup)) {
                      s = Dagaz.Model.getSetup(this.design, this.board);
                  }
                  addMove(m.toString(), s, uid);
                  console.log("Debug: " + m.toString());
                  this.view.markPositions(Dagaz.View.markType.KO, []);
                  Dagaz.Model.Done(this.design, this.board);
              }
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
                  if (bot === null) {
                      sendAlert(1);
                  } else {
                      winGame();
                  }
                  if (!_.isUndefined(Dagaz.Controller.play)) {
                      Dagaz.Controller.play(Dagaz.Sounds.win);
                  }
                  this.doneMessage = player + " won";
                  this.winPlayer   = this.board.parent.player;
              } else if (g < 0) {
                  if (bot === null) {
                      sendAlert(2);
                  } else {
                      loseGame();
                  }
                  if (!_.isUndefined(Dagaz.Controller.play)) {
                      Dagaz.Controller.play(Dagaz.Sounds.lose);
                  }
                  this.doneMessage = player + " lose";
                  this.winPlayer   = -this.board.parent.player;
              } else {
                  if (bot === null) {
                      sendAlert(3);
                  } else {
                      drawGame();
                  }
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
