function Container() {
  this.id = '';
  this.className = '';
  this.htmlCode = '';
}

Container.prototype.render = function() {
  return this.htmlCode;
}

function Basket() {
  Container.call(this);  
  this.id = 'basket';
  this.countGoods = 0;
  this.amount = 0;  
  this.basket_items = [];  
  this.retreive();
}

Basket.prototype = Object.create(Container.prototype);
Basket.prototype.constructor = Basket;

Basket.prototype.render = function() {
  var basketItems = $('<div/>', {
    id: this.id + '_items'
  });
  $('#' + this.id).append(basketItems);
}

Basket.prototype.retreive = function() {  
  $.get({
    url: 'basket/get/json.txt',
    context: this,
    success: function(response) {

      if(response.result === 1) {
        this.countGoods = response.basket.length;
        this.basket_items = response.basket;
        this.amount = response.amount;
        var basketData = $('<div/>', {
          id: 'basket_data'
        });    
        var basketDetails = $('<div/>', {
          id: 'basket_details'
        });
           
        $('#' + this.id).append(basketData);
        $('#' + this.id).append(basketDetails);
        this.refresh();
      }

      if(response.result === 0) {
        alert(response.error_message);
      }

    },
    dataType: 'json'
  })
}

Basket.prototype.add = function(idProduct, quantity) {
  $.get({
    url: 'basket/add/json.txt',
    context: this,
    success: function(response) {

      if(response.result === 1) {
        var itemPrice;
        for (var i in response.items) {
          if (response.items[i].id_product == idProduct) {
            itemPrice = response.items[i].price;
            break;
          }
        }
        this.countGoods += quantity;
        this.amount += itemPrice * quantity;

        //если товар добавлялся, увеличим колво, если не добавлялся, добавим в массив
        for (var i in this.basket_items) {
          if (this.basket_items[i].id_product == idProduct) {
            this.basket_items[i].quantity += quantity;            
            break;
          } else if (i == this.basket_items.length - 1) {
            this.basket_items.push({
              id_product: idProduct,
              price: itemPrice,
              quantity: quantity
            });
          }
        }

        if (this.basket_items.length == 0) {
            this.basket_items.push({
              id_product: idProduct,
              price: itemPrice,
              quantity: quantity
            });
        }
        this.refresh();
      }

      if(response.result === 0) {
        alert(response.error_message);
      }

    },
    dataType: 'json'
  })
}

Basket.prototype.delete = function(idProduct, quantity) {
  $.get({
    url: 'basket/add/json.txt',
    context: this,
    success: function(response) {

      if(response.result === 1) {
        //если товара >1 уменьшим колво, если 1 уберем из корзины
        for (var i in this.basket_items) {
          if (this.basket_items[i].id_product == idProduct) {
            this.basket_items[i].quantity -= quantity;
            this.countGoods -= quantity;
            this.amount -= this.basket_items[i].price * quantity;
            if (this.basket_items[i].quantity == 0) {
              this.basket_items.splice(i, 1);
            }
            break;
          } else if (i == this.basket_items.length - 1) {
            alert("Такого товара нет в корзине");
          }
        }

        if (this.basket_items.length == 0) {
           alert("Корзина пуста");
        }
        this.refresh();
      }

      if(response.result === 0) {
        alert(response.error_message);
      }

    },
    dataType: 'json'
  })
}

Basket.prototype.refresh = function() {
  var basketData = $('#basket_data');
  var basketDetails = $('#basket_details');
  basketData.empty();
  basketDetails.empty();
  basketData.text('Товаров в корзине на общую сумму - ' + this.amount + ' рублей');
  for (var i in this.basket_items) {
    var item = $('<div/>', {
      id: 'basket_item'
    });
    if (this.basket_items[i].quantity == undefined) {
      this.basket_items[i].quantity = 1;
    }
    item.text('Товар с id ' + this.basket_items[i].id_product + " по цене " + this.basket_items[i].price + 
      ' рублей' + ' в количестве ' + this.basket_items[i].quantity);      
    $('#basket_details').append(item);
  }  
}

