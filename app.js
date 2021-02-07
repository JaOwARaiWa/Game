context = canvas.getContext("2d");

const bird = new Image();
bird.src = "bird.png";

birdX = birdDY = score = bestScore = 0;
interval = birdSize = pipeWidth = topPipeBottomY = 24;
birdY = pipeGap = 200;
canvasSize = pipeX = 400;

canvas.onclick = () => (birdDY = 9); // Flap the bird

setInterval(() =>
{
    context.fillStyle = "black";
    context.fillRect(0,0,canvasSize,canvasSize); // Draw sky

    birdY -= birdDY -= 0.5; // Gravity

    context.drawImage(bird, birdX, birdY, birdSize*2, birdSize*2); //Draw bird

    context.fillStyle = "green";
    pipeX -= 9;
    pipeX/2 < -pipeWidth && ((pipeX = canvasSize), (topPipeBottomY = pipeGap * Math.random()));
    context.fillRect(pipeX, 0, pipeWidth*2, topPipeBottomY + pipeGap*(0.2)); // Draw top pipe
    context.fillRect(pipeX, topPipeBottomY + pipeGap*(0.8), pipeWidth*2, canvasSize); // Draw bottom pipe
    
    context.fillStyle = "white";
    context.fillText(score-=-1, 15, 25);
    bestScore = bestScore < score ? score : bestScore;
    context.fillText(`Best Score : ${bestScore}`, 15, 50);

    (((birdY < topPipeBottomY + pipeGap*(0.2) || birdY > topPipeBottomY + pipeGap*(0.8)) && pipeX < birdSize*2) // Bird hit pipe
     || birdY > canvasSize) && // Bird falls off screen
    ((birdDY = 0), (birdY = 200), (pipeX = canvasSize), (score = 0), (topPipeBottomY = pipeGap * Math.random())); // Bird died

}, interval);