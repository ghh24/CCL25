//title concept: the butterfly paradox: from growth to confinement
//design: starts off as circles (represents "purity", "no form", "neverending freedom", shifts to squares (represents freedom with some restriction and conformation to order and structure, but still with some "purity," "originality" and lack of overbearing imposition from others, at last transofrms to butterflies in which confiend in a "bubble" or by societal norms, with the squares bouncing on the outside of the bubbles representing a curated/unrestrained self that they once had but now are "blocked" from as now fully developed and mature individuals within society ))

///ACTUALLY, REDEFINE AS REACTING TO BEHAVIOR, NOT AS METAPHORICAL GROWTH (i.e. more like how does the creature react to being clicked, to eating food, does it run away, how does it react when you aren't reacting to it, what happens if the mouse goes off canvas) AND A "CREATURE" that doesn't already exist yet

//NEXT IDEA:
//title: the nervous form
//description: when not pressed, the creature is in its normal state, a fluid, relaxed, circle, when pressed, the creature gets a little more stressed turning into a square, its new "points" representing its defensiveness, when pressed again (this time with mouse and keyboard), the creature enlarges and you can actually see the "butterflies" or whatever abstract name you would like to call it, revealing its ultimate nervous form. being "pressed" is also synonymous with the human world, where when we are pressed it can sometimes literally mean we are on a time cruch or something has caused us to be stressed or nervous as well

//sources:
//"bubble": https://docs.google.com/document/d/1hB8f-GcjHJFU9k0wLhUu16rmbUsChPZmHcAdy88AY_c/edit?tab=t.0

//feedback: make the transition between forms smoother, like add lerp between forms, or have the shapes gradually "grow" or just transition into the next form like the small squares to the big circle with butterflies, maybe improve the the object following the mouse, build environment

//feedback round 2: instead of key pressed, maybe track how long the user has been pressing the mouse for then the butterfly stomach appears, or if the mouse is pressed many times or some sort of other mouse interaction then change the butterfly stomach. Maybe a text or visual indicaiton that more iteraction will make it change form. ALso, the butterflies are in the shape of a square, maybe make them the shape of a circle, also instead of the wings expanding for the big stomach, make the wings stay in the same place maybe. Troubleshoot background causing glitchiness.

let x, y, size1, size2;
let n = 10; // num points for the bubble
let xr, yr, R;
let gridSize = 10;
let counter = 0

let smallSize = 2; 
let bigSize = 100;
let lerpAmount = 0; 

let fogOffset = 0; 
let starSpeed = 0.2; 
let pulseAmount = 0;
let noiseOffset = 0; 
let fogNoiseOffset = 0; 

let r = 0

let alpha = 0;
let fadingIn = true;
let waitTime = 50;
let waitCounter = 0;
let g, j;
let centerThreshold = 100;


function setup() {
 // createCanvas(800, 500);
  let canvas = createCanvas(800, 500);
    canvas.id("p5-canvas");
    canvas.parent("p5-canvas-container");
  x = width / 2;
  y = height / 2;
  R = 50;
  
   textSize(16);
  fill(200);
  pickRandomPosition();
}

function draw() {
  background(0);
  pulseAmount = sin(frameCount * 0.05) * 20; 
  noiseOffset += 0.01; 

  outerspace();
  fog();
  moveStars();
  
  let centerX = width / 2;
  let centerY = height / 2;
  
  

  R = 50;
  let xn = (noise(frameCount * 0.01) * 2 - 1) * 50;
  let yn = (noise(frameCount * 0.01 + 1000) * 2 - 1) * 50;

  let d = dist(mouseX, mouseY, x, y); 
  let maxDista = random(100, 130); 
 
  if (
    mouseX >= 0 &&
    mouseX <= width &&
    mouseY >= 0 &&
    mouseY <= height &&
    d <= maxDista
  ) {
    x = lerp(x, mouseX + xn, 0.05);
    y = lerp(y, mouseY + yn, 0.05);
  }

  size1 = map(sin(frameCount * 0.05), -1, 1, 10, 20);
  size2 = map(sin(frameCount * 0.05 + PI / 2), -1, 1, 5, 15);
  
  

  if (!mouseIsPressed) {
    counter = 0
    lerpAmount = 0
    // circles for body when mouse isn't pressed
    fill(100);
    noStroke();
    circle(x, y, size1);
    circle(
      x + noise(frameCount * 0.08) * 50,
      y - 35 + noise(frameCount * 0.01) * 50,
      size1
    );
    circle(
      x + noise(frameCount * 0.08) * 50,
      y + 39 + noise(frameCount * 0.03) * 50,
      size2
    );
    circle(
      x - 37 + noise(frameCount * 0.08) * 50,
      y + noise(frameCount * 0.02) * 50,
      size2
    );
    circle(
      x + 31 + noise(frameCount * 0.08) * 50,
      y + noise(frameCount * 0.01) * 50,
      size2
    );
    //   let xb = width / 2;
    // let yb = height / 2;

    stroke(255);
    noFill();

    drawSpaghettiArmLeft(x - 30, y + 20);

    drawSpaghettiArmRight(x + 70, y + 40);
    
if (dist(mouseX, mouseY, centerX, centerY) < centerThreshold) {
    
      fadeText("don't 'press' me, I might get more nervous...", g, j);
          fadeText("don't 'press' me, I might get more nervous...", g+20, j+40);

          fadeText("don't 'press' me, I might get more nervous...", g+50, j-30);

          fadeText("don't 'press' me, I might get more nervous...", g+80, j);
    
  }  
    
  } else if (mouseIsPressed && !keyIsPressed) {
    
    if (dist(mouseX, mouseY, centerX, centerY) < centerThreshold) {
    
      fadeText("...Careful, if you 'press' ", g, j);
    fadeText("      and find the 'key,'", g, j + 50);
    fadeText(" I will become my ultimate nervous form..", g, j + 100);
    
  }  
    
    
    counter+=1
    if(counter <=25){
      lerpAmount += 0.002; 
  lerpAmount = constrain(lerpAmount, 0, 1); 

  size1 = lerp(smallSize, bigSize, lerpAmount);
  size2= lerp(smallSize, bigSize, lerpAmount);
    }
    // squares mouse pressed
      let c = lerpColor(color(100), color(255), lerpAmount);
    fill(c);
    noStroke()
    rect(x, y, size1, size1);
    rect(
      x + noise(frameCount * 0.08) * 50,
      y - 35 + noise(frameCount * 0.01) * 50,
      size1,
      size1
    );
    rect(
      x + noise(frameCount * 0.08) * 50,
      y + 39 + noise(frameCount * 0.03) * 50,
      size2,
      size2
    );
    rect(
      x - 37 + noise(frameCount * 0.08) * 50,
      y + noise(frameCount * 0.02) * 50,
      size2,
      size2
    );
    rect(
      x + 31 + noise(frameCount * 0.08) * 50,
      y + noise(frameCount * 0.01) * 50,
      size2,
      size2
    );
    stroke(255);
    noFill();
    drawSpaghettiArmLeft(
      x - 30 + (noise(frameCount * 0.2) * 30 - 15) + sin(frameCount * 0.5) * 10,
      y + 20 + (noise(frameCount * 0.25) * 30 - 15) + cos(frameCount * 0.5) * 10
    );
    drawSpaghettiArmRight(
      x +
        70 +
        (noise(frameCount * 0.2 + 1000) * 30 - 15) +
        sin(frameCount * 0.5 + PI) * 10,
      y +
        40 +
        (noise(frameCount * 0.25 + 1000) * 30 - 15) +
        cos(frameCount * 0.5 + PI) * 10
    );
    
    
    
  } else if (mouseIsPressed && keyIsPressed) {
    // buble with butterflies and squares
    
    
    if (dist(mouseX, mouseY, centerX, centerY) < centerThreshold) {
    fadeText("~~~!!!~~~", g +random(-4, 4), j+ random(-1, 1));
fadeText("~~~@~#~~~", g + random(-8, 8), j + 40 + random(-3, 3));
fadeText("~~~!!!~~~", g + random(-6, 6), j + 80 + random(-2, 2));

    
  } 
    counter = 0;
    R = 100;
    // the "bubble"
    stroke(255);
    noFill();
    counter+=1
    if (counter <= 100) {
  lerpAmount += 0.009;
  lerpAmount = constrain(lerpAmount, 0, 1);

  let baseR = lerp(smallSize, bigSize, lerpAmount);

  let wobble = 2 * sin(frameCount * 0.1); 

  r = baseR + wobble;

  bubble(r);
  console.log(counter, r);
}



    else{
      r = 100 + 10 * sin(frameCount * 0.1 + offset) + j * 20;
      bubble(r);
    }
    


    fill(255, 150, 0);
    noStroke();
    butterfly();
  }
}

function bubble(r) {
  let centerX = 400;
  let centerY = 250;
  
  let distanceToCenter = dist(x, y, centerX, centerY);
  
  r = lerp(r, r * 0.5, map(distanceToCenter, 0, 400, 1, 0));
  
  let pulse = sin(frameCount * 0.05) * 5; 
  r += pulse; 

  beginShape();
  for (let j = 0; j < 3; j++) {
    for (let i = 0; i < n; i++) {
      let angle = map(i, 0, n, 0, 2 * PI);
      let offset = map(i, 0, n, 0, 5 * PI);

      let xBubble = x + r * cos(angle);
      let yBubble = y + r * sin(angle);
      curveVertex(xBubble, yBubble);

      if (i == 0 && j == 0) {
        stroke(255);
        noFill();
        drawSpaghettiArmLeft(x - 120, y + 10);
        drawSpaghettiArmRight(x + 130, y + 20);
      }
    }
  }
  endShape(CLOSE);
}



function butterfly() {
 for (let i = 0; i < 10; i++) {
  let angle = random(TWO_PI); 
  let radius = random(20, 50); 

  let x1 = x + cos(angle) * radius;
  let y1 = y + sin(angle) * radius;

  beginShape();
  for (let j = 0; j < 4; j++) { 
    let offsetAngle = angle + random(-PI / 6, PI / 6); 
    let offsetRadius = radius + random(-5, 5); 
    let xOffset = x + cos(offsetAngle) * offsetRadius;
    let yOffset = y + sin(offsetAngle) * offsetRadius;

    curveVertex(xOffset, yOffset);
  }
  endShape(CLOSE);
}

  
}

function drawSpinningRectangle(x, y, size, spd) {
  push();
  translate(x, y);
  rotate(frameCount * spd);

  let rectWidth = size + sin(frameCount * 0.05) * 20 + (mouseX / width) * 50;
  let rectHeight = size * 0.2 + (mouseY / height) * 60;

  rect(0, 0, rectWidth, rectHeight);
  pop();
}

function drawSpinningEllipse(x, y, size, spd) {
  push();
  translate(x, y);
  rotate(frameCount * spd);

  let ellipseWidth = size + sin(frameCount * 0.05) * 20;
  let ellipseHeight = size * 0.2 + (mouseX / width) * 40;

  ellipse(0, 0, ellipseWidth, ellipseHeight);
  pop();
}

function drawSpaghettiArmLeft(xvalue, yvalue) {
  let armLength = 40;
  let numStrings = 5;
  let centerX = 400;  
  let centerY = 250; 

  for (let i = 0; i < numStrings; i++) {
    let angle = -PI / 4 + (i * (PI / 4)) / (numStrings - 1);

    let x = xvalue;
    let y = yvalue;

    for (let j = 0; j < armLength; j++) {
      let movement = frameCount * 0.04 + j * 0.1;

      let distanceToCenter = dist(x, y, centerX, centerY);

      let lengthFactor = map(distanceToCenter, 0, width, 0.1, 2);  

      let verticalAmplitudeFactor = map(distanceToCenter, 0, width, 0.2, 1);  

      let movex = x - cos(angle) * 5 * lengthFactor;
      let movey = y + sin(movement) * 4 * verticalAmplitudeFactor;  

      line(x, y, movex, movey);

      x = movex;
      y = movey;
    }
  }
}

function drawSpaghettiArmRight(xvalue, yvalue) {
  let armLength = 40;
  let numStrings = 5;
  let centerX = 400;  
  let centerY = 250;  

  for (let i = 0; i < numStrings; i++) {
    let angle = -PI / 4 + (i * (PI / 4)) / (numStrings - 1);

    let x = xvalue;
    let y = yvalue;

    for (let j = 0; j < armLength; j++) {
      let movement = frameCount * 0.05 + j * 0.1;

    
      let distanceToCenter = dist(x, y, centerX, centerY);

      let lengthFactor = map(distanceToCenter, 0, width, 0.1, 2);  

      let verticalAmplitudeFactor = map(distanceToCenter, 0, width, 0.2, 1);  

      let movex = x + cos(angle) * 5 * lengthFactor; 
      let movey = y + sin(movement) * 4 * verticalAmplitudeFactor;  

      line(x, y, movex, movey);

      x = movex;
      y = movey;
    }
  }
}


let angleOffset = 0;


function outerspace() {
   pulseAmount = 50;
  background(0);
  let centerX = width / 2;
  let centerY = height / 2;
  let numStars = 800;
  let maxRadius = min(width, height) * 0.5; 
  let speed = 0.02; 
  let radiusFactor = 0.7; 


  if (mouseIsPressed) {
    speed = 0.1; 
    radiusFactor = 1.5; 
  }

  if (mouseIsPressed && keyIsPressed) {
    speed = -0.1; 
    radiusFactor = 0.3; 
  }

  for (let i = 0; i < numStars; i++) {
    let angle = i * 0.2 + angleOffset; 
    let radius = i * radiusFactor; 

    if (radius > maxRadius) break;

    let x = centerX + cos(angle) * radius;
    let y = centerY + sin(angle) * radius;

    let d = dist(x, y, mouseX, mouseY);
    let darkness = map(d, 0, width / 2, 255, 50);
    darkness += pulseAmount;

    let r = darkness;
    let g = darkness * 0.8;
    let b = darkness * 1.2;

    if (mouseIsPressed) {
      r = darkness * 0.6;
      g = darkness * 0.6;
      b = darkness;
    }

    if (mouseIsPressed && keyIsPressed) {
      r = darkness;
      g = darkness * 0.5;
      b = darkness * 0.5;
    }

    stroke(r, g, b);
    strokeWeight(2);
    point(x, y);
  }

  angleOffset += speed;
}





function fog() {
  fogOffset += 0.2; // speed of fog movement
  fogNoiseOffset += 0.005; 
  noFill();
  stroke(255, 255, 255, 50); 

  push(); 
  translate(width / 2, height / 2); 
  rotate(radians(frameCount * 0.1)); 

  let offsetX = noise(fogNoiseOffset) * 100 + (mouseX - width / 2) * 0.05; 
  let offsetY = noise(fogNoiseOffset + 1000) * 100 + (mouseY - height / 2) * 0.05; 

  for (let i = 0; i < 3; i++) {
    ellipse(offsetX, offsetY, 800 + fogOffset + pulseAmount + i * 150, 500 + fogOffset + pulseAmount + i * 100);
  }
  pop(); 
}

function moveStars() {

  for (let i = 0; i < 150; i++) {
    let starX = random(width);
    let starY = random(height);
    let starBrightness = random(150, 255); 

    
    let starSpeedX = (mouseX - starX) * 0.002 + noise(noiseOffset + i * 0.01) * 0.5;
    let starSpeedY = (mouseY - starY) * 0.002 + noise(noiseOffset + i * 0.01 + 500) * 0.5;

    starX += starSpeedX;
    starY += starSpeedY;

    starBrightness += pulseAmount;

    let rotation = sin(noise(i * 0.05 + frameCount * 0.01) * TWO_PI) * 2;

    stroke(starBrightness);
    point(starX + rotation, starY + rotation);
  }
}

function fadeText(txt, g, j) {
  let len = txt.length;
  let visibleChars = map(alpha, 0, 255, 0, len);

  fill(200, alpha); 
  text(txt.substring(0, visibleChars), g, j); //showing characters of the text by starting from index zero to the length of the text, but only revealing certain characters at a time so it looks like the text is "fading" in

  if (fadingIn) {
    alpha += 1;
    if (alpha >= 255) {
      alpha = 255;
      fadingIn = false;
      waitCounter = frameCount + 100;
    }
  } else if (frameCount < waitCounter) {
  } else if (alpha > 0) {
    alpha -= 1;
  } else {
    if (frameCount > waitCounter + waitTime) {
      fadingIn = true;
      pickRandomPosition();
    }
  }
}

function pickRandomPosition() {
  g = random(width - 100);
  j = random(height - 20);
  alpha = 0;
}

function fadeOutText() {
  alpha -= 1; 
  if (alpha < 0) alpha = 0; 
}


