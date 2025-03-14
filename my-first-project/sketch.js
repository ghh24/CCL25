//title concept: the butterfly paradox: from growth to confinement
//design: starts off as circles (represents "purity", "no form", "neverending freedom", shifts to squares (represents freedom with some restriction and conformation to order and structure, but still with some "purity," "originality" and lack of overbearing imposition from others, at last transofrms to butterflies in which confiend in a "bubble" or by societal norms, with the squares bouncing on the outside of the bubbles representing a curated/unrestrained self that they once had but now are "blocked" from as now fully developed and mature individuals within society ))

///ACTUALLY, REDEFINE AS REACTING TO BEHAVIOR, NOT AS METAPHORICAL GROWTH (i.e. more like how does the creature react to being clicked, to eating food, does it run away, how does it react when you aren't reacting to it, what happens if the mouse goes off canvas) AND A "CREATURE" that doesn't already exist yet

//NEXT IDEA:
//title: the nervous form
//description: when not pressed, the creature is in its normal state, a fluid, relaxed, circle, when pressed, the creature gets a little more stressed turning into a square, its new "points" representing its defensiveness, when pressed again (this time with mouse and keyboard), the creature enlarges and you can actually see the "butterflies" or whatever abstract name you would like to call it, revealing its ultimate nervous form. being "pressed" is also synonymous with the human world, where when we are pressed it can sometimes literally mean we are on a time cruch or something has caused us to be stressed or nervous as well

//sources:
//"bubble": https://docs.google.com/document/d/1hB8f-GcjHJFU9k0wLhUu16rmbUsChPZmHcAdy88AY_c/edit?tab=t.0

//feedback: make the transition between forms smoother, like add lerp between forms, or have the shapes gradually "grow" or just transition into the next form like the small squares to the big circle with butterflies, maybe improve the the object following the mouse, build environment

let x, y, size1, size2;
let n = 10; // Number of points for the bubble
let xr, yr, R;
let gridSize = 10;

function setup() {
  let canvas = createCanvas(1000, 600);
  canvas.parent('p5-canvas')
  x = width / 2;
  y = height / 2;
  R = 50;
}

function draw() {
  background(0);

  R = 50;
  let xn = (noise(frameCount * 0.01) * 2 - 1) * 50;
  let yn = (noise(frameCount * 0.01 + 1000) * 2 - 1) * 50;

  let d = dist(mouseX, mouseY, x, y); // distance from cursor
  let maxDist = random(100, 130); // max distance cursor can be for creature to follow cursor
  // follow cursor if within threshold and within canvas
  if (
    mouseX >= 0 &&
    mouseX <= width &&
    mouseY >= 0 &&
    mouseY <= height &&
    d <= maxDist
  ) {
    x = lerp(x, mouseX + xn, 0.05);
    y = lerp(y, mouseY + yn, 0.05);
  }

  size1 = map(sin(frameCount * 0.05), -1, 1, 10, 20);
  size2 = map(sin(frameCount * 0.05 + PI / 2), -1, 1, 5, 15);

  if (!mouseIsPressed) {
    // circles when mouse isn't pressed
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
  } else if (mouseIsPressed && !keyIsPressed) {
    // squares mouse pressed
    fill(255);
    noStroke();
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
    R = 100;
    // the "bubble"
    stroke(255);
    noFill();
    bubble();

    // butterfliews follow mouse
    fill(255, 150, 0);
    noStroke();
    butterfly();

    //    // Squares around bubble
    //   fill(255);
    //   noStroke();

    //   // Generate random position for square, ensure it stays outside the bubble
    //   let offsetX = mouseX - x;
    //   let offsetY = mouseY - y;

    //   // Random position for the square using noise, but keep it outside the bubble
    //   let xr = x + R + noise(frameCount * 0.01) * (width / 2);  // Modify as needed for range
    //   let yr = y + R + noise(frameCount * 0.03) * (height / 2);

    //   // Ensure the square stays outside the bubble
    //   let distance = dist(xr, yr, mouseX, mouseY);  // Calculate distance to the center of the bubble
    //   if (distance < R) {
    //     // If square is too close to the bubble, move it further out
    //     let angle = atan2(yr - y, xr - x);
    //     xr = x + (R-1) * cos(angle);  // Move square further out along the line from the center
    //     yr = y + (R-1) * sin(angle);
    //   }
    // // Begin the drawing group.
    // push();

    // // Translate the origin to the mouse's position.
    // translate(mouseX, mouseY);

    // // Draw a bug.
    // let o = random(0, 100);
    // let t = random(0, 100);
    // text('🦋', o, t);

    // // End the drawing group.
    // pop();

    // Draw the square at the new position
    //rect(xr, yr, 20, 20);

    //saveCanvas('yourName', 'png');
  }
}

function bubble() {
  beginShape();
  for (let j = 0; j < 3; j++) {
    for (let i = 0; i < n; i++) {
      let angle = map(i, 0, n, 0, 2 * PI);
      let offset = map(i, 0, n, 0, 5 * PI);
      let r = 100 + 10 * sin(frameCount * 0.1 + offset) + j * 20;
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
    let x1 = random(x - 50, x + 50);
    let y1 = random(y - 50, y + 50);
    beginShape();
    curveVertex(x1 + random(-10, 10), y1 + random(-10, 10));
    curveVertex(x1 + random(-10, 10), y1 + random(-10, 10));
    curveVertex(x1 + random(-10, 10), y1 + random(-10, 10));
    curveVertex(x1 + random(-10, 10), y1 + random(-10, 10));
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

  for (let i = 0; i < numStrings; i++) {
    let angle = -PI / 4 + (i * (PI / 4)) / (numStrings - 1);

    let x = xvalue;
    let y = yvalue;

    for (let j = 0; j < armLength; j++) {
      let movement = frameCount * 0.04 + j * 0.1;

      let movex = x - cos(angle) * 5;
      let movey = y + sin(movement) * 4;

      line(x, y, movex, movey);

      x = movex;
      y = movey;
    }
  }
}

function drawSpaghettiArmRight(xvalue, yvalue) {
  let armLength = 40;
  let numStrings = 5;

  // Loop through each string
  for (let i = 0; i < numStrings; i++) {
    let angle = -PI / 4 + (i * (PI / 4)) / (numStrings - 1);

    let x = xvalue;
    let y = yvalue;

    for (let j = 0; j < armLength; j++) {
      let movement = frameCount * 0.05 + j * 0.1;

      let movex = x + cos(angle) * 5;
      let movey = y + sin(movement) * 4;

      line(x, y, movex, movey);

      x = movex;
      y = movey;
    }
  }
}
