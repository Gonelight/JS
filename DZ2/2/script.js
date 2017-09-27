//Container
function Container() {
  this.id = "";
  this.className = "";
  this.htmlCode = "123";
}

Container.prototype.render = function() {}

//1
/*Container.prototype.remove = function() { 
  console.log(this);
  console.log(this.className);
  //var item = document.getElementById("menuID");
  //console.log(item);
  //item.remove();

  var item = document.getElementsByClassName("menu")[0];
  console.log(item);
  item.remove();
}*/

function Menu(myId, myClass, myItems) {
  Container.call(this);
  this.id = myId;
  this.className = myClass;
  this.items = myItems;
}

Menu.prototype = Object.create(Container.prototype);
Menu.prototype.constructor = Menu;

Menu.prototype.render = function() {
  var menuDiv = document.getElementById("menuID");
  var result = "";
  for(var i = 0; i < this.items.length; i++) { 
    if(this.items[i] instanceof MenuItem) {
      result += this.items[i].render();     
    }
  }
  //Выводим на страницу меню
  menuDiv.innerHTML = result;
}

//MenuItem
function MenuItem(myHref, myLabel, mySubItems) {
  Container.call(this);
  this.className = 'menu-item';
  this.href = myHref;
  this.label = myLabel;
  this.subItems = mySubItems; //получаем список подпунктов
  this.subItemsBlock = ""; //сюда будем добавлять подпункты
 // console.log(this.subItems);
}

MenuItem.prototype = Object.create(Container.prototype);
MenuItem.prototype.constructor = MenuItem;

MenuItem.prototype.render = function() {
 
   if (Array.isArray(this.subItems)) { //проверим, что есть подпункты
    for (var i in this.subItems) {
        this.subItemsBlock += "<li class='menuSubItem'>" + this.subItems[i] + "</li>"; //добавим подпункты в блок
    } 
  } else {
        this.subItemsBlock += ""; 
  }

  return "<div class='menuItemBlock'>" + '<li class="' + this.className + '"><a href="' + this.href + '" >' + this.label + 
      '</a></li>' + this.subItemsBlock + "</div>"; //собираем всю строку
}