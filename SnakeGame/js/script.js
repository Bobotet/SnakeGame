"use strict"

let cellArr = [];
let startPosition = 80;
var direction = 'right';
let snakeLength = 3;
var previousArr = [78, 79];
let globalAppleCellNumber = 0;
let game = true;
let record = 0;
let lastRecord = 0;
let playOn = false;
let yourScore = 3;

let ourCell = null;

//Создаём класс, для каждого экземляра которого нахоим его номер и номер всех его соседей(именно тех, к которым змея может ползти)(если таковые имеются)
class SnakeCell{
    constructor(cellNumber, row, cellUpNeighbour, cellRightNeighbour, cellLeftNeighbour, cellDownNeighbour){
        this.cellNumber = cellNumber;
        this.row = row;
        (this.cellNumber - trArr.length > 0 && this.cellNumber - trArr.length < tdArr.length) || (this.cellNumber === 13) ? this.cellUpNeighbour = this.cellNumber - trArr.length : this.cellUpNeighbour = null;
        this.cellNumber + trArr.length > 0 && this.cellNumber + trArr.length < tdArr.length ? this.cellDownNeighbour = this.cellNumber + trArr.length : this.cellDownNeighbour = null;
        this.cellNumber % (trArr.length) != 0 ? this.cellLeftNeighbour = this.cellNumber - 1 : this.cellLeftNeighbour = null;
        (this.cellNumber + 1) % trArr.length != 0 ? this.cellRightNeighbour = this.cellNumber + 1 : this.cellRightNeighbour = null;
    }
}
//------------------------------------------------------------------------------------------------------------------------------------------------------------------


//Задаём всем ячейкам уникальный порядковый айди и делаем их экземплярами класса SnakeCell
const trArr = document.querySelectorAll('tr');
const tdArr = document.querySelectorAll('td');
let i = 0;

function tdCount(){
    let row = 1;
    for(let td of tdArr){
        if(i % trArr.length == 0 && i != 0){
            row += 1;
        }
        td.setAttribute('id', i);
        let cell = new SnakeCell(Number(td.getAttribute('id')), row);
        cellArr.push(cell)
        i++
    }
}
tdCount();

//--------------------------------------------------------------------------------------------------------------------------------------------------------


//Создаём управление змейкой посредством клавиш(меняем глобальное значение direction)
document.addEventListener('keyup', (event) => {changeDirection(event)});
function changeDirection(event){
    if(event.key === 'w' || event.key === 'ArrowUp' || event.key === 'ц'){
        window.direction = 'up';
    }
    else if(event.key === 'd' || event.key === 'ArrowRight' || event.key === 'в'){
        window.direction = 'right';
    }
    else if(event.key === 's' || event.key === 'ArrowDown' || event.key === 'ы'){
        window.direction = 'down';
    }
    else if(event.key === 'a' || event.key === 'ArrowLeft' || event.key === 'ф'){
        window.direction = 'left';
    }
}
//---------------------------------------------------------------------------------------------------------------------------------------------------


//Движение змейки
let previousDirection = '';
function snakeCrawling(ourCell, direction){
    if(game){
        let nextCell = 0;
        if((previousDirection === 'right' && direction === 'left') || (previousDirection === 'left' && direction === 'right') || 
        (previousDirection === 'up' && direction === 'down') || (previousDirection === 'down' && direction === 'up')){
            direction = previousDirection; 
        }
        switch(direction){
            case 'right':
                nextCell = ourCell.cellRightNeighbour;
                break;
            case 'left':
                nextCell = ourCell.cellLeftNeighbour;
                break;
            case 'up':
                nextCell = ourCell.cellUpNeighbour;
                break;
            case 'down':
                nextCell = ourCell.cellDownNeighbour;
                break;
        }
        previousDirection = direction;
        previousArr.push(ourCell.cellNumber);

        if(document.getElementById(String(nextCell)) == null || document.getElementById(String(nextCell)).style['background-color'] === 'red' && nextCell !== globalAppleCellNumber){
            alert('lose');

            record = previousArr.length;
            if(record > lastRecord){
                document.getElementById('inputRecord').value = record;
                lastRecord = record
            }
            
            previousDirection = 'right'
            lose();
        }
        if(nextCell === globalAppleCellNumber){
            let addCell = 0;
            yourScore += 1;
            document.getElementById('inputYourSrore').value = yourScore;
            switch(direction){
                case 'right':
                    AppleRespawn()
                    previousArr.unshift(cellArr[previousArr[0]].cellLeftNeighbour);
                    break;
                case 'left':
                    AppleRespawn()
                    previousArr.unshift(cellArr[previousArr[0]].cellRightNeighbour);
                    break;
                case 'up':
                    AppleRespawn()
                    previousArr.unshift(cellArr[previousArr[0]].cellDownNeighbour);
                    break;
                case 'down':
                    AppleRespawn()
                    previousArr.unshift(cellArr[previousArr[0]].cellUpNeighbour);
                    break;
            }
        }
        if(game){
            document.getElementById(String(nextCell)).style['background-color'] = 'red';
        }
        
        
        for(let i = 1; i < previousArr.length; i++){
            document.getElementById(String(previousArr[i])).style['background-color'] = 'red';
        }
        try{
            document.getElementById(String(previousArr[0])).style['background-color'] = 'white';
        }
        catch(TypeError){
            
        }
        
        previousArr.shift();
        ourCell = cellArr[nextCell];
        setTimeout(() => {snakeCrawling(ourCell, window.direction)}, 150);
    }
}


//-----------------------------------------------------------------------------------------------------------------------------------------------

//Функция, которая респавнит яблоки
let previousApple = 0;
function AppleRespawn(){
    globalAppleCellNumber = Math.floor(Math.random() * tdArr.length);  
    //console.clear();
    //console.log(globalAppleCellNumber)
    if(document.getElementById(String(cellArr[globalAppleCellNumber].cellNumber)).style['background-color'] === 'red' || globalAppleCellNumber === previousApple || previousArr.forEach(el => {if(el === globalAppleCellNumber){return true}})){
        AppleRespawn()
    }
    else{
        document.getElementById(String(cellArr[globalAppleCellNumber].cellNumber)).style['background-color'] = 'green';
        previousApple = globalAppleCellNumber;
    }
}

//-----------------------------------------------------------------------------------------------------------------------------------------------------



function lose(){
    game = false;
    playOn = false;

}
function start(){
    if(!playOn){
        for(let td of tdArr){
            td.style['background-color'] = 'white'
        }
        startPosition = 80;
        direction = 'right';
        snakeLength = 3;
        previousArr = [78, 79];
        globalAppleCellNumber = 0;
        game = true;
        yourScore = 3;
        document.getElementById('inputYourSrore').value = yourScore;


        snakeCrawling(cellArr[startPosition], window.direction)
        AppleRespawn()
        playOn = true;
    }

}

document.getElementById('play-button').addEventListener('click', start)