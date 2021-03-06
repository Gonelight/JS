//Container
function Container() {
  this.id = "";
  this.className = "";
  this.htmlCode = "123";
}

Container.prototype.render = function() {
  return this.htmlCode;
}


//1
Container.prototype.remove = function() { 
  console.log(this);
  console.log(this.className);
  //var item = document.getElementById("menuID");
  //console.log(item);
  //item.remove();

  var item = document.getElementsByClassName("menu")[0];
  console.log(item);
  item.remove();
}

function Menu(myId, myClass, myItems) {
  Container.call(this);
  this.id = myId;
  this.className = myClass;
  this.items = myItems;//&
}

Menu.prototype = Object.create(Container.prototype);
Menu.prototype.constructor = Menu;

Menu.prototype.render = function() {
  var result = '<ul class="' + this.className + '" id="' + this.id + '">';
  for(var i = 0; i < this.items.length; i++) { 
    if(this.items[i] instanceof MenuItem) {
      result += this.items[i].render();     
    }
  }
  result += '</ul>'; 
  
  return result;
}

//MenuItem
function MenuItem(myHref, myLabel, mySubItems) {
  Container.call(this);
  this.className = 'menu-item';
  this.href = myHref;
  this.label = myLabel;
  this.subItems = mySubItems; //получаем список подпунктов
  this.subItemsString = ""; //сюда будем добавлять подпункты
  console.log(this.subItems);
}

MenuItem.prototype = Object.create(Container.prototype);
MenuItem.prototype.constructor = MenuItem;

MenuItem.prototype.render = function() {
  console.log(this.subItems);

  //2
  if (Array.isArray(this.subItems)) { //проверим, что есть подпункты
    for (var i in this.subItems) {
        this.subItemsString += this.subItems[i] + " "; //добавим подпункты в строку
        console.log("yea");
    } 
  } else {
        this.subItemsString = "Нет подпунктов"; //это для наглядности
  }

  return '<li class="' + this.className + '"><a href="' + this.href + '" >' + this.label + 
      '</a></li>' + this.subItemsString; //собираем всю строку
}