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
Product.list = document.getElementById('productLists');

//make an object of Bus Mall Products
function Product(name, filepath) {
  this.name = name;
  this.filepath = filepath;
  this.votes = 0;
  this.views = 0;
  Product.allProducts.push(this);
}

function checkStorage() {
//check if there's anything in local storage AND ...
//localStorage.getItem('allOfProducts') instead of localStorage.allOfProducts - another way
  if(localStorage && localStorage.allOfProducts) {
    var stringifyProducts = localStorage.getItem('allOfProducts');
    Product.allProducts = JSON.parse(stringifyProducts);
  }
  else {
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
    //make new Product instances
  }
}

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
  // console.log(Product.counter);
  if(event.target === Product.container) {
    return alert('click on an image');
  }
  Product.counter += 1;
  console.log(Product.counter);
  for(var i = 0; i < Product.names.length; i++) {
    if(event.target.alt === Product.allProducts[i].name) {
      Product.allProducts[i].votes += 1;
    }
  }
  if(Product.counter >= 25) {
    Product.container.removeEventListener('click', handleClick);
    Product.container.style.display = 'none';
    makeChart();
    //stringify entire Product object
    localStorage.setItem('allOfProducts', JSON.stringify(Product.allProducts));
  }
  displayPics();
}

//chart
function makeChart() {
  // console.table(Product.allProducts);
  var votes = [];
  for(var i = 0; i < Product.allProducts.length; i++) {
    votes[i] = Product.allProducts[i].votes;
  }
  var ctx = document.getElementById('productChart').getContext('2d');
  Chart.defaults.global.defaultFontColor = 'rgb(16, 2, 65)';
  new Chart(ctx, {
    type: 'horizontalBar',
    data: {
      labels: Product.names,
      datasets: [{
        label: '# of Votes',
        data: votes,
        backgroundColor: 'rgb(250, 246, 8)',
        borderColor: 'rgb(78, 77, 6)',
        borderWidth: 2
      }]
    },
    options: {
      title: {
        fontSize: 20
      },
      legend: {
        labels: {
          fontColor: 'rgb(16, 2, 65)',
          fontSize: 20
        }
      },
      scales: {
        yAxes: [{
          ticks: {
            fontSize: 20
          }
        }],
        xAxes: [{
          ticks: {
            fontSize: 20,
            stepSize: 1
          }
        }]
      }
    }
  });
}
checkStorage();
displayPics();
Product.container.addEventListener('click', handleClick );