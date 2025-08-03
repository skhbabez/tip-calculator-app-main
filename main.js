"use strict";
const calculator = document.getElementById("calculator");
const form = document.getElementById("tip-form");
const tipButtons = calculator.querySelectorAll("input[type='checkbox']");
const customInput = document.getElementById("input-custom");
const billInput = document.getElementById("input-bill");
const peopleInput = document.getElementById("input-people");
const peopleError = document.getElementById("people-error");
const billError = document.getElementById("bill-error");

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

const resetErrors = () => {
  billError.textContent = "";
  peopleError.textContent = "";
};

form.addEventListener("reset", resetErrors);

console.log(calculateBill(5, 142.55, 0.15));
