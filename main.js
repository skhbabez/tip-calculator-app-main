const roundCurrency = (amount) => {
  return Math.round(amount * 100) / 100;
};

const floorCurrency = (amount) => {
  return Math.floor(amount * 100) / 100;
};

const calculateBill = (noPeople = 1, bill = 0, tip = 0) => {
  const amountPerPerson = bill / noPeople;
  const tipPerPerson = amountPerPerson * tip;
  const total = amountPerPerson + tipPerPerson;
  return [floorCurrency(tipPerPerson), roundCurrency(total)];
};

console.log(calculateBill(5, 142.55, 0.15));
