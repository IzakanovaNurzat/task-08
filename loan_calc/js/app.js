const form = document.querySelector("#loan-form");

form.addEventListener("submit", calculateResults);
const output = document.querySelector("#output");
const loader = document.querySelector("#loader"); //loader
loader.style.display = "none"; // loader no
output.style.display = "none";

function calculateResults(e) {
  const amount = document.querySelector("#amount");
  const interest = document.querySelector("#interest");
  const years = document.querySelector("#years");

  const monthlyPayment = document.querySelector("#monthly-payment");
  const totalPayment = document.querySelector("#total-payment");
  const totalInterest = document.querySelector("#total-interest");

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  loader.style.display = "block"; //loader time  загрузка идет.
  output.style.display = "none";
  setTimeout(function () {
    loader.style.display = "none";
  }, 3000);

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = (monthly * calculatedPayments - principal).toFixed(2);
    setTimeout(function () {
      output.style.display = "block";
    }, 3000);
  } else {
    setTimeout(function () {
      //unfilled - Заполните все поля!
      unfilled.style.display = "block";
    }, 3000);
    setTimeout(function () {
      //Disable unfilled
      unfilled.style.display = "none";
    }, 8000);
    output.style.display = "none"; //Disable output если не заполнено
  }

  e.preventDefault();
}
const unfilled = document.createElement("div"); //если не заполнено включить unfilled
unfilled.className = "incomplete";
unfilled.innerText = "Заполните все поля!";
unfilled.style.padding = "5px";
unfilled.style.background = "rgba(225, 0, 0, 0.2)";
unfilled.style.borderRadius = "5px";
unfilled.style.display = "none";
const parentForm = form.parentNode;
parentForm.prepend(unfilled);
