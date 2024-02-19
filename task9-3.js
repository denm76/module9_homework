// Напишите код приложения, интерфейс которого представляет собой input и кнопку. В input можно ввести любое число. При клике на кнопку происходит следующее:

// Если число не попадает в диапазон от 1 до 10 — выводить ниже текст «число вне диапазона от 1 до 10».
// Если число попадает в диапазон от 1 до 10 — сделать запрос c помощью XHR по URL https://jsonplaceholder.typicode.com/photos?_limit=5, где get-параметр limit — это введённое число.

const btn = document.querySelector("button");
const resultNode = document.querySelector(".result");

function useRequest(url, callback) {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);

  xhr.onload = function () {
    if (xhr.status != 200) {
      console.log('Статус ответа: ', xhr.status);
    } else {
      const result = JSON.parse(xhr.response);
      if (callback) {
        callback(result);
      }
    }
  };

  xhr.onerror = function () {
    console.log('Ошибка! Статус ответа: ', xhr.status);
  };

  xhr.send();
};

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

btn.addEventListener("click", () => {
  const value = document.querySelector('input').value;
  if (value > 10) {
    resultNode.innerHTML += "Число вне диапазона от 1 до 10";
  } else if (value >= 1 && value <= 10) {
    useRequest(` https://jsonplaceholder.typicode.com/photos?_limit=${value}`, displayResult);
  }

})