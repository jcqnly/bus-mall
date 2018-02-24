'use strict';

//array of products
Product.names = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];

Product.allProducts = [];
Product.viewed = []; //prevent duplicates
Product.counter = 0;

//DOM Access
Product.container = document.getElementById('container');
Product.pics = [
  document.getElementById('left'),
  document.getElementById('center'),
  document.getElementById('right'),
];
Product.list = document.getElementById('productList');

//make an object of Bus Mall Products
function Product(name, filepath) {
  this.name = name;
  this.filepath = filepath;
  this.votes = 0;
  this.views = 0;
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

function makeRandom() {
  return Math.floor(Math.random() * Product.names.length);
}

function displayPics() {
  while(Product.viewed.length < 6) {
    var random = makeRandom();
    while(!Product.viewed.includes(random)) {
      Product.viewed.push(random);
    }
  }
  for(var i = 0; i < 3; i++) {
    var temp = Product.viewed.shift();
    Product.pics[i].src = Product.allProducts[temp].filepath;
    Product.pics[i].alt = Product.allProducts[temp].name;
    Product.pics[i].title = Product.allProducts[temp].name;
    Product.allProducts[temp].views += 1;
  }
}

function handleClick(event) {
  if(event.target === Product.container) {
    return alert('click on an image');
  }
  Product.counter += 1;
  console.log(Product.counter);

  if(Product.counter > 24) {
    Product.container.removeEventListener('click', handleClick);
    Product.container.style.display = 'none';
    productList();
  }
  for(var i = 0; i < Product.names.length; i++) {
    if(event.target.alt === Product.allProducts[i].name) {
      Product.allProducts[i].votes += 1;
    }
  }
  displayPics();
}

function productList() {
  for(var i = 0; i < Product.allProducts.length; i++) {
    var liEl = document.createElement('li');
    liEl.textContent = Product.allProducts[i].name + ' has ' + Product.allProducts[i].views + ' views and ' + Product.allProducts[i].votes + ' votes at a rate of ' + Math.round((Product.allProducts[i].votes/Product.allProducts[i].views * 100)) + '%';
    Product.list.appendChild(liEl);
  }
}

displayPics();
Product.container.addEventListener('click', handleClick);