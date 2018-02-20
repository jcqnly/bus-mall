'use strict';

//array of products
Product.allProducts = [];

//make an object of Bus Mall Products
function Product(name, filepath) {
  this.name = name;
  this.filepath = filepath;
  Product.allProducts.push(this);
}

//make new Product instances
new Product('bag', 'img/bag.jpg');
new Product('banana', 'img/banana.jpg');
new Product('bathroom', 'img/bathroom.jpg');
new Product('boots', 'img/boots.jpg');
new Product('breakfast', 'img/breakfast.jpg');
new Product('bubblegum', 'img/bubblegum.jpg');
new Product('chair', 'img/chair.jpg');
new Product('cthulhu', 'img/cthulhu.jpg');
new Product('dog-duck', 'img/dog-duck.jpg');
new Product('dragon', 'img/dragon.jpg');
new Product('pen', 'img/pen.jpg');
new Product('petSweep', 'img/pet-sweep.jpg');
new Product('scissors', 'img/scissors.jpg');
new Product('shark', 'img/shark.jpg');
new Product('sweep', 'img/sweep.png');
new Product('tauntaun', 'img/tauntaun.jpg');
new Product('unicorn', 'img/unicorn.jpg');
new Product('water-can', 'img/water-can.jpg');
new Product('wine-glass', 'img/wine-glass.jpg');
new Product('usb', 'img/usb.png');

var productPic = document.getElementById('product');
var productPic2 = document.getElementById('product2');
var productPic3 = document.getElementById('product3');
var counter = 0;
// var clicksPerPic = [];

//randomly display 1 of the pictures
function randomProductPicker() {
  var threeProducts = [];
  //counter to make remove eventhandler
  if(counter === 24) {
    productPic.removeEventListener('click', randomProductPicker);
    productPic2.removeEventListener('click', randomProductPicker);
    productPic3.removeEventListener('click', randomProductPicker);
  }
  //check for dupes within the trio
  var numbersMatch = true;
  while(numbersMatch) {
    for(var i = 0; i < 3; i++) {
      var randomProduct = Math.floor(Math.random() * Product.allProducts.length);
      threeProducts.push(randomProduct);
      console.table(threeProducts);
    }
    // console.log(Product.allProducts[randomProduct]);
    if(threeProducts[0] !== threeProducts[1] && threeProducts[1] !== threeProducts[2] && threeProducts[0] !== threeProducts[2]) {
      //Assign the src, alt, and title attribute to the img element
      productPic.src = Product.allProducts[threeProducts[0]].filepath;
      productPic.alt = Product.allProducts[threeProducts[0]].name;
      productPic.title = Product.allProducts[threeProducts[0]].name;
      
      productPic2.src = Product.allProducts[threeProducts[1]].filepath;
      productPic2.alt = Product.allProducts[threeProducts[1]].name;
      productPic2.title = Product.allProducts[threeProducts[1]].name;
      
      productPic3.src = Product.allProducts[threeProducts[2]].filepath;
      productPic3.alt = Product.allProducts[threeProducts[2]].name;
      productPic3.title = Product.allProducts[threeProducts[2]].name;
      numbersMatch = false;
    }
    threeProducts = [];
  }
  counter++;
}

randomProductPicker();

productPic.addEventListener('click', randomProductPicker);
productPic2.addEventListener('click', randomProductPicker);
productPic3.addEventListener('click', randomProductPicker);