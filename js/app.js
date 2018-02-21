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

  if(Product.counter > 24) {
    Product.container.removeEventListener('click', handleClick);
    Product.container.style.display = 'none';
    makeChart();
  }

  Product.counter += 1;
  for(var i = 0; i < Product.names.length; i++) {
    if(event.target.alt === Product.allProducts[i].name) {
      Product.allProducts[i].votes += 1;
    }
  }
  displayPics();
}

displayPics();
Product.container.addEventListener('click', handleClick );

//chart
function makeChart() {
  var votes = [];
  for(var i = 0; i < Product.allProducts.length; i++) {
    votes[i] = Product.allProducts[i].votes;
  }
  var ctx = document.getElementById("myChart").getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: Product.names,
      datasets: [{
        label: '# of Votes',
        data: votes,
        backgroundColor: [
          'rgb(250, 246, 8)',
          'rgb(250, 246, 8)',
          'rgb(250, 246, 8)',
          'rgb(250, 246, 8)',
          'rgb(250, 246, 8)',
          'rgb(250, 246, 8)'
        ],
        borderColor: [
          'rgb(78, 77, 6)',
          'rgb(78, 77, 6)',
          'rgb(78, 77, 6)',
          'rgb(78, 77, 6)',
          'rgb(78, 77, 6)',
          'rgb(78, 77, 6)'
        ],
        borderWidth: 2
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero:true
          }
        }]
      }
    }
  });
}

// console.log(event.target.alt + ' has ' + Product.allProducts[i].votes + ' votes in ' + Product.allProducts[i].views + 'views');
// function showList() {
//   for(var i = 0; i < Product.allProducts.length; i++) {
//     var liEl = document.createElement('li');
//     var conversion = (Product.allProducts[i].votes / Product.allProducts[i].views * 100).toFixed(1);
//     liEl.textContent = Product.allProducts[i].name + ' has ' + Product.allProducts[i].votes + ' votes in ' + Product.allProducts[i].views + ' views for a conversion rate of ' + conversion + '%';

//     if(conversion > 49) {
//       liEl.style.color = 'white';
//       liEl.style.backgroundColor = 'green';
//     }

//     if(conversion < 30) {
//       liEl.style.color = 'white';
//       liEl.style.backgroundColor = 'red';
//     }
//     Product.list.appendChild(liEl);
//   }
// }