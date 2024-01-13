const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const size = 40;

const snake = [ 
    {x:500, y:500},
    {x:540, y:500}
];

let direction

const drawSnake = () => {   
    ctx.fillStyle = "#868686"

    snake.forEach((position, index) => {
        if(index == snake.length - 1){
            ctx.fillStyle = "white"
        }

        ctx.fillRect(position.x, position.y, size, size)
    });
}

const moveSnake = () =>{
    if(!direction)return

    const head = snake[snake.length - 1]

    switch(true){
        case direction == "right" :
            snake.push({ x: head.x + size, y: head.y })
        break;

        case direction == "left" :
            snake.push({ x: head.x - size, y: head.y })
        break;

        case direction == "down" :
            snake.push({ x: head.x, y: head.y + size })
        break;

        case direction == "up" :
            snake.push({ x: head.x, y: head.y - size })
        break;
    }
    snake.shift()
}

setInterval(() =>{
    ctx.clearRect(0, 0, 1000, 1000)
    
    moveSnake();
    drawSnake();
}, 300);