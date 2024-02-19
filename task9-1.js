// Вам дана заготовка и результат, который вы должны получить. Ваша задача — написать код, который будет преобразовывать XML в JS-объект и выводить его в консоль.
// результат: {
//   list: [
//     { name: 'Ivan Ivanov', age: 35, prof: 'teacher', lang: 'en' },
//     { name: 'Петр Петров', age: 58, prof: 'driver', lang: 'ru' },
//   ]
// }

const parser = new DOMParser();

const xmlString = `
  <list>
    <student>
      <name lang="en">
        <first>Ivan</first>
        <second>Ivanov</second>
      </name>
      <age>35</age>
      <prof>teacher</prof>
    </student>
    <student>
      <name lang="ru">
        <first>Петр</first>
        <second>Петров</second>
      </name>
      <age>58</age>
      <prof>driver</prof>
    </student>
  </list>
`;

const xmlDOM = parser.parseFromString(xmlString, "text/xml");
const listNode = xmlDOM.querySelector("list");
const studentNode = listNode.querySelectorAll("student");


function getObjectFromXML(node) {
  const arr = [];
  node.forEach(element => {
    const nameNode = element.querySelector("name");
    const firstNameNode = nameNode.querySelector("first");
    const secondNameNode = nameNode.querySelector("second");
    const ageNode = element.querySelector("age");
    const profNode = element.querySelector("prof");
    const langAttr = nameNode.getAttribute("lang");
    const result = {
      name: firstNameNode.textContent + " " + secondNameNode.textContent,
      age: ageNode.textContent,
      prof: profNode.textContent,
      lang: langAttr
    }
    arr.push(result);
  });
  return arr;
}

const list = getObjectFromXML(studentNode);
const obj = {list};

console.log(obj);


