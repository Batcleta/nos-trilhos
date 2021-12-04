function convertMoney(number) {
  const realMoney = number.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });
  return realMoney;
}

export default convertMoney;
// console.log(convertMoney(104.9));
