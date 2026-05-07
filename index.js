let duckImageNames = ["duck-left.gif", "duck-right.gif"];
let duckCount;
let duckWidth = 96;
let duckHeight = 93;
let gameHeight = window.innerHeight * (3 / 4);
let gameWidth = window.innerWidth;
let duckVelocityX = 5;
let duckVelocityY = 5;
let ducks;
let score = 0;
function updateGameSize() {
    gameHeight = window.innerHeight * (3 / 4);
    gameWidth = window.innerWidth;
}
window.onresize = function () {
    updateGameSize();
};
window.onload = function () {
    addDuck();
    //60frames per sec
    setInterval(() => {
        moveDuck();
    }, 1000 / 60);
};
function addDuck() {
    ducks = [];
    duckCount = Math.floor(Math.random() * 2) + 1;
    for (let i = 0; i < duckCount; i++) {
        let imageName = duckImageNames[Math.floor(Math.random() * 2)];
        let duckImage = document.createElement("img");
        duckImage.src = "assets/" + imageName;
        duckImage.height = duckHeight;
        duckImage.width = duckWidth;
        //add event Listener for shoot and score
        duckImage.addEventListener("pointerdown", function () {
            //play duck shot audio
            let duckShot = new Audio("assets/duck-shot.mp3");
            duckShot.play();
            score++;
            document.getElementById("score").innerHTML = score;
            //remove the shot duck
            document.body.removeChild(this);
            let remainingDucks = [];
            for (let i = 0; i < ducks.length; i++) {
                if (ducks[i].image != this) {
                    remainingDucks.push(ducks[i]);
                }
            }
            ducks = remainingDucks;
            if (ducks.length == 0) {
                addDog();
            }
        });
        duckImage.style.position = "absolute";
        document.body.appendChild(duckImage);
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
    for (let i = 0; i < ducks.length; i++) {
        let duck = ducks[i];
        //move Duck position
        duck.x += duck.velocityX;
        duck.y += duck.velocityY;

        //if(duck moves out of screen)
        if (duck.x < 0 || duck.x + duckWidth > gameWidth) {
            duck.x -= duck.velocityX;
            duck.velocityX = -1 * duck.velocityX;
            //if velocity <0 then change duck image
            if (duck.velocityX < 0) {
                duck.image.src = "assets/" + duckImageNames[0]; //left
            } else {
                duck.image.src = "assets/" + duckImageNames[1]; //right
            }
        }
        if (duck.y < 0 || duck.y + duckHeight > gameHeight) {
            duck.y -= duck.velocityY;
            duck.velocityY = -1 * duck.velocityY;
        }
        duck.image.style.left = String(duck.x) + "px";
        duck.image.style.top = String(duck.y) + "px";
    }
}
function addDog() {
    let dogImage = document.createElement("img");
    if (duckCount == 1) {
        dogImage.src = "assets/dog-duck1.png";
        dogImage.width = 172;
    } else {
        dogImage.src = "assets/dog-duck2.png";
        dogImage.width = 224;
    }
    dogImage.height = 152;
    dogImage.draggable = false;

    dogImage.style.position = "fixed";
    dogImage.style.bottom = "0";
    dogImage.style.left = "50%";
    //play audio when dog seen
    let dogScore = new Audio("assets/dog-score.mp3");
    dogScore.play();
    document.body.appendChild(dogImage);
    setTimeout(() => {
        document.body.removeChild(dogImage);
        addDuck();
    }, 3000);
}
//reset functionality
document.getElementById("reset").addEventListener("click", handleReset);
function handleReset() {
    alert(`Your Score is : ${score} Enjoy Playing !!`);
    score = 0;
    document.getElementById("score").innerHTML = score;
}