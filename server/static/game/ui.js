//global because paused should work another part of application
var paused = false;

function startUI(){
    var canvas = document.getElementById("game1");
    var ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth/2.07;
    canvas.height = window.innerHeight/1.3;
    ctx.font = "30px Times New Roman";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("Push Space for Start Game and R reload!", canvas.width/2, canvas.height/2);

    var canvas = document.getElementById("game2");
    var ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth/2.07;
    canvas.height = window.innerHeight/1.3;
    ctx.font = "30px Times New Roman";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("Push Space for Start Game and R reload!", canvas.width/2, canvas.height/2);
}

function togglePause()
{
    if (paused)
    {
        paused = true;
    } else if (!paused)
    {
       paused= false;
    }

}