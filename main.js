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
const resetButton = document.getElementById("reset");

const isNumber = (number) => {
  return !isNaN(number) && isFinite(number);
};

const validations = {
  bill: (bill) => isNumber(bill) && bill > 0,
  people: (people) => isNumber(people) && people % 1 === 0 && people > 0,
  tip: (tip) => isNumber(tip) && tip > 0,
};

const isValid = (key, value) => {
  if (!validations[key]) return true;
  return validations[key](value);
};

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

const updateToggles = (tip = "") => {
  tipButtons.forEach((btn) => {
    if (tip !== btn.value) {
      btn.checked = false;
    }
  });
};

const updateResult = () => {
  const formData = new FormData(form);
  const tipToggle = formData.get("tip");
  const tipCustom = formData.get("tip-custom");
  const tip = tipCustom || tipToggle || "";
  const bill = formData.get("bill") || "";
  const people = formData.get("people") || "";
  const validated =
    isValid("tip", tip.trim()) &&
    isValid("bill", bill.trim()) &&
    isValid("people", people.trim());
  const [tipPerPerson, total] = calculateBill(people, bill, tip);
  totalLabel.textContent = validated ? total.toFixed(2) : "0.00";
  tipLabel.textContent = validated ? tipPerPerson.toFixed(2) : "0.00";
  resetButton.disabled = !(tip || bill || people);
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

const setErrors = (name, isError) => {
  const element = {
    bill: [billError, billInput],
    people: [peopleError, peopleInput],
  }[name];
  element[0].textContent = isError ? "Can’t be zero" : "";
  element[1].classList.toggle("outline-error", isError);
  element[1].classList.toggle("outline-success", !isError);
};

const resetErrors = () => {
  const elements = {
    labels: [billError, peopleError],
    inputs: [billInput, peopleInput],
  };
  elements["labels"].forEach((label) => (label.textContent = ""));
  elements["inputs"].forEach((input) =>
    input.classList.remove("outline-error", "outline-success")
  );
};

const handleInput = (event) => {
  const value = event.currentTarget.value.trim();
  const name = event.currentTarget.name.trim();
  const validation = isValid(name, value);
  setErrors(name, !validation);
  updateResult();
};

const handleReset = () => {
  resetErrors();
  totalLabel.textContent = "0.00";
  tipLabel.textContent = "0.00";
  resetButton.disabled = true;
};

form.addEventListener("reset", handleReset);
tipButtons.forEach((btn) => btn.addEventListener("change", handleTip));
customInput.addEventListener("input", handleTip);
billInput.addEventListener("input", handleInput);
peopleInput.addEventListener("input", handleInput);
