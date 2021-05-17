var faker = require('faker');

var database = { products: [] };

for (var i = 1; i <= 300; i++) {
  database.products.push({
    id: i,
    name: faker.commerce.productName(),
    description: faker.lorem.sentences(2),
    price: faker.commerce.price(1, 1000),
    quantity: faker.datatype.number(100),
    discount: faker.datatype.number(100),
  });
}

console.log(JSON.stringify(database));
