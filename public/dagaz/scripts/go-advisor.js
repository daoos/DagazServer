(function() {

var SERVICE = "/api/";

var inProgress = false;
var result = null;

var showResult = function() {
  var view = Dagaz.Controller.app.view;
  var b = []; var s = [];
  for (var i = 0; i < result.length; i++) {
       var pos = Dagaz.Model.stringToPos(result[i].move);
       if (result[i].weight > 500) {
           b.push(pos);
       } else {
           s.push(pos);
       }
  }
  view.markPositions(5, b);
  view.markPositions(6, s);
}

Dagaz.AI.clearAdvisor = function() {
  var view = Dagaz.Controller.app.view;
  view.markPositions(5, []);
  view.markPositions(6, []);
}

Dagaz.AI.advisor = function(auth, sid, setup) {
  console.log('sid = ' + sid + ', setup = ' + setup);
  if (result !== null) {
      showResult();
      result = null;
      return true;
  }
  if (inProgress) return false;
  inProgress = true;
  $.ajax({
     url: SERVICE + "ai",
     type: "PUT",
     data: {
         sid: sid,
         setup: setup,
         variant_id: 2,
         coeff: 5
     },
     dataType: "json",
     beforeSend: function (xhr) {
         xhr.setRequestHeader('Authorization', 'Bearer ' + auth);
     },
     success: function(data) {
         if (data.length > 0) {
             result = data;
         }
         inProgress = false;
     },
     statusCode: {
        404: function() {
             result = null;
             inProgress = false;
        },
        500: function() {
             console.log('Auth: Internal Error!');
             window.location = '/';
        }
     }
  });
  return false;
}

})();
