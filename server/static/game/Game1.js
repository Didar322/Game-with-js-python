var player;
var playerSize = 30;
var walls = [];
var speed = 4;
var myScore;
var score = 0;
var flag = false;

function startGame1(){
    player = new component_game1(playerSize, playerSize, "red", area.canvas.width/2, window.innerHeight/1.3 - playerSize);
    myScore = new component_game1("30px", "Consolas", "black", 280, 40, "text");
    area.start(); 
}

var area = {
    canvas : document.getElementById("game1"),
    start : function() {
        this.canvas.width = window.innerWidth/2.07;
        this.canvas.height = window.innerHeight/1.3;
        this.canvas.style.cursor = "none";
        this.context = this.canvas.getContext("2d");
        this.frameNo = 0;          
        window.addEventListener('keydown', function (e) {
            area.key = e.keyCode;
        })
        window.addEventListener('keyup', function (e) {
            area.key = false;
        })
        this.interval = interval; 
    },
    clear: function(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        clearInterval(interval);
        flag = true; // this flag in game.html if game stopped then show nickname adding
        return true;
    },
}

function component_game1(width, height, color, x, y, type){
    this.type = type;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speedX = 0;
    this.speedY = 0;
    this.update = function(){
        ctx = area.context;
        if (this.type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;
    }
    this.crashWith = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) ||
        (mytop > otherbottom) ||
        (myright < otherleft) ||
        (myleft > otherright)) {
          crash = false;
        }
        return crash;
    }
}

function updateArea(){
    var x, y;
  for (i = 0; i < walls.length; i += 1) {
    if (player.crashWith(walls[i])) {
      area.stop();
      return;
    }
  }
    area.clear();
    area.frameNo += 1;                         
    if (area.frameNo == 1 || everyinterval(30)) {
        y = 0;
        width = Math.floor(area.canvas.width/3);
        x = width * Math.floor(Math.floor(Math.random()*10)/3.5);
        walls.push(new component_game1(width, 10, "green", x, y));
    }
    for (i = 0; i < walls.length; i += 1) {
        walls[i].y += speed;
        walls[i].update();
        if(speed < 10){            //Awful moment how i can created this
            speed += 0.0001;
        }
    }

    player.speedX = 0;
    if (area.key && area.key == 37) {      
        if (player.x - player.speedX > 0) {
            player.speedX -= 12;
        }
        else{
            player.speedX = 0;
        }
    }
    if (area.key && area.key == 39) {
        if (player.x + player.width + player.speedX < area.canvas.width) {
            player.speedX += 12;
        }
        else{
            player.speedX = 0;
        } 
    }
    score = Math.round((area.frameNo * 50)/1000);
    myScore.text = "SCORE: " + score;
    myScore.update();
    player.newPos();
    player.update();
}

function everyinterval(n) {
    if ((area.frameNo / n) % 1 == 0) {return true;}
    return false;
  }
