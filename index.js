let duckImageNames=["duck-left.gif","duck-right.gif"]
let duckCount=1
let duckWidth=96
let duckHeight=93
let gameHeight=window.screen.height*(3/4)
let gameWidth=window.screen.width

window.onload=function()
{
    addDuck()
}
function addDuck()
{
    ducks=[]
    for(let i=0;i<duckCount;i++)
    {
        let imageName=duckImageNames[Math.floor(Math.random()*2)]
        let duckImage=document.createElement("img")
        duckImage.src="assets/"+imageName
        duckImage.height=duckHeight
        duckImage.width=duckWidth
        duckImage.style.position="absolute"
        document.querySelector("body").appendChild(duckImage)
        let duck={
            image:duckImage,
            x:randomPosition(gameWidth-duckWidth),
            y:randomPosition(gameHeight-duckHeight),
        }

        duckImage.style.left=String(duck.x)+"px"
        duckImage.style.top=String(duck.y)+"px"

    }
}
function randomPosition(limit)
{
    return Math.floor(Math.random()*limit)
}