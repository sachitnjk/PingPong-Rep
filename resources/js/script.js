// -------- DECLARING CANVAS, CONTEXT ---------//


const canvas = document.getElementById("pong");

const context = canvas.getContext("2d");


// ---------- USER AND COMP --------//

const user = {
    x: 0,
    y: canvas.height/2 - 100/2,
    width: 10,
    height: 100,
    color: "WHITE",
    score: 0
    
}

const comp = {
    x: canvas.width - 10,
    y: canvas.height/2 - 100/2,
    width: 10,
    height: 100,
    color: "WHITE",
    score: 0
    
}




// --------- CREATING NET -------------//


const net = {
    x: canvas.width/2 - 2/2,
    y: 0,
    width: 2,
    height: 10,
    color: "WHITE"
}


// --------- CREATING BALL --------//


const ball = {
    x: canvas.width/2,
    y: canvas.height/2,
    r: 10,
    velocityX : 5,
    velocityY : 5,
    speed: 5,
    color: "WHITE"
}


/*------------------------------------*/
// --------- DRAW FUNCTIONS ----------//
/*------------------------------------*/



function drawRect(x, y, w, h, color){
    context.fillStyle = color;
    context.fillRect(x, y, w, h);
}

function drawCircle(x, y, r, color){
    context.fillStyle = color;
    context.beginPath();
    context.arc(x, y, r, 0, Math.PI*2, false);
    context.closePath();
    context.fill();
    
}

function drawText(text, x, y, color) {
    context.fillStyle = color;
    context.font = "75px fantasy";
    context.fillText(text, x, y);
    
}


function drawNet() {
    for(let i = 0; i <= canvas.height; i+=15){
        drawRect(net.x, net.y + i, net.width, net.height, net.color);
    }
}


canvas.addEventListener("mousemove",movePaddle);

function movePaddle(evt) {
    let rect = canvas.getBoundingClientRect();
    user.y = evt.clientY - rect.top - user.height/2;
}


function collison(ball, player) {
    player.top = player.y;
    player.bottom = player.y + player.height;
    player.left = player.x;
    player.right = player.x + player.width;
    
    ball.top = ball.y - ball.r;
    ball.bottom = ball.y + ball.r;
    ball.left = ball.x - ball.r;
    ball.right = ball.x + ball.r;
    
    return ball.right > player.left && ball.top < player.bottom && ball.left < player.right && ball.bottom > player.top;
}

function resetBall(){
    ball.x = canvas.width/2;
    ball.y = canvas.height/2;
    ball.speed = 5;
    ball.velocityX = -ball.velocityX;
    
}

function update() {
    
    //assigning velocity to ball
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;
    
    //comp AI
    comp.y += (ball.y - (comp.y + comp.height/2)) * 0.1;
    
    //Inversing velocity when ball hits top/bottom
    if( ball.y + ball.r > canvas.height ||
        ball.y - ball.r < 0) {
        ball.velocityY = -ball.velocityY;
    }
    
    
    let player = (ball.x < canvas.width/2)?user:comp;
    
    if(collison(ball,player)){

        let collidePoint = (ball.y - (player.y + player.height/2));
        collidePoint = collidePoint/(player.height/2);
        
        let angleRad = collidePoint * Math.PI/4;
        
        let direction = (ball.x < canvas.width/2) ? 1 : -1;
        ball.velocityX = direction * ball.speed*Math.cos(angleRad);
        //xDebug = canvas.width/2 + direction*Math.cos(angleRad) * ball.speed;
        //ball.velocityX = -ball.velocityX;
        ball.velocityY = ball.speed*Math.sin(angleRad);
        //yDebug = canvas.height/2 + Math.sin(angleRad)* ball.speed;
        
        console.log(ball.speed); 
        ball.speed += 0.1;   
    }
    

    
    if (ball.x - ball.r < 0) {
        comp.score++;
        resetBall();
    } else if (ball.x + ball.r > canvas.width) {
        user.score++;
        resetBall();
    }
    
}



// --------- RENDER FUNCTION ---------//

//let xDebug = 0;
//let yDebug = 0;


function render (){
    drawRect(0, 0, 600, 400, "black");
    drawText(user.score, canvas.width/4, canvas.height/5, "WHITE");
    drawText(comp.score, 3*canvas.width/4, canvas.height/5, "WHITE");
    drawNet();    
    drawRect(user.x, user.y, user.width, user.height, user.color);
    drawRect(comp.x, comp.y, comp.width, comp.height, comp.color);
    drawCircle(ball.x, ball.y, ball.r, ball.color);
    //drawCircle(xDebug, yDebug, ball.r, ball.color);
}


function game(){
    update();
    render();
}

const framePerSecond = 50;

setInterval(game, 1000/framePerSecond);

//------ DRAW SCORE -------//




// NEW COMMENT



