const array = [
  { compra: "alimentação", valor: 10.9 },
  { compra: "alimentação", valor: 20.9 },
  { compra: "alimentação", valor: 40.9 },
  { compra: "alimentação", valor: 30.9 },
];

const newArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const compras = array.reduce((acc, { valor }) => acc + valor, 0);
const compras2 = newArray.reduce((acc, curr) => acc + curr);

// console.log(typeof array[0].valor);
console.log(compras);
