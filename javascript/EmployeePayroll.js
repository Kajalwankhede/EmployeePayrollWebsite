window.addEventListener('DOMContentLoaded',(event) =>{  //when content is loaded then 

const salary = document.querySelector('#salary');      //getting salary element,queryselector return element within documents
const output = document.querySelector('.salary-output');
output.textContent = salary.value;
salary.addEventListener('input', function () { // to salary element adding listner when input fired then function being called
    output.textContent = salary.value;
});
});