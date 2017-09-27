//Container
function Container() {
  this.id = "";
  this.className = "";
  this.htmlCode = "123";
}

Container.prototype.render = function() {
  return this.htmlCode;
}

function Gallery(myId, myClass, myImages) {
  Container.call(this);
  this.id = myId;
  this.className = myClass;
  this.images = myImages;  
}

Gallery.prototype = Object.create(Container.prototype);
Gallery.prototype.constructor = Gallery;

Gallery.prototype.render = function() {
  console.log(this.className);
  var result = '<div class="' + this.className + '" id="' + this.id + '">';
  for(var i = 0; i < this.images.length; i++) { 
    if(this.images[i] instanceof Image) {
      result += this.images[i].render();     
    }
  }
  result += '</div>'; 
  return result;
}

//Image
function Image(imageHref, imageBigHref, imageName) {
  Container.call(this);
  this.className = 'image';
  this.href = imageHref;
  this.bhref = imageBigHref;
  this.name = imageName; 
}

Image.prototype = Object.create(Container.prototype);
Image.prototype.constructor = Image;

Image.prototype.render = function() {
  var imgInfo = "<img class='" + this.className + "'" + " src='" + this.href + "'" + " alt='" + 
  this.imageName + "'>"

  return "<a href='" + this.bhref + "'>" + imgInfo + "</a>";
}