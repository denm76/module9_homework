// Напишите код приложения, интерфейс которого представляет собой 2 input и кнопку submit. В input можно ввести любое число.
// При клике на кнопку происходит следующее:
// Если оба числа не попадают в диапазон от 100 до 300 или введено не число — выводить ниже текст «одно из чисел вне диапазона от 100 до 300»;
// Если числа попадают в диапазон от 100 до 300 — сделать запрос c помощью fetch по URL  https://dummyimage.com/100x300/, где первое число — ширина картинки, второе — высота.

const btn = document.querySelector("button");
const resultNode = document.querySelector(".result");

function displayResult(apiData) {
  const cardBlock = `
    <div class = "card">
      <img src = "${apiData.url}" class = "card-image"/>
    </div>
    `;
  resultNode.innerHTML = cardBlock;
}

btn.addEventListener('click', () => {
  const firstInputValue = +document.getElementById("firstDigit").value;
  const secondInputValue = +document.getElementById("secondDigit").value;
  if (firstInputValue >= 100 && firstInputValue <= 300 && typeof (firstInputValue) === 'number' && !isNaN(firstInputValue) && secondInputValue >= 100 && secondInputValue <= 300 && typeof (secondInputValue) === 'number' && !isNaN(secondInputValue)) {
    fetch(`https://dummyimage.com/${firstInputValue}x${secondInputValue}/`)
      .then(response => {
        return response;
      })
      .then(data => {
        displayResult(data);
      })
      .catch(e => console.log(e));
  } else {
    resultNode.innerHTML = 'одно из чисел вне диапазона от 100 до 300';
  }
})