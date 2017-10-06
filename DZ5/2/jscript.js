function Container() {
  this.id = '';
  this.className = '';
  this.htmlCode = '';
}

Container.prototype.render = function() {
  return this.htmlCode;
}

function OpinionsAll() {
  Container.call(this);  
  this.id = 'opinions';
  this.opinions = [];
  this.list();  
}

OpinionsAll.prototype = Object.create(Container.prototype);
OpinionsAll.prototype.constructor = OpinionsAll;

OpinionsAll.prototype.render = function() {

}

OpinionsAll.prototype.list = function() {

  $.get({
    url: 'feedback/list/json.txt',
    context: this,
    success: function(response) {

      if(response.result === 1) {
        for (var i in response.comments) {
          this.opinions[i] = response.comments[i];
        }
        for (var i in this.opinions) {
          var item = $('<div/>', {
          id: this.id + '_item'
        });
          item.text(this.opinions[i].id_comment + " " + this.opinions[i].text);
          $('#' + this.id).append(item);
        }
      }

      if(response.result === 0) {
        alert(response.error_message);
       }

    },
    dataType: 'json'
  })
}

function Opinion() {
  OpinionsAll.call(this);  
  this.userId;
  this.opinionID;
  this.userMessage;
}

Opinion.prototype = Object.create(OpinionsAll.prototype);
Opinion.prototype.constructor = Opinion;

Opinion.prototype.render = function() {

}

Opinion.prototype.add = function(idUser, text) {
  this.userID = idUser;
  this.userMessage = text;

  $.get({
    url: 'feedback/add/json.txt',
    context: this,
    success: function(response) {

      if(response.result === 1) {
        var item = $('<div/>', {
          id: this.id + '_item'
        });
        item.text(response.userMessage);
          $('#' + this.id).append(item);
      }

      if (response.result === 0) {  
        alert(response.error_message);
      }

    },
    dataType: 'json'
  })
}

Opinion.prototype.submit = function(idOpinion) { 
  this.opinionID = idOpinion; 
  $.get({
    url: 'feedback/submit/json.txt',
    context: this,
    success: function(response) {

      if(response.result === 1) {
        var message = $('<div/>', {
          id: 'message'
        });
        message.text("Отзыв " + this.opinionID + " одобрен");
        $('#' + this.id).append(message);
      }

      if (response.result === 0) {  
        alert(response.error_message);
      }  

    },
    dataType: 'json'
  })
}

Opinion.prototype.delete = function(idOpinion) {
  this.opinionID = idOpinion; 
  $.get({
    url: 'feedback/delete/json.txt',
    context: this,
    success: function(response) {

      if(response.result === 1) {      
        var message = $('<div/>', {
          id: 'message'
        });
        message.text("Отзыв " + this.opinionID + " удален");
        $('#' + this.id).append(message);
      }

      if (response.result === 0) {  
        alert(response.error_message);
      }

    },
    dataType: 'json'
  })
}