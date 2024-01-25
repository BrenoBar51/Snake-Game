const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const audio = new Audio("assets/audio-snake-eating.mp3");

const size = 50;

const snake = [
    { x: 500, y: 500 },
    { x: 550, y: 500 }
];

const randomNumber = (min, max) =>{
    return Math.round(Math.random() * (max - min) + (min));
}

const randomPosition = () =>{
    const number = randomNumber(0, canvas.width - size)
    return Math.round(number / 50) * 50
}

const randomColor = () => {
    const red = randomNumber(0, 255);
    const green = randomNumber(0, 255);
    const blue = randomNumber(0, 255);

    return `rgb(${red}, ${green}, ${blue})`
}

const food = {
    x: randomPosition(),
    y: randomPosition(),
    color: randomColor()
}

let direction
let loopId

const drawFood = () =>{
    const {x, y, color} = food

    ctx.shadowColor = color
    ctx.shadowBlur = 50
    ctx.fillStyle = color
    ctx.fillRect(x, y, size, size)
    ctx.shadowBlur = 0
}

const drawSnake = () => {
    ctx.fillStyle = "#868686"

    snake.forEach((position, index) => {
        if (index == snake.length - 1) {
            ctx.fillStyle = "white"
        }

        ctx.fillRect(position.x, position.y, size, size)
    });
}

const drawGrid = () =>{
    ctx.lineWidth = 1
    ctx.strokeStyle = "#202020"

    for (let i = 50; i < canvas.width; i += 50){
        
        ctx.beginPath()
        ctx.lineTo(i, 0)
        ctx.lineTo(i, 1000)
        ctx.stroke()
        
        ctx.beginPath()
        ctx.lineTo(0, i)
        ctx.lineTo(1000, i)
        ctx.stroke()
    }
}

const moveSnake = () => {
    if (!direction) return;

    const head = snake[snake.length - 1]

    switch (true) {
        case direction == "right":
            snake.push({ x: head.x + size, y: head.y })
            break;

        case direction == "left":
            snake.push({ x: head.x - size, y: head.y })
            break;

        case direction == "down":
            snake.push({ x: head.x, y: head.y + size })
            break;

        case direction == "up":
            snake.push({ x: head.x, y: head.y - size })
            break;
    }
    snake.shift()
}

const checkEat = () =>{
    const head = snake[snake.length - 1]
    if (head.x == food.x && head.y == food.y){
        snake.push(head);
        audio.play();

        let x = randomPosition();
        let y = randomPosition();

        while (snake.find((position) => position.x == x && position.y == y)){
            x = randomPosition();
            y = randomPosition();
        }

        food.x = x
        food.y = y
        food.color = randomColor();
    }
}

const checkCollision = () => {
    const head = snake[snake.length -1];
    const canvasLimit = canvas.width - size;
    const neckIndex = snake.length -2

    const wallCollision = head.x < 0 || head.x > canvasLimit || head.y < 0 || head.y > canvasLimit;

    const selfCollision = snake.find((position, index) =>{
        return index < neckIndex && position.x == head.x && position.y == head.y
    })

    if(wallCollision || selfCollision){
        gameOver();
    }
}

const gameOver = () => {
    direction = undefined
}

const gameLoop = () => {
    clearInterval(loopId)
    ctx.clearRect(0, 0, 1000, 1000)
    drawGrid();
    drawFood();
    moveSnake();
    checkCollision();
    drawSnake();
    checkEat();
    loopId = setTimeout(() => {
        gameLoop();
    }, 300);
}
gameLoop();

document.addEventListener("keydown", ({ key }) =>{
    if (key == "ArrowRight" && direction != "left"){
        direction = "right"
    }
    if (key == "ArrowLeft" && direction != "right"){
        direction = "left"
    }
    if (key == "ArrowDown" && direction != "up"){
        direction = "down"
    }
    if (key == "ArrowUp" && direction != "down"){
        direction = "up"
    }
});