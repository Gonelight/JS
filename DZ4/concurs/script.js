function Hamburger(size, stuffing) {
  if (size == undefined || stuffing == undefined) {
    throw new HamburgerException(1);   
  }
  this.hamSize = size; //берем размер (это массив из цены и калорий)
  this.hamStuf = stuffing; //берем начинку (это массив из цены и калорий)
  this.hamStufName = "";
  this.hamTopsPriceCal = [0, 0]; //пока пустая цена и каллорийность для топпингов
  this.hamTops = []; //пустой массив для топпингов (цен и калорий)
  this.hamTopsNames = []; //пустой массив для имен топпингов    
}

  Hamburger.SIZE_SMALL = [50, 20];
  Hamburger.SIZE_LARGE = [100, 40];
  Hamburger.STUFFING_CHEESE = [10, 20];
  Hamburger.STUFFING_SALAD = [20, 5];
  Hamburger.STUFFING_POTATO = [15, 10];
  Hamburger.TOPPING_MAYO = [20, 5];
  Hamburger.TOPPING_SPICE = [15, 0];

Hamburger.prototype.addTopping = function (topping) {
  if (topping != Hamburger.TOPPING_MAYO && topping != Hamburger.TOPPING_SPICE) {
    throw new HamburgerException(2);   
  }
  else {
    if (this.hamTops.indexOf(topping) == -1) {
      this.hamTops.push(topping);
    } else {
      throw new HamburgerException(3); 
    }
  }
  return this.hamTops;
}

Hamburger.prototype.removeTopping = function (topping) {
  if (this.hamTops.indexOf(topping) != -1) {//если топпинг есть в добавленных
    this.hamTops.splice(this.hamTops.indexOf(topping), 1); //вырезаем лишний топпинг
  } else {
    throw new HamburgerException(4); 
  }
  return this.hamTops;
}

Hamburger.prototype.getToppings = function () {
  for (var i in this.hamTops) {
    if (this.hamTops[i] == Hamburger.TOPPING_MAYO) {
      this.hamTopsNames.push("mayonezik");
    }
    if (this.hamTops[i] == Hamburger.TOPPING_SPICE) {
      this.hamTopsNames.push("spice");
    }
    console.log("toppingi " + this.hamTopsNames);
  }
  return this.hamTopsNames;
}

Hamburger.prototype.getSize = function () {
  return this.hamSize == Hamburger.SIZE_LARGE ? "Big hamburger with" : "Small hamburger with";
}

Hamburger.prototype.getStuffing = function () {
  if (this.hamStuf == Hamburger.STUFFING_CHEESE) {
    this.hamStufName = "cheese and";
  } else if (this.hamStuf == Hamburger.STUFFING_SALAD) {
    this.hamStufName = "salad and";
  } else if (this.hamStuf == Hamburger.STUFFING_POTATO) {
    this.hamStufName = "potato and";
  }
  return this.hamStufName;
}

Hamburger.prototype.count = function(name) {  
  for (var i in this.hamTops) {
    this.hamTopsPriceCal[0] += this.hamTops[i][0]; //складываем цены
    this.hamTopsPriceCal[1] += this.hamTops[i][1]; //складываем каллории
    console.log(this.hamTopsPriceCal);
  }

  this.hamPrice = this.hamSize[0] + this.hamStuf[0] + this.hamTopsPriceCal[0]; //получаем цену
  this.hamCal = this.hamSize[1] + this.hamStuf[1] + this.hamTopsPriceCal[1]; // получаем калории
  
  return "<p>" + name + ". " + this.getSize() + " " + this.getStuffing() + " " + this.getToppings() + 
  '. Цена ' + this.hamPrice + '. Калории ' + this.hamCal + '. </p>';
}

function HamburgerException(event) {
  var message = [];
  switch (event) {
    case 1:
      message.push("size or stuffing undefined");
      console.log(message);
      break;
    case 2:
      message.push("invalid topping");
      console.log(message);
      break;
    case 3:
      message.push("topping already exists");
      console.log(message);
      break;
    case 4:
      message.push("no such topping");
      console.log(message);
      break;
  }
  return message;
}