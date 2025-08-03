"use strict";
const calculator = document.getElementById("calculator");
const form = document.getElementById("tip-form");
const tipButtons = calculator.querySelectorAll("input[type='checkbox']");
const customInput = document.getElementById("input-custom");
const billInput = document.getElementById("input-bill");
const peopleInput = document.getElementById("input-people");
const peopleError = document.getElementById("people-error");
const billError = document.getElementById("bill-error");
const tipLabel = document.getElementById("tip-amount");
const totalLabel = document.getElementById("total");

const roundCurrency = (amount) => {
  return Math.round(amount * 100) / 100;
};

const floorCurrency = (amount) => {
  return Math.floor(amount * 100) / 100;
};

const calculateBill = (people = 1, bill = 0, tip = 0) => {
  const amountPerPerson = bill / people;
  const tipPerPerson = amountPerPerson * (tip / 100);
  const total = amountPerPerson + tipPerPerson;
  return [floorCurrency(tipPerPerson), roundCurrency(total)];
};

const resetErrors = () => {
  billError.textContent = "";
  peopleError.textContent = "";
};

const updateToggles = (tip = "") => {
  tipButtons.forEach((btn) => {
    if (tip !== btn.value) {
      btn.checked = false;
    }
  });
};

const getTip = () => {};

const updateResult = () => {
  const formData = new FormData(form);
  const tipToggle = formData.get("tip");
  const tipCustom = formData.get("tip-custom");
  const tip = tipCustom || tipToggle;
  const bill = formData.get("bill");
  const people = formData.get("people");
  const [tipPerPerson, total] = calculateBill(people, bill, tip);
  totalLabel.textContent = total;
  tipLabel.textContent = tipPerPerson;
};

const handleTip = (event) => {
  if (event.currentTarget.type === "checkbox") {
    updateToggles(event.currentTarget.value);
    customInput.value = "";
  }
  if (event.currentTarget.type === "text") {
    updateToggles();
  }
  updateResult();
};

const handleBill = (event) => {
  updateResult();
};

const handlePeople = (event) => {
  updateResult();
};

form.addEventListener("reset", resetErrors);
tipButtons.forEach((btn) => btn.addEventListener("change", handleTip));
customInput.addEventListener("input", handleTip);
billInput.addEventListener("input", handleBill);
peopleInput.addEventListener("input", handleBill);
console.log(calculateBill(5, 142.55, 0.15));
