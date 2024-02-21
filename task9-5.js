// Написать код приложения, интерфейс которого состоит из двух input и кнопки. В input можно ввести любое число.
// Заголовок первого input — «номер страницы».
// Заголовок второго input — «лимит».
// Заголовок кнопки — «запрос».
// При клике на кнопку происходит следующее:
// Если число в первом input не попадает в диапазон от 1 до 10 или не является числом — выводить ниже текст «Номер страницы вне диапазона от 1 до 10»;
// Если число во втором input не попадает в диапазон от 1 до 10 или не является числом — выводить ниже текст «Лимит вне диапазона от 1 до 10»;
// Если и первый, и второй input не в диапазонах или не являются числами — выводить ниже текст «Номер страницы и лимит вне диапазона от 1 до 10»;
// Если числа попадают в диапазон от 1 до 10 — сделать запрос по URL https://jsonplaceholder.typicode.com/photos?_page=0&_limit=5, где GET-параметр _page — это число из первого input, а GET-параметр _limit — это введённое число второго input.
// После получения данных вывести список картинок на экран.
// Если пользователь перезагрузил страницу, то ему должны показываться картинки из последнего успешно выполненного запроса (использовать localStorage).

const btn = document.querySelector("button");
const resultNode = document.querySelector(".result");

document.addEventListener("DOMContentLoaded", () => {
  let storageItem = localStorage.getItem('lastResponse');
  if (storageItem) {
    displayResult(JSON.parse(storageItem));
  }
});

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

const useRequest = async (page, limit) => {
  return fetch(`https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=${limit}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      localStorage.setItem('lastResponse', JSON.stringify(data));
      displayResult(data);
    })
    .catch((e) => {
      console.log("error: " + e);
    })
}

btn.addEventListener('click', async () => {
  const pageInputValue = +document.getElementById("firstDigit").value;
  const limitInputValue = +document.getElementById("secondDigit").value;

  const firstInputMessageError = isNaN(pageInputValue) || pageInputValue < 1 || pageInputValue > 10;
  const secondInputMessageError = isNaN(limitInputValue) || limitInputValue < 1 || limitInputValue > 10;


  if (firstInputMessageError) {
    resultNode.innerHTML = "Номер страницы вне диапазона от 1 до 10";
  }
  if (secondInputMessageError) {
    resultNode.innerHTML = "Лимит вне диапазона от 1 до 10";
  }
  if (!firstInputMessageError && !secondInputMessageError) {
    const requestResult = await useRequest(pageInputValue, limitInputValue);
    displayResult(requestResult);
  }
  if (firstInputMessageError && secondInputMessageError) {
    resultNode.innerHTML = "Номер страницы и лимит вне диапазона от 1 до 10";
  }
})

