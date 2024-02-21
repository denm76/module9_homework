// Написать код приложения, интерфейс которого состоит из двух input и кнопки. В input можно ввести любое число.
// Заголовок первого input — «номер страницы».
// Заголовок второго input — «лимит».
// Заголовок кнопки — «запрос».
// При клике на кнопку происходит следующее:
// Если число в первом input не попадает в диапазон от 1 до 10 или не является числом — выводить ниже текст «Номер страницы вне диапазона от 1 до 10»;
// Если число во втором input не попадает в диапазон от 1 до 10 или не является числом — выводить ниже текст «Лимит вне диапазона от 1 до 10»;
// Если и первый, и второй input не в диапазонах или не являются числами — выводить ниже текст «Номер страницы и лимит вне диапазона от 1 до 10»;
// Если числа попадают в диапазон от 1 до 10 — сделать запрос по URL https://jsonplaceholder.typicode.com/photos?_page=0&_limit=5, где GET-параметр _page — это число из первого input, а GET-параметр _limit — это введённое число второго input.

const btn = document.querySelector("button");
const resultNode = document.querySelector(".result");

function displayResult(apiData) {
  let cards = "";

  apiData.forEach(element => {
    const cardBlock = `
    <div class = "card">
      <img src = "${element.url}" class = "card-image"/>
    </div>
    `;
    cards += cardBlock;
  });
  resultNode.innerHTML = cards;
}

btn.addEventListener('click', () => {
  const firstInputValue = +document.getElementById("firstDigit").value;
  const secondInputValue = +document.getElementById("secondDigit").value;

  if ((firstInputValue < 1 || firstInputValue > 10 || typeof (firstInputValue) !== 'number' || isNaN(firstInputValue)) && secondInputValue >= 1 && secondInputValue <= 10 && typeof (secondInputValue) === 'number' && !isNaN(secondInputValue)) {
    resultNode.innerHTML = "Номер страницы вне диапазона от 1 до 10 input1";
  } else if ((firstInputValue >= 1 && firstInputValue <= 10 && typeof (firstInputValue) === 'number' && !isNaN(firstInputValue)) && (secondInputValue < 1 || secondInputValue > 10 || typeof (secondInputValue) !== 'number' || isNaN(secondInputValue))) {
    resultNode.innerHTML = "Номер страницы вне диапазона от 1 до 10 input2";
  } else if (firstInputValue >= 1 && firstInputValue <= 10 && typeof (firstInputValue) === 'number' && !isNaN(firstInputValue) && secondInputValue >= 1 && secondInputValue <= 10 && typeof (secondInputValue) === 'number' && !isNaN(secondInputValue)) {

    fetch(`https://jsonplaceholder.typicode.com/photos?_page=${firstInputValue}&_limit=${secondInputValue}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        displayResult(data);
      })
      .catch((e) => {
        console.log("error: " + e);
      })

  } else if (((firstInputValue < 1 || firstInputValue > 10 || typeof (firstInputValue) !== 'number' || isNaN(firstInputValue))) && (secondInputValue < 1 || secondInputValue > 10 || typeof (secondInputValue) !== 'number' || isNaN(secondInputValue))) {
    resultNode.innerHTML = "Номер страницы и лимит вне диапазона от 1 до 10";
  }
})

