const mainWindow = document.querySelector('.main-window');
const userBox = document.querySelector('.user-box');
const counter = document.querySelector('.counter');
let count = 0;

//функция, которая создает препятсивя с заданным входящим параметром смещением по x и высотой, движущиеся вниз равномерно. Не добавляет в DOM!

function elina(randomLeft, randomHeight){
    let top = 0;
    const createElina = document.createElement('div');
    createElina.classList.add('elina-box');   
    createElina.style.left = `${randomLeft}px`
    createElina.style.height = `${randomHeight}px`
    mainWindow.appendChild(createElina);
    let goBox = setInterval(() => {
        top = top+1
        createElina.style.top = `${top}px`
    }, 5);
    setTimeout(() => {
        clearInterval(goBox);
    }, 6000);
}

//Функция, которая запускает создание препятствия с интервалами. Тут задаются рандомные значения высоты красного кубика и смещения
function randomElina(){
    const randomLeft = Math.random() * ((mainWindow.offsetHeight-30) - 0) + 0;
    const randomHeight = Math.floor(Math.random() * (60-30) +30)
    elina(randomLeft, randomHeight);
}
setInterval(randomElina, 500);


//Контроль столкновений. Рендеринг кубика. Запуск счётчика в обратную сторону.
function control() {
    const redBox = document.querySelector('.elina-box');
    let userBoxLeft = parseInt(userBox.style.left);
    let elinaBoxLeft = parseInt(redBox.style.left);
    let elinaBoxTop = parseInt(redBox.style.top);

    if(parseInt(redBox.style.top)>= mainWindow.offsetHeight-redBox.offsetHeight){
        mainWindow.removeChild(redBox);

    }
    if(elinaBoxLeft >= userBoxLeft-29 && elinaBoxLeft <= userBoxLeft+userBox.offsetWidth-1 && elinaBoxTop >= (mainWindow.offsetHeight-30)-(redBox.offsetHeight-1)){
        userBox.style.backgroundColor = 'yellow';
        counters(1);
    } else {
        userBox.style.backgroundColor = 'black'
    }
}
setInterval(control, 0)

//Счётчик очков
function counters (minus){
    if(!minus){
        minus = 0;
        count = count+10
    }
    if(minus){
        count = count-minus
    }
    counter.textContent = `Ваш счёт: ${count}`
}
setInterval(counters, 2000);

//Манупулятор юзерской коробкой
let left = 240;
function goLeft(){
    if(event.keyCode==37 && left > 0){
        left = left - 20;
        userBox.style.left = `${left}px`;
    } else if (event.keyCode==39 && left <= 390) {
        left = left + 20;
        userBox.style.left = `${left}px`;
    }
}
//Обработчик нажатия на клавиши
document.addEventListener('keydown', goLeft);