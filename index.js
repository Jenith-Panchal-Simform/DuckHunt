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
    duckCount = Math.floor(Math.random() * 15) + 1;
    for (let i = 0; i < duckCount; i++) {
        let duckImage = document.createElement("img");
        duckImage.classList.add("duck");
        duckImage.src = "assets/duck-left.gif";
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
            let lastDuck;
            for (let i = 0; i < ducks.length; i++) {
                lastDuck = ducks[ducks.length - 1];
                if (ducks[i].image != this) {
                    remainingDucks.push(ducks[i]);
                }
            }
            ducks = remainingDucks;
            console.log("ducks", lastDuck);
            if (ducks.length == 0) {
                addDog(lastDuck.x);
            }
        });
        document.body.appendChild(duckImage);
        let duck = {
            image: duckImage,
            x: randomPosition(gameWidth - duckWidth),
            y: randomPosition(gameHeight - duckHeight),
            velocityX: duckVelocityX,
            velocityY: duckVelocityY,
        };
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

        // Horizontal collision
        if (duck.x < 0) {
            duck.x = 0;
            duck.velocityX *= -1;
        }

        if (duck.x + duckWidth > gameWidth) {
            duck.x = gameWidth - duckWidth;
            duck.velocityX *= -1;
        }

        // Change image direction
        if (duck.velocityX < 0) {
            duck.image.style.transform = `translate3d(${duck.x}px, ${duck.y}px, 0) scaleX(1)`;
        } else {
            duck.image.style.transform = `translate3d(${duck.x}px, ${duck.y}px, 0) scaleX(-1)`;
        }

        // Vertical collision
        if (duck.y < 0) {
            duck.y = 0;
            duck.velocityY *= -1;
        }

        if (duck.y + duckHeight > gameHeight) {
            duck.y = gameHeight - duckHeight;
            duck.velocityY *= -1;
        }
    }
}
function addDog(position) {
    console.log(position);
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
    let dogX = Math.max(0, Math.min(position, gameWidth - dogImage.width));

    dogImage.style.left = `${dogX}px`;
    // dogImage.style.left = String(val) + "px";

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
