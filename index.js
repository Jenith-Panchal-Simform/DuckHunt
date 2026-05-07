let duckImageNames = ["duck-left.gif", "duck-right.gif"];
let duckCount = 1;
let duckWidth = 96;
let duckHeight = 93;
let gameHeight = window.screen.height * (3 / 4);
let gameWidth = window.screen.width;
let duckVelocityX = 5;
let duckVelocityY = 5;
let ducks;

window.onload = function () {
    addDuck();
    //60frames per sec
    setInterval(() => {
        moveDuck();
    }, 1000 / 60);
};
function addDuck() {
    ducks = [];
    for (let i = 0; i < duckCount; i++) {
        let imageName = duckImageNames[Math.floor(Math.random() * 2)];
        let duckImage = document.createElement("img");
        duckImage.src = "assets/" + imageName;
        duckImage.height = duckHeight;
        duckImage.width = duckWidth;
        duckImage.style.position = "absolute";
        document.querySelector("body").appendChild(duckImage);
        let duck = {
            image: duckImage,
            x: randomPosition(gameWidth - duckWidth),
            y: randomPosition(gameHeight - duckHeight),
            velocityX: duckVelocityX,
            velocityY: duckVelocityY,
        };

        duck.image.style.left = String(duck.x) + "px";
        duck.image.style.top = String(duck.y) + "px";

        //if duck is Left then inverset he velocity of duck in x position as it moves left
        if (duck.image.src.includes(duckImageNames[0])) {
            duck.velocityX = -duckVelocityX;
        }
        ducks.push(duck);
    }
}
function randomPosition(limit) {
    return Math.floor(Math.random() * limit);
}
function moveDuck() {
    console.log("hello");
    for (let i = 0; i < ducks.length; i++) {
        let duck = ducks[i];
        console.log(duck.x);
        //move Duck position
        duck.x += duck.velocityX;
        duck.y += duck.velocityY;

        //if(duck moves out of screen)
        if (duck.x < 0 || duck.x + duckWidth > gameWidth) {
            duck.x -= duck.velocityX;
            duck.velocityX =-1 * duck.velocityX
            //if velocity <0 then change duck image
            if(duck.velocityX<0)
            {
                duck.image.src = "assets/" + duckImageNames[0];//left
            }
            else{
                duck.image.src = "assets/" + duckImageNames[1];//right
            }
        }
        if (duck.y < 0 || duck.y + duckHeight > gameHeight) {
            duck.y -= duck.velocityY;
            duck.velocityY =-1 * duck.velocityY
        }
        duck.image.style.left = String(duck.x) + "px";
        duck.image.style.top = String(duck.y) + "px";
    }
}
